import { Injectable } from '@nestjs/common';
import { ShAccountAssignees } from 'src/core/admin-panel-sh-account-assignees-core/admin-panel-sh-account-assignees-core.enum';
import { EmailAccountSettingCode } from 'src/core/email-account-setting-core/email-account-setting-core.enum';
import { EmailAccountSettingCoreService } from 'src/core/email-account-setting-core/email-account-setting-core.service';
import { ListAccountDto } from 'src/modules/account/dto/list-account.dto';
import { ListEmailAccountDto } from 'src/modules/email-account/dto/list-email-account.dto';
import { ListLogDto } from 'src/modules/log/dto/list-log.dto';
import { ListNoteDto } from 'src/modules/note/dto/list-note.dto';
import { ListUserSessionDto } from 'src/modules/session/dto/list-user-session.dto';
import { ListSignupBlackListDto } from 'src/modules/signup-black-list/dto/list-signup-black-list.dto';
import { ListUserDto } from 'src/modules/user/dto/list-user.dto';
import { DateTime } from 'luxon';
import { ShAccountCoreService } from 'src/core/sh-account-core/sh-account-core.service';
import { UserCoreService } from 'src/core/user-core/user-core.service';
import { EmailAccountCoreService } from 'src/core/email-account-core/email-account-core.service';
import { AdminPanelShAccountNotesCoreService } from 'src/core/admin-panel-sh-account-notes-core/admin-panel-sh-account-notes-core.service';
import { AdminPanelUserAccessTokensCoreService } from 'src/core/admin-panel-user-access-tokens-core/admin-panel-user-access-tokens-core.service';
import { SignupBlackListsCoreService } from 'src/core/signup-black-lists-core/signup-black-lists-core.service';
import { AdminPanelUserCoreService } from 'src/core/admin-panel-user-core/admin-panel-user-core.service';
import { InjectModel } from '@nestjs/mongoose';
import {
  EmailAccountHealth,
  EmailAccountHealthDocument,
} from 'src/core/mongo/schema/email-account-health.schema';
import { Model } from 'mongoose';
import { ListPlanDto } from 'src/modules/plan/dto/list-plan.dto';
import { PlanCoreService } from 'src/core/plan-core/plan-core.service';
import { PlanRestrictionCoreService } from 'src/core/plan-restriction-core/plan-restriction-core.service';
import { FeatureCoreService } from 'src/core/feature-core/feature-core.service';
import { AdminPanelTagsCoreService } from 'src/core/admin-panel-tags-core/admin-panel-tags-core.service';
import { ListAdminPanelTagDto } from 'src/modules/admin-panel-tags/dto/list-admin-panel-tag.dto';
import { AccountSubscriptionCoreService } from 'src/core/account-subscription-core/account-subscription-core.service';
import { arrayColumn } from '../common/common.helper';
import { In } from 'typeorm';
import { ListAgencyUserDto } from 'src/modules/agency-user/dto/list-agency-user.dto';
import { AgencyUserCoreService } from 'src/core/agency-user-core/agency-user-core.service';
import { AgencyCoreService } from 'src/core/agency-core/agency-core.service';
import { ListLeadReportDto } from '../../../modules/report/dto/list-lead-report.dto';
import { LeadFinderRevealHistoryCoreService } from '../../../core/lead-finder-reveal-history-core/lead-finder-reveal-history-core.service';
import { RevealHistoryType } from '../../../core/lead-finder-reveal-history-core/lead-finder-reveal-history-core.enum';

@Injectable()
export class SharedQueryService {
  constructor(
    private emailAccountSettingCoreService: EmailAccountSettingCoreService,
    private shAccountCoreService: ShAccountCoreService,
    private userCoreService: UserCoreService,
    private emailAccountCoreService: EmailAccountCoreService,
    private adminPanelShAccountNotesCoreService: AdminPanelShAccountNotesCoreService,
    private adminPanelTagsCoreService: AdminPanelTagsCoreService,
    private agencyUserCoreService: AgencyUserCoreService,
    private agencyCoreService: AgencyCoreService,
    private planCoreService: PlanCoreService,
    private adminPanelUserAccessTokensCoreService: AdminPanelUserAccessTokensCoreService,
    private signupBlackListsCoreService: SignupBlackListsCoreService,
    private adminPanelUserCoreService: AdminPanelUserCoreService,
    private planRestrictionCoreService: PlanRestrictionCoreService,
    private featureCoreService: FeatureCoreService,
    private leadFinderRevealHistoryCoreService: LeadFinderRevealHistoryCoreService,
    private accountSubscriptionCoreService: AccountSubscriptionCoreService,
    @InjectModel(EmailAccountHealth.name)
    private readonly emailAccountHealthModel: Model<EmailAccountHealthDocument>,
  ) {}

