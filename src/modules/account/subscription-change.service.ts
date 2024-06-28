import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, In, Not } from 'typeorm';
import { TeamMemberRoleCoreService } from 'src/core/team-member-role-core/team-member-role-core.service';
import { UserCoreService } from 'src/core/user-core/user-core.service';
import { SystemRoleCoreService } from 'src/core/system-role-core/system-role-core.service';
import { TeamMemberCoreService } from 'src/core/team-member-core/team-member-core.service';
import { UserTokenCoreService } from 'src/core/user-token-core/user-token-core.service';
import { PlanCoreService } from 'src/core/plan-core/plan-core.service';
import { ShAccountSettingsCoreService } from 'src/core/sh-account-settings-core/sh-account-settings-core.service';
import { UserRoleCoreService } from 'src/core/user-role-core/user-role-core.service';
import { SystemRole } from 'src/core/system-role-core/system-role-core.entity';
import { Role } from 'src/core/role-core/role-core.entity';
import {
  ATMPlanIds,
  BasicPlanIds,
  LtdPlanIds,
  NonATMPlanIds,
  ProspectSharingPermissions,
  RedisCacheKey,
  USER_STATUS as UserStatus,
} from 'src/keys';
import { UserRole as UserRoleEntity } from 'src/core/user-role-core/user-role-core.entity';
import { SubscriptionType } from 'src/shared/types/subscription';
import { User } from 'src/core/user-core/user-core.entity';
import { TeamMemberRole } from 'src/core/team-member-role-core/team-member-role-core.entity';
import {
  ConvertToLtdRoleMap,
  ConvertToNonLtdRoleMap,
  UserRole,
} from 'src/core/user-core/user-core.enum';
import { ShAccountSettingsCode } from 'src/core/sh-account-settings-core/sh-account-settings-core.enum';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { randomBytes } from 'crypto';

