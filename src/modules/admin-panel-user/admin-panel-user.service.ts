import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ListAdminPanelUserDto } from './dto/list-admin-panel-user.dto';
import { DateTime } from 'luxon';
import { ADMIN_PANEL_USER_STATUS, COMMON_ERROR_MESSAGES } from 'src/keys';
import { UpdateAdminPanelUserDto } from './dto/update-admin-panel-user.dto';
import { SharedQueryService } from 'src/shared/modules/shared-query/shared-query.service';
import { updateDatesArr } from 'src/shared/modules/common/common.helper';
import { IsNull, Not } from 'typeorm';
import {
  AdminPanelUserChangePasswordDto,
  CreateAdminPanelUserDto,
  ReSendTokenUrlToEmailDto,
} from './dto/create-admin-panel-user.dto';
import { AdminPanelUserCoreService } from 'src/core/admin-panel-user-core/admin-panel-user-core.service';
import { AdminPanelUserCorePaginateDto } from 'src/core/admin-panel-user-core/admin-panel-user-core.dto';
import {
  ToBase64,
  encodeEmail,
  encodePassword,
} from 'src/shared/helpers/bcrypt';
import { AdminPanelUserLoginSecretsCoreService } from 'src/core/admin-panel-user-login-secrets-core/admin-panel-user-login-secrets-core.service';
import { EmailService } from 'src/shared/modules/email/email.service';
import { AppConfigService } from '../../app-config/app-config.service';

@Injectable()
export class AdminPanelUserService {
  private readonly logger: Logger = new Logger(AdminPanelUserService.name);

  constructor(
    private appConfigService: AppConfigService,
    private sharedQueryService: SharedQueryService,
    private adminPanelUserCoreService: AdminPanelUserCoreService,
    private adminPanelUserLoginSecretsCoreService: AdminPanelUserLoginSecretsCoreService,
    private emailService: EmailService,
  ) {}

  async findAll(params: {
    sessionData: AdminSessionType;
    query: ListAdminPanelUserDto;
  }): Promise<AdminPanelUserCorePaginateDto> {
    const { query } = params;

    const modelQuery = await this.sharedQueryService.getAdminPanelUserQuery({
      query,
    });

    const adminUserList =
      await this.adminPanelUserCoreService.getQueryBuilderPaginate({
        query,
        modelQuery,
      });

    adminUserList.list = await updateDatesArr(adminUserList.list);
    return adminUserList;
  }