  async getUserQuery(params: { query: ListUserDto; withDeleted?: boolean }) {
    const { query, withDeleted = true } = params;

    const modelQuery = this.userCoreService.queryBuilder('user');
    if (withDeleted) {
      modelQuery.withDeleted();
    }
    modelQuery.innerJoinAndSelect('user.shAccount', 'account');
    modelQuery.innerJoinAndSelect(
      'account.accountSubscription',
      'accountSubscription',
    );
    modelQuery.innerJoinAndSelect('accountSubscription.plan', 'plan');

    if (query?.where) {
      modelQuery.where('1=1');

      if (query?.where?.id) {
        modelQuery.andWhere('user.id = :userId', {
          userId: query?.where?.id,
        });
      }

      if (query?.where?.shAccountId) {
        modelQuery.andWhere('user.shAccountId = :shAccountId', {
          shAccountId: query?.where?.shAccountId,
        });
      }

      if (query?.where?.role?.in) {
        modelQuery.andWhere('user.role IN (:...role)', {
          role: query?.where?.role?.in,
        });
      } else if (query?.where?.role?.notIn) {
        modelQuery.andWhere('user.role NOT IN (:...role)', {
          role: query?.where?.role?.notIn,
        });
      }

      if (query?.where?.designation?.in) {
        modelQuery.andWhere('user.designation IN (:...designation)', {
          designation: query?.where?.designation?.in,
        });
      } else if (query?.where?.designation?.notIn) {
        modelQuery.andWhere('user.designation NOT IN (:...designation)', {
          designation: query?.where?.designation?.notIn,
        });
      }

      if (query?.where?.planId?.in) {
        modelQuery.andWhere('accountSubscription.planId IN (:...planId)', {
          planId: query?.where?.planId?.in,
        });
      } else if (query?.where?.planId?.notIn) {
        modelQuery.andWhere('accountSubscription.planId NOT IN (:...planId)', {
          planId: query?.where?.planId?.notIn,
        });
      }

      if (query?.where?.planStatus?.in) {
        modelQuery.andWhere('accountSubscription.status IN (:...planStatus)', {
          planStatus: query?.where?.planStatus?.in,
        });
      } else if (query?.where?.planStatus?.notIn) {
        modelQuery.andWhere(
          'accountSubscription.status NOT IN (:...planStatus)',
          {
            planStatus: query?.where?.planStatus?.notIn,
          },
        );
      }

      if (query?.where?.createdAt?.between) {
        const createdAt = query?.where?.createdAt?.between;

        let createdAtDates: any = [];
        if (typeof createdAt === 'object') {
          if (Array.isArray(createdAt)) {
            createdAtDates = createdAt;
          }
        } else if (typeof createdAt === 'string') {
          createdAtDates = createdAt.split('|');
        }

        if (createdAtDates.length === 2) {
          const createdAtFrom = DateTime.fromFormat(
            createdAtDates[0],
            'yyyy-MM-dd',
          )
            .setZone('asia/kolkata')
            .minus({ days: 1 })
            .toFormat('yyyy-MM-dd');

          const createdAtTo: any = `${createdAtDates[1]}`;

          modelQuery.andWhere(
            `user.createdAt BETWEEN ("${createdAtFrom}T18:30:00.000Z") AND ("${createdAtTo}T18:30:01.000Z")`,
          );
        }
      }

      if (query?.where?.lastSeen?.between) {
        const lastSeen = query?.where?.lastSeen?.between;

        let lastSeenDates: any = [];
        if (typeof lastSeen === 'object') {
          if (Array.isArray(lastSeen)) {
            lastSeenDates = lastSeen;
          }
        } else if (typeof lastSeen === 'string') {
          lastSeenDates = lastSeen.split('|');
        }

        if (lastSeenDates.length === 2) {
          const lastSeenFrom = DateTime.fromFormat(
            lastSeenDates[0],
            'yyyy-MM-dd',
          )
            .setZone('asia/kolkata')
            .minus({ days: 1 })
            .toFormat('yyyy-MM-dd');

          const lastSeenTo: any = `${lastSeenDates[1]}`;

          modelQuery.andWhere(
            `user.lastSeen BETWEEN ("${lastSeenFrom}T18:30:00.000Z") AND ("${lastSeenTo}T18:30:01.000Z")`,
          );
        }
      }
    }

    if (query?.search) {
      if (!query?.where) {
        modelQuery.where('1=1');
      }
      const searchArr = query.search.split(' ');
      if (searchArr.length == 2) {
        modelQuery.andWhere(
          '((user.firstName LIKE :search OR user.lastName LIKE :search OR user.email LIKE :search OR user.trackingId LIKE :search) OR (user.firstName LIKE :firstName AND user.lastName LIKE :lastName))',
          {
            search: `%${query.search.trim()}%`,
            firstName: `${searchArr[0].trim()}%`,
            lastName: `${searchArr[1].trim()}%`,
          },
        );
      } else {
        modelQuery.andWhere(
          '(user.firstName LIKE :search OR user.lastName LIKE :search OR user.email LIKE :search OR user.trackingId LIKE :search)',
          { search: `%${query.search.trim()}%` },
        );
      }
    }

    if (query?.order) {
      if (query?.order?.role) {
        modelQuery.addOrderBy('user.role', query?.order?.role?.toUpperCase());
      }
      if (query?.order?.createdAt) {
        modelQuery.addOrderBy(
          'user.createdAt',
          query?.order?.createdAt?.toUpperCase(),
        );
      }
      if (query?.order?.lastSeen) {
        modelQuery.addOrderBy(
          'user.lastSeen',
          query?.order?.lastSeen?.toUpperCase(),
        );
      }
      if (query?.order?.firstName) {
        modelQuery.addOrderBy(
          'user.firstName',
          query?.order?.firstName?.toUpperCase(),
        );
      }
      if (query?.order?.id) {
        modelQuery.addOrderBy('user.id', query?.order?.id?.toUpperCase());
      }
    }

    return modelQuery;
  }

  async getAdminUserQuery(params: {
    query: ListUserDto;
    withDeleted?: boolean;
  }) {
    const { query } = params;

    const modelQuery = this.adminPanelUserCoreService.queryBuilder('adminUser');
    modelQuery.where('adminUser.deletedAt IS NULL');
    modelQuery.andWhere('adminUser.STATUS = 1');

    if (query?.where) {
      if (query?.where?.id) {
        modelQuery.andWhere('adminUser.id = :id', {
          id: query?.where?.id,
        });
      }
    }

    if (query?.search) {
      const searchArr = query.search.split(' ');
      if (searchArr.length == 2) {
        modelQuery.andWhere(
          '((adminUser.firstName LIKE :search OR adminUser.lastName LIKE :search OR adminUser.email LIKE :search) OR (adminUser.firstName LIKE :firstName AND adminUser.lastName LIKE :lastName))',
          {
            search: `%${query.search.trim()}%`,
            firstName: `${searchArr[0].trim()}%`,
            lastName: `${searchArr[1].trim()}%`,
          },
        );
      } else {
        modelQuery.andWhere(
          '(adminUser.firstName LIKE :search OR adminUser.lastName LIKE :search OR adminUser.email LIKE :search)',
          { search: `%${query.search.trim()}%` },
        );
      }
    }

    if (query?.order) {
      if (query?.order?.role) {
        modelQuery.addOrderBy(
          'adminUser.role',
          query?.order?.role?.toUpperCase(),
        );
      }
      if (query?.order?.createdAt) {
        modelQuery.addOrderBy(
          'adminUser.createdAt',
          query?.order?.createdAt?.toUpperCase(),
        );
      }
      if (query?.order?.email) {
        modelQuery.addOrderBy(
          'adminUser.email',
          query?.order?.email?.toUpperCase(),
        );
      }
      if (query?.order?.lastSeen) {
        modelQuery.addOrderBy(
          'adminUser.lastSeen',
          query?.order?.lastSeen?.toUpperCase(),
        );
      }
      if (query?.order?.firstName) {
        modelQuery.addOrderBy(
          'adminUser.firstName',
          query?.order?.firstName?.toUpperCase(),
        );
      }
      if (query?.order?.id) {
        modelQuery.addOrderBy('adminUser.id', query?.order?.id?.toUpperCase());
      }
      if (query?.order?.status) {
        modelQuery.addOrderBy(
          'adminUser.status',
          query?.order?.status?.toUpperCase(),
        );
      }
    }

    return modelQuery;
  }