@Injectable()
export class ChangeSubscriptionService {
  private readonly logger: Logger = new Logger(ChangeSubscriptionService.name);

  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly teamMemberRoleRepository: TeamMemberRoleCoreService,
    private readonly planRepository: PlanCoreService,
    private readonly shAccountSettingsRepository: ShAccountSettingsCoreService,
    private readonly userRoleRepository: UserRoleCoreService,
    private readonly userRepository: UserCoreService,
    private readonly systemRoleRepository: SystemRoleCoreService,
    private readonly teamMemberRepository: TeamMemberCoreService,
    private readonly userTokenService: UserTokenCoreService,
    private readonly entityManager: EntityManager,
  ) {}

  async shiftRolesToNewPlan(newPlanId: number, shAccountId: number) {
    await this.entityManager.transaction(async (trx: EntityManager) => {
      const uuid = randomBytes(30).toString('hex');
      let userId = null;
      const plan = await this.planRepository.findFirst({
        where: { id: newPlanId },
      });
      const { application } = plan;

      newPlanId = plan.parentId ?? plan.id;

      const isLtd = LtdPlanIds.includes(newPlanId);

      const prospectedSharingEnabled =
        await this.shAccountSettingsRepository.findFirst({
          where: {
            shAccountId,
            code: ShAccountSettingsCode.ProspectSharing,
          },
        });

      this.logger.log({
        uuid,
        label: 'subscription-change:plan',
        method: 'shiftRolesToNewPlan',
        planId: newPlanId,
        shAccountId,
        isLtd,
        prospectedSharingEnabled: prospectedSharingEnabled.value === '1',
      });

      const users = await this.userRepository.findMany({
        where: { shAccountId, status: Not(UserStatus.Deleted) },
        relations: ['userRole', 'userRole.role'],
      });

      const planIds = ATMPlanIds.includes(newPlanId)
        ? ATMPlanIds
        : NonATMPlanIds;

      const userIds = users.map((user) => {
        if (user.role === UserRole.ADMIN) {
          userId = user.id;
        }
        return user.id;
      });

      const lastUserRoles = await this.getLastUserRolesInPlansForUsers(
        userIds,
        planIds,
        application,
      );

      const missingLastUserRoleUsers = users.filter((user) => {
        return lastUserRoles.findIndex((lur) => lur.userId === user.id) === -1;
      });

      this.logger.log({
        uuid,
        label: 'subscription-change:plan',
        method: 'shiftRolesToNewPlan',
        userId,
        userIds,
        planIds,
        lastUserRoles,
        missingLastUserRoleUsers,
      });

      const systemRoles = await this.systemRoleRepository.findMany({
        where: {
          planId: newPlanId,
        },
      });

      const rolesToInsert = this.formatRolesForInsertion(
        systemRoles,
        shAccountId,
        userId,
        newPlanId,
        prospectedSharingEnabled?.value === '1',
        application,
      );

      this.logger.log({
        uuid,
        label: 'subscription-change:plan',
        method: 'shiftRolesToNewPlan',
        systemRoles,
        rolesToInsert,
      });

      const newRoles = await trx.getRepository(Role).save(rolesToInsert);

      this.logger.log({
        uuid,
        label: 'subscription-change:plan',
        method: 'shiftRolesToNewPlan',
        newRoles,
      });

      await trx.softDelete(Role, {
        shAccountId,
        application,
        id: Not(In(newRoles.map((nr) => nr.id))),
      });

      let newUserRoles: UserRoleEntity[] = [];

      if (lastUserRoles.length) {
        newUserRoles = newUserRoles.concat(
          this.transferUserRoleAssociations(
            lastUserRoles,
            newRoles,
            isLtd,
            application,
          ),
        );
      }

      if (missingLastUserRoleUsers.length) {
        newUserRoles = newUserRoles.concat(
          this.createNewUserRoleAssociations(
            newRoles,
            missingLastUserRoleUsers,
            userId,
            isLtd,
            application,
          ),
        );
      }

      this.logger.log({
        uuid,
        label: 'subscription-change:plan',
        method: 'shiftRolesToNewPlan',
        newUserRoles,
      });

      newUserRoles = await trx.getRepository(UserRoleEntity).save(newUserRoles);

      if (newUserRoles.length) {
        await trx.softDelete(UserRoleEntity, {
          userId: In(userIds),
          application,
          roleId: Not(In(newUserRoles.map((ur) => ur.roleId))),
        });
      }

      if (application === SubscriptionType.Sequence) {
        const updates = this.prepareRoleUpdatesInUserTable(newUserRoles, isLtd);
        const promises = Object.entries(updates).map(([key, values]) => {
          const keyUserIds = values.map((ur) => ur.userId);
          if (!keyUserIds.length) {
            return;
          }
          return trx.update(
            User,
            { id: In(keyUserIds) },
            {
              role: key as UserRole,
            },
          );
        });

        this.logger.log({
          uuid,
          label: 'subscription-change:plan',
          method: 'shiftRolesToNewPlan',
          updates,
        });

        await Promise.all(promises);
      }

      if (ATMPlanIds.includes(newPlanId)) {
        const teamMembers = await this.teamMemberRepository.findMany({
          where: {
            userId: In(userIds),
          },
          withDeleted: true,
        });

        const teamMemberUserIds = teamMembers.map((tm) => tm.userId);

        const lastTeamMemberRoles = await this.getLastTeamMemberRolesForUsers(
          teamMemberUserIds,
          application,
        );
        if (lastTeamMemberRoles.length) {
          let newTeamMemberRoles = this.transferTeamMemberRoleAssociation(
            lastTeamMemberRoles,
            newRoles,
            application,
          );
          newTeamMemberRoles = await trx
            .getRepository(TeamMemberRole)
            .save(newTeamMemberRoles);

          this.logger.log({
            uuid,
            label: 'subscription-change:plan',
            method: 'shiftRolesToNewPlan',
            teamMemberUserIds,
            lastTeamMemberRoles,
            newTeamMemberRoles,
          });

          await trx.softDelete(TeamMemberRole, {
            teamMemberId: In(teamMembers.map((tm) => tm.id)),
            application,
            id: Not(In(newTeamMemberRoles.map((ntmr) => ntmr.id))),
          });
        }
      }

      if (BasicPlanIds.includes(newPlanId)) {
        const allExceptOwnerUserIds = userIds.filter((uId) => uId !== userId);

        this.logger.log({
          uuid,
          label: 'subscription-change:plan',
          method: 'shiftRolesToNewPlan',
          disableUserIds: allExceptOwnerUserIds,
        });

        if (allExceptOwnerUserIds.length) {
          await trx.update(
            User,
            { id: In(allExceptOwnerUserIds) },
            { status: UserStatus.InActive },
          );
          const deleteKeys = allExceptOwnerUserIds.map(
            (userId) => `token:${userId}*`,
          );
          await this.redis.del(deleteKeys);
          await this.userTokenService.deleteMany({
            where: { userId: In(allExceptOwnerUserIds) },
          });
        }
      }
      try {
        const pipeline = this.redis.pipeline();
        for (const userId of userIds) {
          pipeline.del(
            `${RedisCacheKey.ATMAccountAccessibleUserIds}:${userId}`,
          );
          pipeline.del(`${RedisCacheKey.ATMAccountPermissions}:${userId}`);
          pipeline.del(`${RedisCacheKey.ATMTeamAccessibleUserIds}:${userId}`);
          pipeline.del(`${RedisCacheKey.ATMTeamPermissions}:${userId}`);
          pipeline.del(`${RedisCacheKey.ATMUserTeams}:${userId}`);
        }

        await pipeline.exec();
      } catch (e) {
        this.logger.error(`shiftRolesToNewPlan: ${JSON.stringify(e)}`);
      }
    });
  }

  async getLastUserRolesInPlansForUsers(
    userIds: number[],
    planIds: number[],
    application?: SubscriptionType,
  ) {
    if (!application) {
      application = SubscriptionType.Sequence;
    }

    const latestUserRoles = await this.userRoleRepository
      .queryBuilder('ur1')
      .withDeleted()
      .leftJoin('ur1.role', 'role', 'role.id = ur1.roleId')
      .select('MAX(ur1.id) as id')
      .where(`ur1.userId IN (${userIds.join(',')})`)
      .andWhere('ur1.application IN (:application)', {
        application,
      })
      .andWhere(`role.planId IN (${planIds.join(',')})`)
      .groupBy('ur1.userId')
      .getRawMany();

    if (!latestUserRoles?.length) {
      return [];
    }
    return this.userRoleRepository
      .queryBuilder('ur')
      .withDeleted()
      .where('ur.id IN (:ids)', { ids: latestUserRoles.map((lur) => lur.id) })
      .innerJoinAndSelect('ur.role', 'role', 'ur.roleId = role.id')
      .getMany();
  }

  async getLastTeamMemberRolesForUsers(
    userIds: number[],
    application?: SubscriptionType,
  ) {
    if (!application) {
      application = SubscriptionType.Sequence;
    }
    if (!userIds.length) {
      return [];
    }
    const latestMemberRoles = await this.teamMemberRoleRepository
      .queryBuilder('tr1')
      .withDeleted()
      .leftJoin('tr1.role', 'role', 'role.id')
      .leftJoin('tr1.teamMember', 'tm', 'tm.id = tr1.teamMemberId')
      .select('MAX(tr1.id) as id')
      .where(`tm.userId IN (${userIds.join(',')})`)
      .andWhere('tr1.application IN (:...application)', {
        application: [application],
      })
      .groupBy('tm.userId')
      .getRawMany();

    return this.teamMemberRoleRepository
      .queryBuilder('mr')
      .withDeleted()
      .where('mr.id IN (:ids)', { ids: latestMemberRoles.map((lmr) => lmr.id) })
      .innerJoinAndSelect('mr.role', 'role', 'mr.roleId = role.id')
      .getMany();
  }

  prepareRoleUpdatesInUserTable(
    userRoles: UserRoleEntity[],
    isLtd: boolean,
  ): Record<UserRole, UserRoleEntity[]> {
    const roles: Record<UserRole, UserRoleEntity[]> = userRoles.reduce(
      (acc, ur) => {
        const roleName = ur.role.name.toLowerCase() as UserRole;
        if (
          [UserRole.ADMIN, UserRole.LTDADMIN, UserRole.OWNER].includes(roleName)
        ) {
          acc[UserRole.ADMIN] = (acc[UserRole.ADMIN] || []).concat(ur);
          return acc;
        }
        if (
          [UserRole.MEMBER, 'team-manager', 'team-member'].includes(roleName)
        ) {
          acc[UserRole.MEMBER] = (acc[UserRole.MEMBER] || []).concat(ur);
          return acc;
        }
        acc[roleName] = (acc[roleName] || []).concat(ur);
        return acc;
      },
      {} as Record<UserRole, UserRoleEntity[]>,
    );

    const adminKey: UserRole = isLtd ? UserRole.LTDADMIN : UserRole.ADMIN;
    const memberKey: UserRole = isLtd ? UserRole.LTDMEMBER : UserRole.MEMBER;

    const result = {} as Record<UserRole, UserRoleEntity[]>;

    Object.entries(roles).forEach(([key, value]) => {
      if (key === UserRole.ADMIN) {
        result[adminKey] = value;
        return;
      }
      if (key === UserRole.MEMBER) {
        result[memberKey] = value;
        return;
      }
      result[key] = value;
    });

    return result;
  }

  formatRolesForInsertion(
    systemRoles: SystemRole[],
    shAccountId: number,
    userId: number,
    planId: number,
    prospectSharing: boolean,
    application?: SubscriptionType,
  ) {
    if (!application) {
      application = SubscriptionType.Sequence;
    }

    let permissions = null;
    if (application === SubscriptionType.Sequence) {
      permissions = prospectSharing ? ProspectSharingPermissions : [];
    }
    return systemRoles.map((sr) => {
      const role = new Role();
      role.name = sr.name;
      role.planId = planId;
      role.systemRoleId = sr.id;
      role.createdByUserId = userId;
      role.permissions = permissions;
      role.shAccountId = shAccountId;
      role.application = application;
      return role;
    });
  }

  createNewUserRoleAssociations(
    newRoles: Role[],
    users: User[],
    ownerId: number,
    isLtd: boolean,
    application?: SubscriptionType,
  ) {
    if (!application) {
      application = SubscriptionType.Sequence;
    }
    return users.map((user) => {
      let roleToFind = isLtd ? UserRole.LTDMEMBER : UserRole.MEMBER;
      if (user.id === ownerId) {
        roleToFind = UserRole.OWNER;
      }
      const newRole = newRoles.find(
        (nr) => nr.name.toLowerCase() === roleToFind,
      );
      const userRole = new UserRoleEntity();
      userRole.userId = user.id;
      userRole.roleId = newRole.id;
      userRole.role = newRole;
      userRole.application = application;
      return userRole;
    });
  }

  transferUserRoleAssociations(
    lastUserRoles: UserRoleEntity[],
    newRoles: Role[],
    isLtd: boolean,
    application?: SubscriptionType,
  ) {
    if (!application) {
      application = SubscriptionType.Sequence;
    }
    return lastUserRoles.map((userRole) => {
      let roleToFind = userRole.role.name.toLowerCase();
      const fallBackMemberRole = isLtd ? UserRole.LTDMEMBER : UserRole.MEMBER;

      if (isLtd) {
        roleToFind = ConvertToLtdRoleMap[roleToFind] ?? roleToFind;
      }

      if (!isLtd) {
        roleToFind = ConvertToNonLtdRoleMap[roleToFind] ?? roleToFind;
      }

      let newRole = newRoles.find(
        (newRole) => newRole.name.toLowerCase() === roleToFind,
      );

      if (!newRole) {
        newRole = newRoles.find(
          (newRole) => newRole.name.toLowerCase() === fallBackMemberRole,
        );
      }

      const newUserRole = new UserRoleEntity();
      newUserRole.roleId = newRole.id;
      newUserRole.userId = userRole.userId;
      newUserRole.role = newRole;
      newUserRole.application = application;

      return newUserRole;
    });
  }

  transferTeamMemberRoleAssociation(
    teamMemberRoles: TeamMemberRole[],
    newRoles: Role[],
    application?: SubscriptionType,
  ) {
    if (!application) {
      application = SubscriptionType.Sequence;
    }
    return teamMemberRoles
      .map((teamMemberRole) => {
        const roleToFind = teamMemberRole.role.name.toLowerCase();
        const newRole = newRoles.find(
          (role) => role.name.toLowerCase() === roleToFind,
        );
        if (!newRole) {
          return null;
        }
        const newTeamMemberRole = new TeamMemberRole();
        newTeamMemberRole.roleId = newRole.id;
        newTeamMemberRole.teamMemberId = teamMemberRole.teamMemberId;
        newTeamMemberRole.application = application;
        return newTeamMemberRole;
      })
      .filter((e) => e);
  }
}