  async create(params: {
    sessionData: AdminSessionType;
    createAdminPanelUserDto: CreateAdminPanelUserDto;
  }) {
    const { createAdminPanelUserDto, sessionData } = params;
    const { firstName, lastName, email, password, role } =
      createAdminPanelUserDto;

    const findAdminUser = await this.adminPanelUserCoreService.findUnique({
      where: { email },
    });

    if (findAdminUser) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.ADMIN_USER_EXISTS);
    }

    const createAdminUser = await this.adminPanelUserCoreService.create({
      data: {
        firstName,
        lastName,
        email,
        password: encodePassword(password),
        role,
        status: ADMIN_PANEL_USER_STATUS.Enable,
      },
    });

    try {
      await this.sendTokenUrl({ sessionData, adminUserId: createAdminUser.id });
    } catch (error) {
      this.logger.error(`sendTokenUrl: ${JSON.stringify(error)}`);
    }

    return createAdminUser;
  }

  async changePassword(params: {
    adminUserId: number;
    adminPanelUserChangePasswordDto: AdminPanelUserChangePasswordDto;
  }) {
    const {
      adminUserId,
      adminPanelUserChangePasswordDto: { password },
    } = params;

    const findAdminUser = await this.adminPanelUserCoreService.findFirst({
      where: { id: adminUserId, deletedAt: IsNull() },
    });

    if (findAdminUser) {
      const updatedData = await this.adminPanelUserCoreService.update({
        where: { id: adminUserId },
        data: {
          password: encodePassword(password),
          modifiedAt: DateTime.utc().toISO(),
        },
      });
      return updatedData;
    } else {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.USER_NOT_FOUND);
    }
  }

  async updateById(params: {
    sessionData: AdminSessionType;
    adminUserId: number;
    updateAdminPanelUserDto: UpdateAdminPanelUserDto;
  }) {
    const {
      adminUserId,
      updateAdminPanelUserDto: { firstName, lastName, email, role },
    } = params;

    const findAdminUser = await this.adminPanelUserCoreService.findFirst({
      where: { id: adminUserId, deletedAt: IsNull() },
    });

    if (findAdminUser) {
      let isEmail: any = false;
      if (email) {
        isEmail = await this.adminPanelUserCoreService.findFirst({
          where: { id: Not(adminUserId), email },
        });
      }

      if (isEmail) {
        throw new BadRequestException(COMMON_ERROR_MESSAGES.USER_EMAIL_EXISTS);
      }

      const updatedData = await this.adminPanelUserCoreService.update({
        where: { id: adminUserId },
        data: {
          firstName,
          lastName,
          email,
          role,
          modifiedAt: DateTime.utc().toISO(),
        },
      });
      return updatedData;
    } else {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.USER_NOT_FOUND);
    }
  }

  async enableUser(params: {
    sessionData: AdminSessionType;
    adminUserId: number;
  }) {
    const { adminUserId } = params;

    const findAdminUser = await this.adminPanelUserCoreService.findUnique({
      where: { id: adminUserId },
    });

    if (!findAdminUser) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return this.adminPanelUserCoreService.update({
      where: { id: adminUserId },
      data: {
        status: ADMIN_PANEL_USER_STATUS.Enable,
        modifiedAt: DateTime.utc().toISO(),
      },
    });
  }

  async disableUser(params: {
    sessionData: AdminSessionType;
    adminUserId: number;
  }) {
    const { adminUserId } = params;

    const findAdminUser = await this.adminPanelUserCoreService.findUnique({
      where: { id: adminUserId },
    });

    if (!findAdminUser) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return this.adminPanelUserCoreService.update({
      where: { id: adminUserId },
      data: {
        status: ADMIN_PANEL_USER_STATUS.Disable,
        modifiedAt: DateTime.utc().toISO(),
      },
    });
  }

  async sendTokenUrlToEmail(params: {
    reSendTokenUrlToEmailDto: ReSendTokenUrlToEmailDto;
  }) {
    const {
      reSendTokenUrlToEmailDto: { email },
    } = params;

    const adminUser = await this.adminPanelUserCoreService.findUnique({
      where: {
        email,
        deletedAt: IsNull(),
        status: ADMIN_PANEL_USER_STATUS.Enable,
      },
    });

    if (!adminUser) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return this.sendTokenUrl({ adminUserId: adminUser.id });
  }

  async sendTokenUrl(params: {
    adminUserId: number;
    sessionData?: AdminSessionType;
  }) {
    const { adminUserId } = params;

    // Check Admin User
    const adminUser = await this.adminPanelUserCoreService.findUnique({
      where: {
        id: adminUserId,
        deletedAt: IsNull(),
        status: ADMIN_PANEL_USER_STATUS.Enable,
      },
    });

    if (!adminUser) {
      throw new BadRequestException(COMMON_ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const cookieTokenExpiresAt = DateTime.utc().plus({ days: 365 }).toISO();

    const securityData =
      await this.adminPanelUserLoginSecretsCoreService.upsert({
        where: { userId: adminUser.id },
        create: {
          userId: adminUser.id,
          cookieToken: encodeEmail(adminUser.email),
          cookieTokenExpiresAt,
        },
        update: {
          cookieToken: encodeEmail(adminUser.email),
          cookieTokenExpiresAt,
        },
      });

    const url = `${this.appConfigService.shAdminApiUrl}/q/${ToBase64(
      securityData.cookieToken,
    )}`;

    await this.emailService.sendTokenUrl({
      to: adminUser.email,
      // to: 'dharmesh@linearloop.io',
      url,
      firstName: adminUser.firstName,
    });

    return 'Email is sent.';
  }
}