  async getAccountQuery(params: {
    query: ListAccountDto;
    withDeleted?: boolean;
  }) {
    const { query, withDeleted = true } = params;

    const modelQuery = this.shAccountCoreService.queryBuilder('account');
    if (withDeleted) {
      modelQuery.withDeleted();
    }
    modelQuery.leftJoinAndSelect(
      'account.users',
      'users',
      'users.role="admin"',
    );
    modelQuery.innerJoinAndSelect(
      'account.accountSubscription',
      'accountSubscription',
    );
    modelQuery.innerJoinAndSelect('accountSubscription.plan', 'plan');
    modelQuery.leftJoinAndSelect(
      'account.adminPanelShAccountAssignees',
      'assignees',
    );
    modelQuery.leftJoinAndSelect('assignees.user', 'assigneesUser');
    modelQuery.leftJoinAndSelect(
      'account.emailVerificationCreditUsage',
      'emailVerificationCreditUsage',
    );
    modelQuery.leftJoinAndSelect(
      'account.adminPanelAccountTags',
      'adminPanelAccountTags',
    );

    if (query?.where) {
      modelQuery.where('1=1');

      if (query?.where?.id) {
        modelQuery.andWhere('account.id = :accountId', {
          accountId: query?.where?.id,
        });
      }

      if (query?.where?.industry?.in) {
        modelQuery.andWhere('account.industry IN (:...industry)', {
          industry: query?.where?.industry?.in,
        });
      } else if (query?.where?.industry?.notIn) {
        modelQuery.andWhere('account.industry NOT IN (:...industry)', {
          industry: query?.where?.industry?.notIn,
        });
      }

      if (query?.where?.teamSize?.in) {
        modelQuery.andWhere('account.teamSize IN (:...teamSize)', {
          teamSize: query?.where?.teamSize?.in,
        });
      } else if (query?.where?.teamSize?.notIn) {
        modelQuery.andWhere('account.teamSize NOT IN (:...teamSize)', {
          teamSize: query?.where?.teamSize?.notIn,
        });
      }

      if (query?.where?.users?.country?.in) {
        modelQuery.andWhere('users.country IN (:...country)', {
          country: query?.where?.users?.country?.in,
        });
      } else if (query?.where?.users?.country?.notIn) {
        modelQuery.andWhere('users.country NOT IN (:...country)', {
          country: query?.where?.users?.country?.notIn,
        });
      }

      if (query?.where?.tags?.in) {
        modelQuery.andWhere('adminPanelAccountTags.tagId IN (:...tags)', {
          tags: query?.where?.tags?.in,
        });
      } else if (query?.where?.tags?.notIn) {
        modelQuery.andWhere(
          '((adminPanelAccountTags.tagId NOT IN (:...tags)) OR adminPanelAccountTags.tagId IS NULL)',
          {
            tags: query?.where?.tags?.notIn,
          },
        );
      }

      if (query?.where?.planId?.in) {
        modelQuery.andWhere('accountSubscription.planId IN (:...planId)', {
          planId: query?.where?.planId?.in,
        });
      } else if (query?.where?.planId?.notIn) {
        modelQuery.andWhere('accountSubscription.planId NOT IN (:...planId)', {
          planId: query?.where?.planId?.notIn,
        });
      }

      if (query?.where?.planStatus?.in) {
        modelQuery.andWhere('accountSubscription.status IN (:...planStatus)', {
          planStatus: query?.where?.planStatus?.in,
        });
      } else if (query?.where?.planStatus?.notIn) {
        modelQuery.andWhere(
          'accountSubscription.status NOT IN (:...planStatus)',
          {
            planStatus: query?.where?.planStatus?.notIn,
          },
        );
      }

      if (query?.where?.accountSalesOwner?.userId?.in) {
        modelQuery.andWhere(
          '((assignees.role = "SALES" AND assignees.userId IN (:...salesOwnerId)))',
          {
            salesOwnerId: query?.where?.accountSalesOwner?.userId?.in,
          },
        );
      } else if (query?.where?.accountSalesOwner?.userId?.notIn) {
        modelQuery.andWhere(
          '((assignees.role = "SALES" AND assignees.userId NOT IN (:...salesOwnerId)) OR assignees.userId IS NULL)',
          {
            salesOwnerId: query?.where?.accountSalesOwner?.userId?.notIn,
          },
        );
      }

      if (query?.where?.accountSuccessOwner?.userId?.in) {
        modelQuery.andWhere(
          '((assignees.role = "SUCCESS" AND assignees.userId IN (:...successOwnerId)))',
          {
            successOwnerId: query?.where?.accountSuccessOwner?.userId?.in,
          },
        );
      } else if (query?.where?.accountSuccessOwner?.userId?.notIn) {
        modelQuery.andWhere(
          '((assignees.role = "SUCCESS" AND assignees.userId NOT IN (:...successOwnerId)) OR assignees.userId IS NULL)',
          {
            successOwnerId: query?.where?.accountSuccessOwner?.userId?.notIn,
          },
        );
      }

      if (query?.where?.paymentMethod?.in) {
        if (query?.where?.paymentMethod?.in.includes('null')) {
          modelQuery.andWhere(
            '((accountSubscription.paymentMethod IN (:...paymentMethod)) OR accountSubscription.paymentMethod IS NULL)',
            {
              paymentMethod: query?.where?.paymentMethod?.in,
            },
          );
        } else {
          modelQuery.andWhere(
            'accountSubscription.paymentMethod IN (:...paymentMethod)',
            {
              paymentMethod: query?.where?.paymentMethod?.in,
            },
          );
        }
      } else if (query?.where?.paymentMethod?.notIn) {
        if (query?.where?.paymentMethod?.notIn.includes('null')) {
          modelQuery.andWhere(
            '((accountSubscription.paymentMethod NOT IN (:...paymentMethod)))',
            {
              paymentMethod: query?.where?.paymentMethod?.notIn,
            },
          );
        } else {
          modelQuery.andWhere(
            '((accountSubscription.paymentMethod NOT IN (:...paymentMethod)) OR accountSubscription.paymentMethod IS NULL)',
            {
              paymentMethod: query?.where?.paymentMethod?.notIn,
            },
          );
        }
      }

      if (query?.where?.renewalType?.in) {
        modelQuery.andWhere(
          'accountSubscription.renewalType IN (:...renewalType)',
          {
            renewalType: query?.where?.renewalType?.in,
          },
        );
      } else if (query?.where?.renewalType?.notIn) {
        modelQuery.andWhere(
          '((accountSubscription.renewalType NOT IN (:...renewalType)) OR accountSubscription.paymentMethod IS NULL)',
          {
            renewalType: query?.where?.renewalType?.notIn,
          },
        );
      }

      if (query?.where?.planStartAt?.between) {
        const planStartAt = query?.where?.planStartAt?.between;

        let dates: any = [];
        if (typeof planStartAt === 'object') {
          if (Array.isArray(planStartAt)) {
            dates = planStartAt;
          }
        } else if (typeof planStartAt === 'string') {
          dates = planStartAt.split('|');
        }

        if (dates.length === 2) {
          const from = DateTime.fromFormat(dates[0], 'yyyy-MM-dd')
            .setZone('asia/kolkata')
            .minus({ days: 1 })
            .toFormat('yyyy-MM-dd');

          const to: any = `${dates[1]}`;

          modelQuery.andWhere(
            `accountSubscription.startAt BETWEEN ("${from}T18:30:00.000Z") AND ("${to}T18:30:01.000Z")`,
          );
        }
      }

      if (query?.where?.planEndAt?.between) {
        const planEndAt = query?.where?.planEndAt?.between;

        let dates: any = [];
        if (typeof planEndAt === 'object') {
          if (Array.isArray(planEndAt)) {
            dates = planEndAt;
          }
        } else if (typeof planEndAt === 'string') {
          dates = planEndAt.split('|');
        }

        if (dates.length === 2) {
          const from = DateTime.fromFormat(dates[0], 'yyyy-MM-dd')
            .setZone('asia/kolkata')
            .minus({ days: 1 })
            .toFormat('yyyy-MM-dd');

          const to: any = `${dates[1]}`;

          modelQuery.andWhere(
            `accountSubscription.endAt BETWEEN ("${from}T18:30:00.000Z") AND ("${to}T18:30:01.000Z")`,
          );
        }
      }

      if (query?.where?.createdAt?.between) {
        const createdAt = query?.where?.createdAt?.between;

        let dates: any = [];
        if (typeof createdAt === 'object') {
          if (Array.isArray(createdAt)) {
            dates = createdAt;
          }
        } else if (typeof createdAt === 'string') {
          dates = createdAt.split('|');
        }

        if (dates.length === 2) {
          const from = DateTime.fromFormat(dates[0], 'yyyy-MM-dd')
            .setZone('asia/kolkata')
            .minus({ days: 1 })
            .toFormat('yyyy-MM-dd');

          const to: any = `${dates[1]}`;

          modelQuery.andWhere(
            `account.createdAt BETWEEN ("${from}T18:30:00.000Z") AND ("${to}T18:30:01.000Z")`,
          );
        }
      }
    }

    if (query?.search) {
      if (!query?.where) {
        modelQuery.where('1=1');
      }
      const searchArr = query.search.split(' ');
      if (searchArr.length == 2) {
        modelQuery.andWhere(
          '((users.firstName LIKE :search OR users.lastName LIKE :search OR users.email LIKE :search) OR (users.firstName LIKE :firstName AND users.lastName LIKE :lastName))',
          {
            search: `%${query.search.trim()}%`,
            firstName: `${searchArr[0].trim()}%`,
            lastName: `${searchArr[1].trim()}%`,
          },
        );
      } else {
        modelQuery.andWhere(
          '(users.firstName LIKE :search OR users.lastName LIKE :search OR users.email LIKE :search)',
          { search: `%${query.search.trim()}%` },
        );
      }
    }

    if (query?.order) {
      if (query?.order?.createdAt) {
        modelQuery.addOrderBy(
          'account.createdAt',
          query?.order?.createdAt?.toUpperCase(),
        );
      }
      if (query?.order?.id) {
        modelQuery.addOrderBy('account.id', query?.order?.id?.toUpperCase());
      }
    }

    return modelQuery;
  }

