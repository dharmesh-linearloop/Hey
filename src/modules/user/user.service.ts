import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ListUserDto } from './dto/list-user.dto';
import { UserCoreService } from 'src/core/user-core/user-core.service';
import { UserCorePaginateDto } from 'src/core/user-core/user-core.dto';
import { DateTime } from 'luxon';
import { DeleteUserDto } from './dto/delete-user.dto';
import { COMMON_ERROR_MESSAGES, USER_STATUS } from 'src/keys';
import { UpdateUserDto } from './dto/update-user.dto';
import { SharedQueryService } from 'src/shared/modules/shared-query/shared-query.service';
import { UserTokenCoreService } from 'src/core/user-token-core/user-token-core.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAsUserDto } from './dto/login-as-user.dto';
import { SharedLogService } from 'src/shared/modules/shared-log/shared-log.service';
import {
  updateDates,
  updateDatesArr,
} from 'src/shared/modules/common/common.helper';
import { SharedUserQueryService } from 'src/shared/modules/shared-user-query/shared-user-query.service';
import { IsNull, Not } from 'typeorm';
import { LoginAsUserSettings } from '../auth/keys/admin-auth.keys';
import { AdminPanelUserCoreService } from 'src/core/admin-panel-user-core/admin-panel-user-core.service';
import { UserRole } from 'src/core/user-core/user-core.enum';
import { ShAccountCoreService } from 'src/core/sh-account-core/sh-account-core.service';
import { MasterLogEnum } from 'src/core/mongo/schema/master-log.schema';
import { AxiosService } from 'src/shared/modules/axios/axios.service';
import { AppConfigService } from '../../app-config/app-config.service';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly axiosService: AxiosService,
    private userCoreService: UserCoreService,
    private adminPanelUserCoreService: AdminPanelUserCoreService,
    private sharedQueryService: SharedQueryService,
    private userTokenCoreService: UserTokenCoreService,
    private jwtService: JwtService,
    private sharedLogService: SharedLogService,
    private sharedUserQueryService: SharedUserQueryService,
    private shAccountCoreService: ShAccountCoreService,
    private appConfigService: AppConfigService,
  ) {}

  async findById(params: { sessionData: AdminSessionType; userId: number }) {
    const { userId } = params;

    const modelQuery = await this.sharedQueryService.getUserQuery({
      query: { where: { id: userId } },
    });

    const userList = await this.userCoreService.getQueryBuilderPaginate({
      query: { where: { id: userId } },
      modelQuery,
    });

    const userData: any = userList.list[0];

    return updateDates(JSON.parse(JSON.stringify(userData)));
  }

  async findAll(params: {
    sessionData: AdminSessionType;
    query: ListUserDto;
  }): Promise<UserCorePaginateDto> {
    const { query } = params;

    const modelQuery = await this.sharedQueryService.getUserQuery({ query });

    const userList = await this.userCoreService.getQueryBuilderPaginate({
      query,
      modelQuery,
    });

    userList.list = await updateDatesArr(userList.list);
    return userList;
  }

  async findAllTrulyInboxUsers(query: ListUserDto) {
    const { skip, take, search, order } = query;

    const result = await this.axiosService.post({
      url: `${this.appConfigService.trulyinboxCoreBaseUrl}/admin-panel/users`,
      data: {
        search,
        take,
        skip,
        order,
      },
      config: {
        headers: {
          cvt: `J81G6iwEB&Lc`,
        },
      },
    });

    const userList = result?.data?.payload;
    userList.list = await updateDatesArr(userList.list);
    return result?.data?.payload;
  }

  async deleteById(params: {
    sessionData: AdminSessionType;
    userId: number;
    deleteUserDto: DeleteUserDto;
    ipAddress: string;
  }) {
    const {
      userId,
      sessionData: {
        user: { id: executorId },
      },
      deleteUserDto: { reason },
      ipAddress,
    } = params;

    const userData = await this.userCoreService.findFirst({
      where: { id: userId, deletedAt: IsNull(), status: USER_STATUS.Active },
    });

    if (!userData) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const accountId = userData.shAccountId;

    let userDataIds = [];
    if (userData.role === UserRole.ADMIN) {
      const allUsers = await this.userCoreService.findMany({
        where: { shAccountId: accountId },
      });
      userDataIds = allUsers.map((user) => user.id);
    } else {
      userDataIds = [userData.id];
    }

    await Promise.all(
      userDataIds.map(async (userId) => {
        await this.sharedUserQueryService.deleteUser({ userId });
      }),
    );

    if (userData.role === UserRole.ADMIN) {
      await this.shAccountCoreService.update({
        where: { id: accountId },
        data: { status: false, deletedAt: DateTime.utc().toISO() },
      });
    }

    await this.sharedLogService.processLog({
      event: MasterLogEnum.UserAccountDeleted,
      eventLogDetail: {
        accountId,
        executorId,
        ipAddress,
        logData: {
          user: {
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            shAccountId: userData.shAccountId,
          },
          note: reason,
        },
      },
    });

    return true;
  }

  async findAllAdmin(params: {
    sessionData: AdminSessionType;
    query: ListUserDto;
  }): Promise<UserCorePaginateDto> {
    const { query } = params;

    const modelQuery = await this.sharedQueryService.getAdminUserQuery({
      query,
      withDeleted: false,
    });

    const adminUserList =
      await this.adminPanelUserCoreService.getQueryBuilderPaginate({
        query,
        modelQuery,
      });

    adminUserList.list = await updateDatesArr(adminUserList.list);
    return adminUserList;
  }

  async updateById(params: {
    sessionData: AdminSessionType;
    userId: number;
    updateUserDto: UpdateUserDto;
    ipAddress: string;
  }) {
    const {
      userId,
      updateUserDto: { firstName, lastName, email, note },
      ipAddress,
      sessionData: {
        user: { id: adminUserId },
      },
    } = params;

    const user = await this.userCoreService.findFirst({
      where: { id: userId, deletedAt: IsNull(), status: USER_STATUS.Active },
    });

    if (!user) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.USER_NOT_FOUND);
    }

    if (user) {
      let isEmail: any = false;
      if (email) {
        isEmail = await this.userCoreService.findFirst({
          where: { id: Not(userId), email },
        });
      }

      if (isEmail) {
        throw new BadRequestException(COMMON_ERROR_MESSAGES.USER_EMAIL_EXISTS);
      }

      const updatedData = await this.userCoreService.update({
        where: { id: userId },
        data: {
          firstName,
          lastName,
          email,
          modifiedAt: DateTime.utc().toISO(),
        },
      });

      if (user.email !== email) {
        await this.sharedLogService.processLog({
          event: MasterLogEnum.UserInformationEmailUpdated,
          eventLogDetail: {
            accountId: user.shAccountId,
            executorId: adminUserId,
            ipAddress,
            logData: {
              user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                shAccountId: user.shAccountId,
              },
              oldData: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              },
              newData: {
                firstName,
                lastName,
                email,
              },
              note: note ?? 'User Updated',
            },
          },
        });
      }

      if (user.firstName !== firstName || user.lastName !== lastName) {
        await this.sharedLogService.processLog({
          event: MasterLogEnum.UserInformationNameUpdated,
          eventLogDetail: {
            accountId: user.shAccountId,
            executorId: adminUserId,
            ipAddress,
            logData: {
              user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                shAccountId: user.shAccountId,
              },
              oldData: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              },
              newData: {
                firstName,
                lastName,
                email,
              },
              note: note ?? 'User Updated',
            },
          },
        });
      }

      return updatedData;
    } else {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.USER_NOT_FOUND);
    }
  }

  async deleteUserSessionById(params: {
    sessionData: AdminSessionType;
    userId: number;
  }) {
    const { userId } = params;

    const findUser = await this.userCoreService.findFirst({
      where: { id: userId, deletedAt: IsNull(), status: USER_STATUS.Active },
    });

    if (!findUser) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.USER_NOT_FOUND);
    }

    try {
      const tokens = await this.userTokenCoreService.findMany({
        where: { userId },
      });

      if (tokens) {
        const tokenKeys = tokens.map((t) => {
          return `token:${userId}:${t.token}`;
        });
        await this.redis.del(tokenKeys);
      }
    } catch (e) {}

    return this.userTokenCoreService.deleteMany({
      where: { userId },
    });
  }

  async impersonateUser(params: {
    sessionData: AdminSessionType;
    userAgent: string;
    userId: number;
    loginAsUserDto: LoginAsUserDto;
    ipAddress: string;
  }) {
    const {
      userId,
      userAgent,
      sessionData,
      ipAddress,
      loginAsUserDto: { reason },
    } = params;

    const findUser = await this.userCoreService.findFirst({
      where: { id: userId, deletedAt: IsNull() },
    });

    if (!findUser) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.USER_NOT_FOUND);
    }

    if (findUser.status === USER_STATUS.Invited) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.USER_STATUS_INVITED);
    }

    if (findUser.status === USER_STATUS.InActive) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.USER_STATUS_INACTIVE);
    }

    const adminUserId = sessionData?.user?.id;

    const token = await this.jwtService.sign({ sub: userId });

    const adminUser = await this.userTokenCoreService.create({
      data: {
        userAgent,
        userId: findUser.id,
        token,
        expiresAt: DateTime.utc()
          .plus({
            hours: parseInt(LoginAsUserSettings.SESSION_EXPIRATION_PERIOD),
          })
          .toISO(),
        adminUserId,
      },
    });

    const user = await this.userCoreService.findFirst({
      where: { id: userId },
    });

    await this.sharedLogService.processLog({
      event: MasterLogEnum.UserAccountAccessed,
      eventLogDetail: {
        accountId: user.shAccountId,
        executorId: adminUserId,
        ipAddress,
        logData: {
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            shAccountId: user.shAccountId,
          },
          note: reason,
        },
      },
    });

    return adminUser;
  }

  async impersonateTrulyInboxUser(params: {
    userAgent: string;
    email: string;
  }) {
    const { email, userAgent } = params;
    const result = await this.axiosService.post({
      url: `${this.appConfigService.trulyinboxCoreBaseUrl}/auth/support-token`,
      data: {
        email,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        userAgent,
      },
      config: {
        headers: {
          'support-auth-token': this.appConfigService.supportAuthToken,
        },
      },
    });
    return result?.data?.payload;
  }
}