  async getEmailAccountQuery(params: {
    query: ListEmailAccountDto;
    withDeleted?: boolean;
  }) {
    const { query, withDeleted = true } = params;

    const modelQuery = this.emailAccountCoreService.queryBuilder('email');
    if (withDeleted) {
      modelQuery.withDeleted();
    }
    modelQuery.innerJoinAndSelect('email.user', 'user');

    if (query?.where) {
      modelQuery.where('1=1');

      if (query?.where?.id) {
        modelQuery.andWhere('email.id = :emailId', {
          emailId: query?.where?.id,
        });
      }

      if (query?.where?.emailServiceProvider?.in) {
        modelQuery.andWhere(
          'email.emailServiceProvider IN (:...emailServiceProvider)',
          {
            emailServiceProvider: query?.where?.emailServiceProvider?.in,
          },
        );
      } else if (query?.where?.emailServiceProvider?.notIn) {
        modelQuery.andWhere(
          'email.emailServiceProvider NOT IN (:...emailServiceProvider)',
          {
            emailServiceProvider: query?.where?.emailServiceProvider?.notIn,
          },
        );
      }

      if (query?.where?.shAccountId?.in) {
        modelQuery.andWhere('email.shAccountId IN (:...shAccountId)', {
          shAccountId: query?.where?.shAccountId?.in,
        });
      } else if (query?.where?.shAccountId?.notIn) {
        modelQuery.andWhere('email.shAccountId NOT IN (:...shAccountId)', {
          shAccountId: query?.where?.shAccountId?.notIn,
        });
      }

      if (query?.where?.user?.email?.in) {
        modelQuery.andWhere('user.email IN (:...userEmail)', {
          userEmail: query?.where?.user?.email?.in,
        });
      } else if (query?.where?.user?.email?.notIn) {
        modelQuery.andWhere('user.email NOT IN (:...userEmail)', {
          userEmail: query?.where?.user?.email?.notIn,
        });
      }

      if (query?.where?.healthScore?.between) {
        const healthScore = query?.where?.healthScore?.between;

        let healthScores: any = [];
        if (typeof healthScore === 'object') {
          if (Array.isArray(healthScore)) {
            healthScores = healthScore;
          }
        } else if (typeof healthScore === 'string') {
          healthScores = healthScore.split('|');
        }

        if (healthScores.length === 2) {
          modelQuery.andWhere(
            `email.healthScore BETWEEN (${healthScores[0]}) AND (${healthScores[1]})`,
          );
        }
      }
    }

    if (query?.search) {
      if (!query?.where) {
        modelQuery.where('1=1');
      }

      modelQuery.andWhere(
        '(user.email LIKE :search OR email.fromEmail LIKE :search)',
        { search: `%${query.search.trim()}%` },
      );
    }

    if (query?.order) {
      if (query?.order?.id) {
        modelQuery.addOrderBy('email.id', query?.order?.id?.toUpperCase());
      }
      if (query?.order?.shAccountId) {
        modelQuery.addOrderBy(
          'email.shAccountId',
          query?.order?.shAccountId?.toUpperCase(),
        );
      }
      if (query?.order?.lastConnectedAt) {
        modelQuery.addOrderBy(
          'email.lastConnectedAt',
          query?.order?.lastConnectedAt?.toUpperCase(),
        );
      }
      if (query?.order?.emailServiceProvider) {
        modelQuery.addOrderBy(
          'email.emailServiceProvider',
          query?.order?.emailServiceProvider?.toUpperCase(),
        );
      }
      if (query?.order?.healthScore) {
        modelQuery.addOrderBy(
          'email.healthScore',
          query?.order?.healthScore?.toUpperCase(),
        );
      }
    }

    return modelQuery;
  }

  async getLogQuery(params: { query: ListLogDto; withDeleted?: boolean }) {
    const { query } = params;

    let searchIds: any = [];
    if (query?.search) {
      const firstSearch = [];
      const secondSearch = [];

      const firstSearchIds = firstSearch.map(({ masterLogId }) => masterLogId);
      const secondSearchIds = secondSearch.map(
        ({ masterLogId }) => masterLogId,
      );
      searchIds = [...firstSearchIds, ...secondSearchIds];

      delete query?.search;

      if (searchIds.length === 0) {
        query.where = {
          key: { in: [] },
          accountId: 0,
        };
        return query;
      } else {
        if (query?.where) {
          if (query?.where?.id) {
            query.where.id = { in: searchIds };
          } else {
            query.where['id'] = { in: searchIds };
          }
        } else {
          query['where'] = { id: { in: searchIds } };
        }
      }
    }

    return query;
  }

  async getNoteQuery(params: { query: ListNoteDto; withDeleted?: boolean }) {
    const { query, withDeleted = true } = params;

    const modelQuery =
      this.adminPanelShAccountNotesCoreService.queryBuilder('note');
    if (withDeleted) {
      modelQuery.withDeleted();
    }
    modelQuery.innerJoinAndSelect('note.user', 'user');

    if (query?.where) {
      if (!withDeleted) {
        modelQuery.where('note.deletedAt IS NULL');
      } else {
        modelQuery.where('1=1');
      }

      if (query?.where?.shAccountId) {
        modelQuery.andWhere('note.shAccountId = :shAccountId', {
          shAccountId: query?.where?.shAccountId,
        });
      }
    }

    if (query?.search) {
      if (!query?.where) {
        if (!withDeleted) {
          modelQuery.where('note.deletedAt IS NULL');
        } else {
          modelQuery.where('1=1');
        }
      }

      modelQuery.andWhere('(note.note LIKE :search)', {
        search: `%${query.search.trim()}%`,
      });
    }

    modelQuery.addOrderBy('note.isPinned', 'DESC');
    modelQuery.addOrderBy('note.createdAt', 'DESC');

    return modelQuery;
  }

  async getPlanQuery(params: { query: ListPlanDto; withDeleted?: boolean }) {
    const { query, withDeleted = true } = params;

    const allFeatures = await this.featureCoreService.findMany({});
    let emailFeatureId = 1;
    let prospectFeatureId = 2;

    for (const feature of allFeatures) {
      if (feature.code == 'PROSPECT.ADD') {
        prospectFeatureId = feature.id;
      } else if (feature.code == 'EMAIL.SEND') {
        emailFeatureId = feature.id;
      }
    }

    const modelQuery = this.planCoreService.queryBuilder('plan');
    if (withDeleted) {
      modelQuery.withDeleted();
    }

    modelQuery.innerJoinAndSelect(
      'plan_restriction',
      'emailFeature',
      `emailFeature.planId=plan.id AND emailFeature.featureId=${emailFeatureId}`,
    );

    modelQuery.innerJoinAndSelect(
      'plan_restriction',
      'prospectFeature',
      `prospectFeature.planId=plan.id AND prospectFeature.featureId=${prospectFeatureId}`,
    );

    if (query?.where) {
      if (!withDeleted) {
        modelQuery.where('plan.deletedAt IS NULL');
      } else {
        modelQuery.where('1=1');
      }

      if (query?.where?.id) {
        modelQuery.andWhere('plan.id = :id', {
          id: query?.where?.id,
        });
      }

      if (query?.where?.billingCycle?.in) {
        modelQuery.andWhere('plan.validityInDays IN (:...billingCycle)', {
          billingCycle: query?.where?.billingCycle?.in,
        });
      } else if (query?.where?.billingCycle?.notIn) {
        modelQuery.andWhere('plan.validityInDays NOT IN (:...billingCycle)', {
          billingCycle: query?.where?.billingCycle?.notIn,
        });
      }

      if (query?.where?.amount?.between) {
        const amount = query?.where?.amount?.between;

        let amounts: any = [];
        if (typeof amount === 'object') {
          if (Array.isArray(amount)) {
            amounts = amount;
          }
        } else if (typeof amount === 'string') {
          amounts = amount.split('|');
        }

        if (amounts.length === 2) {
          modelQuery.andWhere(
            `plan.amount BETWEEN (${amounts[0]}) AND (${amounts[1]})`,
          );
        }
      }

      if (query?.where?.type?.in) {
        modelQuery.andWhere('plan.type IN (:...type)', {
          type: query?.where?.type?.in,
        });
      } else if (query?.where?.type?.notIn) {
        modelQuery.andWhere('plan.type NOT IN (:...type)', {
          type: query?.where?.type?.notIn,
        });
      }

      if (query?.where?.parentId?.in) {
        modelQuery.andWhere('plan.parentId IN (:...parentId)', {
          parentId: query?.where?.parentId?.in,
        });
      } else if (query?.where?.parentId?.notIn) {
        modelQuery.andWhere('plan.parentId NOT IN (:...parentId)', {
          parentId: query?.where?.parentId?.notIn,
        });
      }

      if (query?.where?.prospectLimit?.between) {
        const prospectLimit = query?.where?.prospectLimit?.between;

        let prospectLimits: any = [];
        if (typeof prospectLimit === 'object') {
          if (Array.isArray(prospectLimit)) {
            prospectLimits = prospectLimit;
          }
        } else if (typeof prospectLimit === 'string') {
          prospectLimits = prospectLimit.split('|');
        }

        if (prospectLimits.length === 2) {
          modelQuery.andWhere(
            `prospectFeature.value BETWEEN (${prospectLimits[0]}) AND (${prospectLimits[1]})`,
          );
        }
      }

      if (query?.where?.emailLimit?.between) {
        const emailLimit = query?.where?.emailLimit?.between;

        let emailLimits: any = [];
        if (typeof emailLimit === 'object') {
          if (Array.isArray(emailLimit)) {
            emailLimits = emailLimit;
          }
        } else if (typeof emailLimit === 'string') {
          emailLimits = emailLimit.split('|');
        }

        if (emailLimits.length === 2) {
          modelQuery.andWhere(
            `emailFeature.value BETWEEN (${emailLimits[0]}) AND (${emailLimits[1]})`,
          );
        }
      }
    }

    if (query?.search) {
      if (!query?.where) {
        if (!withDeleted) {
          modelQuery.where('plan.deletedAt IS NULL');
        } else {
          modelQuery.where('1=1');
        }
      }

      modelQuery.andWhere('(plan.name LIKE :search)', {
        search: `%${query.search.trim()}%`,
      });
    }

    if (query?.order) {
      if (query?.order?.createdAt) {
        modelQuery.addOrderBy(
          'plan.createdAt',
          query?.order?.createdAt?.toUpperCase(),
        );
      }
      if (query?.order?.name) {
        modelQuery.addOrderBy('plan.name', query?.order?.name?.toUpperCase());
      }
      if (query?.order?.type) {
        modelQuery.addOrderBy('plan.type', query?.order?.type?.toUpperCase());
      }
      if (query?.order?.stripePlanId) {
        modelQuery.addOrderBy(
          'plan.stripePlanId',
          query?.order?.stripePlanId?.toUpperCase(),
        );
      }
      if (query?.order?.billingCycle) {
        modelQuery.addOrderBy(
          'plan.validityInDays',
          query?.order?.billingCycle?.toUpperCase(),
        );
      }
      if (query?.order?.amount) {
        modelQuery.addOrderBy(
          'plan.amount',
          query?.order?.amount?.toUpperCase(),
        );
      }
      if (query?.order?.parentId) {
        modelQuery.addOrderBy(
          'plan.parentId',
          query?.order?.parentId?.toUpperCase(),
        );
      }
      if (query?.order?.createdBy) {
        modelQuery.addOrderBy(
          'plan.createdBy',
          query?.order?.createdBy?.toUpperCase(),
        );
      }
      if (query?.order?.id) {
        modelQuery.addOrderBy('plan.id', query?.order?.id?.toUpperCase());
      }
    }

    return modelQuery;
  }

  async getLeadReportQuery(params: {
    query: ListLeadReportDto;
    withDeleted?: boolean;
  }) {
    const { query, withDeleted = true } = params;

    const modelQuery = this.leadFinderRevealHistoryCoreService.queryBuilder(
      'lead_finder_reveal_history',
    );
    if (withDeleted) {
      modelQuery.withDeleted();
    }

    modelQuery.where(
      `lead_finder_reveal_history.historyType = "${RevealHistoryType.Consumed}"`,
    );

    if (query?.where) {
      if (query?.where?.id) {
        modelQuery.andWhere('lead_finder_reveal_history.id = :id', {
          id: query?.where?.id,
        });
      }

      if (query?.where?.planId?.in) {
        modelQuery.andWhere(
          'lead_finder_reveal_history.currentPlanId IN (:...planId)',
          {
            planId: query?.where?.planId?.in,
          },
        );
      } else if (query?.where?.planId?.notIn) {
        modelQuery.andWhere(
          'lead_finder_reveal_history.currentPlanId NOT IN (:...planId)',
          {
            planId: query?.where?.planId?.notIn,
          },
        );
      }

      if (query?.where?.leadCount?.between) {
        const leadCount = query?.where?.leadCount?.between;

        let leadCounts: any = [];
        if (typeof leadCount === 'object') {
          if (Array.isArray(leadCount)) {
            leadCounts = leadCount;
          }
        } else if (typeof leadCount === 'string') {
          leadCounts = leadCount.split('|');
        }

        if (leadCounts.length === 2) {
          modelQuery.andWhere(
            `lead_finder_reveal_history.leadCount BETWEEN (${leadCounts[0]}) AND (${leadCounts[1]})`,
          );
        }
      }

      if (query?.where?.createdAt?.between) {
        const createdAt = query?.where?.createdAt?.between;

        let dates: any = [];
        if (typeof createdAt === 'object') {
          if (Array.isArray(createdAt)) {
            dates = createdAt;
          }
        } else if (typeof createdAt === 'string') {
          dates = createdAt.split('|');
        }

        if (dates.length === 2) {
          const from = DateTime.fromFormat(dates[0], 'yyyy-MM-dd')
            .setZone('asia/kolkata')
            .minus({ days: 1 })
            .toFormat('yyyy-MM-dd');

          const to: any = `${dates[1]}`;

          modelQuery.andWhere(
            `lead_finder_reveal_history.createdAt BETWEEN ("${from}T18:30:00.000Z") AND ("${to}T18:30:01.000Z")`,
          );
        }
      }
    }

    if (query?.search) {
      modelQuery.andWhere(
        '(lead_finder_reveal_history.currentPlanName LIKE :search)',
        {
          search: `%${query.search.trim()}%`,
        },
      );
    }

    if (query?.order) {
      if (query?.order?.createdAt) {
        modelQuery.addOrderBy(
          'lead_finder_reveal_history.createdAt',
          query?.order?.createdAt?.toUpperCase(),
        );
      }

      if (query?.order?.shAccountId) {
        modelQuery.addOrderBy(
          'lead_finder_reveal_history.shAccountId',
          query?.order?.shAccountId?.toUpperCase(),
        );
      }
      if (query?.order?.userId) {
        modelQuery.addOrderBy(
          'lead_finder_reveal_history.userId',
          query?.order?.userId?.toUpperCase(),
        );
      }
      if (query?.order?.leadCount) {
        modelQuery.addOrderBy(
          'lead_finder_reveal_history.leadCount',
          query?.order?.leadCount?.toUpperCase(),
        );
      }
      if (query?.order?.currentPlanName) {
        modelQuery.addOrderBy(
          'lead_finder_reveal_history.currentPlanName',
          query?.order?.currentPlanName?.toUpperCase(),
        );
      }
    }

    return modelQuery;
  }

  async getSessionQuery(params: {
    query: ListUserSessionDto;
    withDeleted?: boolean;
  }) {
    const { query } = params;

    const modelQuery =
      this.adminPanelUserAccessTokensCoreService.queryBuilder('session');
    modelQuery.innerJoinAndSelect('session.user', 'user');

    if (query?.where) {
      modelQuery.where('1=1');

      if (query?.where?.userId?.in) {
        modelQuery.andWhere('session.userId IN (:...userId)', {
          userId: query?.where?.userId?.in,
        });
      } else if (query?.where?.userId?.notIn) {
        modelQuery.andWhere('session.userId NOT IN (:...userId)', {
          userId: query?.where?.userId?.notIn,
        });
      }
    }

    if (query?.order) {
      if (query?.order?.createdAt) {
        modelQuery.addOrderBy(
          'session.createdAt',
          query?.order?.createdAt?.toUpperCase(),
        );
      }
      if (query?.order?.status) {
        modelQuery.addOrderBy(
          'session.status',
          query?.order?.id?.toUpperCase(),
        );
      }
    }

    return modelQuery;
  }

  async getSignupBlackListQuery(params: {
    query: ListSignupBlackListDto;
    withDeleted?: boolean;
  }) {
    const { query } = params;

    const modelQuery =
      this.signupBlackListsCoreService.queryBuilder('blacklist');
    modelQuery.innerJoinAndSelect('blacklist.user', 'user');

    if (query?.search) {
      if (!query?.where) {
        modelQuery.where('1=1');
      }

      modelQuery.andWhere(
        '(blacklist.value LIKE :search OR blacklist.note LIKE :search OR blacklist.reasonType LIKE :search)',
        { search: `%${query.search.trim()}%` },
      );
    }

    if (query?.order) {
      if (query?.order?.createdAt) {
        modelQuery.addOrderBy(
          'blacklist.createdAt',
          query?.order?.createdAt?.toUpperCase(),
        );
      }
      if (query?.order?.value) {
        modelQuery.addOrderBy(
          'blacklist.value',
          query?.order?.value?.toUpperCase(),
        );
      }
      if (query?.order?.type) {
        modelQuery.addOrderBy(
          'blacklist.type',
          query?.order?.type?.toUpperCase(),
        );
      }
      if (query?.order?.note) {
        modelQuery.addOrderBy(
          'blacklist.note',
          query?.order?.note?.toUpperCase(),
        );
      }
      if (query?.order?.reasonType) {
        modelQuery.addOrderBy(
          'blacklist.reasonType',
          query?.order?.reasonType?.toUpperCase(),
        );
      }
      if (query?.order?.id) {
        modelQuery.addOrderBy('blacklist.id', query?.order?.id?.toUpperCase());
      }
    }

    return modelQuery;
  }

  async getAdminPanelUserQuery(params: {
    query: ListUserDto;
    withDeleted?: boolean;
  }) {
    const { query, withDeleted = true } = params;

    const modelQuery = this.adminPanelUserCoreService.queryBuilder('adminUser');
    if (withDeleted) {
      modelQuery.withDeleted();
    } else {
      if (!query?.where) {
        modelQuery.where('adminUser.deletedAt IS NULL');
      }
    }

    if (query?.where) {
      if (!withDeleted) {
        modelQuery.where('adminUser.deletedAt IS NULL');
      } else {
        modelQuery.where('1=1');
      }

      if (query?.where?.id) {
        modelQuery.andWhere('adminUser.id = :id', {
          id: query?.where?.id,
        });
      }
    }

    if (query?.search) {
      if (!query?.where) {
        if (!withDeleted) {
          modelQuery.where('adminUser.deletedAt IS NULL');
        } else {
          modelQuery.where('1=1');
        }
      }
      const searchArr = query.search.split(' ');
      if (searchArr.length == 2) {
        modelQuery.andWhere(
          '((adminUser.firstName LIKE :search OR adminUser.lastName LIKE :search OR adminUser.email LIKE :search) OR (adminUser.firstName LIKE :firstName AND adminUser.lastName LIKE :lastName))',
          {
            search: `%${query.search.trim()}%`,
            firstName: `${searchArr[0].trim()}%`,
            lastName: `${searchArr[1].trim()}%`,
          },
        );
      } else {
        modelQuery.andWhere(
          '(adminUser.firstName LIKE :search OR adminUser.lastName LIKE :search OR adminUser.email LIKE :search)',
          { search: `%${query.search.trim()}%` },
        );
      }
    }

    if (query?.order) {
      if (query?.order?.role) {
        modelQuery.addOrderBy(
          'adminUser.role',
          query?.order?.role?.toUpperCase(),
        );
      }
      if (query?.order?.createdAt) {
        modelQuery.addOrderBy(
          'adminUser.createdAt',
          query?.order?.createdAt?.toUpperCase(),
        );
      }
      if (query?.order?.email) {
        modelQuery.addOrderBy(
          'adminUser.email',
          query?.order?.email?.toUpperCase(),
        );
      }
      if (query?.order?.lastSeen) {
        modelQuery.addOrderBy(
          'adminUser.lastSeen',
          query?.order?.lastSeen?.toUpperCase(),
        );
      }
      if (query?.order?.firstName) {
        modelQuery.addOrderBy(
          'adminUser.firstName',
          query?.order?.firstName?.toUpperCase(),
        );
      }
      if (query?.order?.id) {
        modelQuery.addOrderBy('adminUser.id', query?.order?.id?.toUpperCase());
      }
      if (query?.order?.status) {
        modelQuery.addOrderBy(
          'adminUser.status',
          query?.order?.status?.toUpperCase(),
        );
      }
    }

    return modelQuery;
  }

  async getAccountMeta(params: { account }) {
    const { account } = params;

    account['accountSuccessOwner'] = null;
    account['accountSalesOwner'] = null;
    account['accountTags'] = [];

    if (account?.adminPanelShAccountAssignees) {
      const accountSuccessOwner = account.adminPanelShAccountAssignees.filter(
        (d) => d.role === ShAccountAssignees.SUCCESS,
      );
      account['accountSuccessOwner'] = accountSuccessOwner[0] ?? null;

      const accountSalesOwner = account.adminPanelShAccountAssignees.filter(
        (d) => d.role === ShAccountAssignees.SALES,
      );
      account['accountSalesOwner'] = accountSalesOwner[0] ?? null;
    }

    delete account?.adminPanelShAccountAssignees;

    if (account?.adminPanelAccountTags) {
      if (account?.adminPanelAccountTags?.length > 0) {
        const tagIds = arrayColumn(account?.adminPanelAccountTags, 'tagId');

        account['accountTags'] = await this.adminPanelTagsCoreService.findMany({
          where: { id: In(tagIds) },
        });
      }
    }

    delete account?.adminPanelAccountTags;

    return account;
  }

  async getEmailAccountMeta(params: { emailAccount }) {
    const { emailAccount } = params;

    emailAccount['dailyQuota'] =
      await this.emailAccountSettingCoreService.findFirst({
        where: {
          emailAccountId: emailAccount['id'],
          code: EmailAccountSettingCode.DailySendingLimit,
        },
      });

    const emailAccountHealth = await this.emailAccountHealthModel
      .findOne({
        id: emailAccount['id'],
      })
      .exec();

    emailAccount['spf'] = emailAccountHealth?.spf?.validSpf ? 'Yes' : 'No';
    emailAccount['dmarc'] = emailAccountHealth?.dmarc?.validDmarc
      ? 'Yes'
      : 'No';

    return emailAccount;
  }

  async getPlanMetaList(
    params: { planList },
    options: { addCodeInName: boolean },
  ) {
    const { planList } = params;
    const { addCodeInName } = options;

    const planIds = arrayColumn(planList, 'id');
    const parentIds = arrayColumn(planList, 'parentId').filter(Boolean);
    const creatorIds = arrayColumn(planList, 'createdBy').filter(Boolean);

    const planRestrictions = await this.planRestrictionCoreService.findMany({
      where: { planId: In(planIds) },
      relations: ['feature'],
    });

    const planRestrictionsData = {};
    for (const restriction of planRestrictions) {
      if (typeof planRestrictionsData[restriction.planId] === 'undefined') {
        planRestrictionsData[restriction.planId] = {
          prospectLimit: '0',
          emailLimit: '0',
        };
      }

      if (restriction.feature.code == 'PROSPECT.ADD') {
        planRestrictionsData[restriction.planId]['prospectLimit'] =
          restriction.value || '0';
      } else if (restriction.feature.code == 'EMAIL.SEND') {
        planRestrictionsData[restriction.planId]['emailLimit'] =
          restriction.value || '0';
      }
    }

    const parentPlans = await this.planCoreService.findMany({
      where: { id: In(parentIds) },
    });

    const parentPlanData = {};
    for (const parentPlan of parentPlans) {
      if (typeof parentPlanData[parentPlan.id] === 'undefined') {
        parentPlanData[parentPlan.id] = {};
      }
      parentPlanData[parentPlan.id] = parentPlan;
    }

    const planCreators = await this.adminPanelUserCoreService.findMany({
      where: { id: In(creatorIds) },
    });

    const planCreatorData = {};
    for (const planCreator of planCreators) {
      if (typeof planCreatorData[planCreator.id] === 'undefined') {
        planCreatorData[planCreator.id] = {};
      }
      planCreatorData[planCreator.id] = planCreator;
    }

    const returnData = [];
    planList.forEach((v, i) => {
      let countData = { prospectLimit: '0', emailLimit: '0' };
      if (typeof planRestrictionsData[planList[i].id] !== 'undefined') {
        countData = planRestrictionsData[planList[i].id];
      }

      let pPlan = {};
      if (planList[i].parentId) {
        if (typeof parentPlanData[planList[i].parentId] !== 'undefined') {
          pPlan = parentPlanData[planList[i].parentId];
        }
      }

      let planCreatedBy = {};
      if (planList[i].createdBy) {
        if (typeof planCreatorData[planList[i].createdBy] !== 'undefined') {
          planCreatedBy = planCreatorData[planList[i].createdBy];
        }
      }

      if (addCodeInName) {
        planList[i].name = `${planList[i].name} (${planList[i].code})`;
      }

      returnData[i] = {
        ...planList[i],
        ...countData,
        parentPlan: pPlan,
        planCreatedBy,
      };
    });
    return returnData;
  }

  async getPlanMeta(params: { plan }) {
    const { plan } = params;
    const planRestrictions = await this.planRestrictionCoreService.findMany({
      where: { planId: plan.id },
      relations: ['feature'],
    });

    plan['prospectLimit'] = 0;
    plan['emailLimit'] = 0;
    plan['customerCount'] = 0;
    plan['parentPlan'] = {};
    plan['planCreatedBy'] = {};

    for (const restriction of planRestrictions) {
      if (restriction.feature.code == 'PROSPECT.ADD') {
        plan['prospectLimit'] = restriction.value;
      } else if (restriction.feature.code == 'EMAIL.SEND') {
        plan['emailLimit'] = restriction.value;
      }
    }

    if (plan?.parentId) {
      plan['parentPlan'] = await this.planCoreService.findFirst({
        where: { id: plan?.parentId },
      });
    }

    if (plan?.createdBy) {
      plan['planCreatedBy'] = await this.adminPanelUserCoreService.findFirst({
        where: { id: plan?.createdBy },
      });
    }

    plan['customerCount'] = await this.accountSubscriptionCoreService.getCounts(
      {
        where: { planId: plan?.id },
      },
    );

    return plan;
  }

  async getLeadReportList(params: { leadReportList }) {
    const { leadReportList } = params;

    const userIds = arrayColumn(leadReportList, 'userId').filter(Boolean);
    const users = await this.userCoreService.findMany({
      where: { id: In(userIds) },
    });

    const usersData = {};
    for (const u of users) {
      if (typeof usersData[u.id] === 'undefined') {
        usersData[u.id] = {};
      }
      usersData[u.id] = u;
    }

    const returnData = [];
    leadReportList.forEach((v, i) => {
      let user = {};
      if (leadReportList[i].userId) {
        if (typeof usersData[leadReportList[i].userId] !== 'undefined') {
          user = usersData[leadReportList[i].userId];
        }
      }

      returnData[i] = {
        ...leadReportList[i],
        user,
      };
    });

    return returnData;
  }

  async getTagQuery(params: {
    query: ListAdminPanelTagDto;
    withDeleted?: boolean;
  }) {
    const { query, withDeleted = true } = params;

    const modelQuery =
      this.adminPanelTagsCoreService.queryBuilder('adminPanelTag');
    if (withDeleted) {
      modelQuery.withDeleted();
    }

    if (query?.where) {
      if (!withDeleted) {
        modelQuery.where('adminPanelTag.deletedAt IS NULL');
      } else {
        modelQuery.where('1=1');
      }
    }

    if (query?.search) {
      if (!query?.where) {
        if (!withDeleted) {
          modelQuery.where('adminPanelTag.deletedAt IS NULL');
        } else {
          modelQuery.where('1=1');
        }
      }

      modelQuery.andWhere('(adminPanelTag.name LIKE :search)', {
        search: `%${query.search.trim()}%`,
      });
    }

    modelQuery.addOrderBy('adminPanelTag.createdAt', 'DESC');

    return modelQuery;
  }

  async getAgencyUserQuery(params: {
    query: ListAgencyUserDto;
    withDeleted?: boolean;
  }) {
    const { query, withDeleted = true } = params;

    const modelQuery = this.agencyUserCoreService.queryBuilder('agencyUser');
    if (withDeleted) {
      modelQuery.withDeleted();
    }
    modelQuery.innerJoinAndSelect('agencyUser.agency', 'agency');

    if (query?.where) {
      if (!withDeleted) {
        modelQuery.where('agencyUser.deletedAt IS NULL');
      } else {
        modelQuery.where('1=1');
      }

      if (query?.where?.agencyId) {
        modelQuery.andWhere('agencyUser.agencyId = :agencyId', {
          agencyId: query?.where?.agencyId,
        });
      }
    }

    if (query?.search) {
      if (!query?.where) {
        if (!withDeleted) {
          modelQuery.where('agencyUser.deletedAt IS NULL');
        } else {
          modelQuery.where('1=1');
        }
      }

      modelQuery.andWhere('(agencyUser.email LIKE :search)', {
        search: `%${query.search.trim()}%`,
      });
    }

    modelQuery.addOrderBy('agencyUser.createdAt', 'DESC');

    return modelQuery;
  }

  async getOwnerUserDetails(params: { shAccountId; userRole }) {
    const { shAccountId, userRole } = params;
    const queryBuilder = this.userCoreService
      .queryBuilder('user')
      .select([
        'user.id',
        'user.shAccountId',
        'user.firstName',
        'user.lastName',
        'user.email',
      ])
      .where('user.shAccountId = :shAccountId', { shAccountId })
      .andWhere('user.role IN (:...roles)', { roles: userRole })
      .andWhere('user.deletedAt IS NULL');
    return await queryBuilder.getOne();
  }
}
