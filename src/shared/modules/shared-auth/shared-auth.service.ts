import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminSessionType } from '../../types/admin-session.type';
import { DateTime } from 'luxon';
import { AdminAuthMessages } from 'src/modules/auth/keys/admin-auth.keys';
import { findPermissionByRole } from 'src/modules/auth/keys/admin-role-permission.data';
import { ADMIN_PANEL_USER_STATUS, COMMON_ERROR_MESSAGES } from 'src/keys';
import { compareEmail } from 'src/shared/helpers/bcrypt';
import { IsNull, Not } from 'typeorm';
import { AdminPanelUserAccessTokensCoreService } from 'src/core/admin-panel-user-access-tokens-core/admin-panel-user-access-tokens-core.service';
import { SessionStatusEnum } from 'src/core/admin-panel-user-access-tokens-core/admin-panel-user-access-tokens-core.enum';
import { AdminPanelUserCoreService } from 'src/core/admin-panel-user-core/admin-panel-user-core.service';
import { AdminPanelUserLoginSecretsCoreService } from 'src/core/admin-panel-user-login-secrets-core/admin-panel-user-login-secrets-core.service';
import { AdminPanelUser } from 'src/core/admin-panel-user-core/admin-panel-user-core.entity';

@Injectable()
export class SharedAuthService {
  constructor(
    private adminPanelUserCoreService: AdminPanelUserCoreService,
    private adminPanelUserAccessTokensCoreService: AdminPanelUserAccessTokensCoreService,
    private adminPanelUserLoginSecretsCoreService: AdminPanelUserLoginSecretsCoreService,
  ) {}

  private async getDataFromHeader(params: {
    request: Request & {
      headers: { authorization: string };
    };
  }) {
    const { request } = params;

    if (!request.headers.authorization) {
      throw new UnauthorizedException(AdminAuthMessages.AUTH_HEADER_NOT_FOUND);
    }

    // for example : Bearer xxx.yyy.zzz OR Basic {base64String}
    const authHeaderValue = request.headers.authorization;

    if (!authHeaderValue.startsWith('Bearer')) {
      throw new UnauthorizedException(
        AdminAuthMessages.AUTH_HEADER_IS_NOT_BEARER,
      );
    }

    //split the string into 2 parts : 'Bearer ' and the `xxx.yyy.zzz`
    const parts = authHeaderValue.split(' ');

    if (parts.length !== 2) {
      throw new UnauthorizedException(
        AdminAuthMessages.INVALID_AUTH_HEADER_BEARER,
      );
    }

    return {
      token: parts[1],
      cookieUserData: request['cookieUserData'],
    };
  }

  private async getSessionFromToken(params: { token: string }) {
    const { token } = params;

    const userSession =
      await this.adminPanelUserAccessTokensCoreService.findFirst({
        where: { token },
      });

    if (!userSession) {
      throw new UnauthorizedException(AdminAuthMessages.SESSION_NOT_FOUND);
    }

    if (userSession.status == SessionStatusEnum.EXPIRED) {
      throw new UnauthorizedException(AdminAuthMessages.SESSION_EXPIRED);
    }

    if (
      DateTime.fromJSDate(userSession?.expiresAt).valueOf() <
      DateTime.utc().valueOf()
    ) {
      await this.adminPanelUserAccessTokensCoreService.update({
        where: { id: userSession.id },
        data: {
          status: SessionStatusEnum.EXPIRED,
          modifiedAt: DateTime.utc().toISO(),
        },
      });

      throw new UnauthorizedException(AdminAuthMessages.SESSION_EXPIRED);
    }

    return userSession;
  }

  async performJWTStrategy(params: {
    user?: AdminPanelUser;
    request: Request & {
      headers: { authorization: string };
    };
  }): Promise<AdminSessionType> {
    const { request } = params;

    // Get Data From Header
    const { token, cookieUserData } = await this.getDataFromHeader({
      request,
    });

    // Get Session From Token
    const session = await this.getSessionFromToken({ token });

    const userData = await this.adminPanelUserCoreService.findFirst({
      where: {
        id: session.userId,
        status: ADMIN_PANEL_USER_STATUS.Enable,
        deletedAt: IsNull(),
      },
    });

    if (!userData) {
      throw new UnauthorizedException(AdminAuthMessages.USER_NOT_FOUND);
    }

    // if (cookieUserData.email !== userData.email) {
    //   throw new UnauthorizedException(AdminAuthMessages.UNAUTHORIZED_USER);
    // }

    return {
      user: userData,
      session,
      role: userData.role,
      permissions: findPermissionByRole(userData.role),
    };
  }

  async validateAdminEmail(params: { email: string }) {
    const { email } = params;

    // Check Admin
    const user = await this.adminPanelUserCoreService.findFirst({
      where: {
        email,
        role: Not(IsNull()),
        deletedAt: IsNull(),
        status: ADMIN_PANEL_USER_STATUS.Enable,
      },
    });

    if (!user) {
      throw new NotFoundException(AdminAuthMessages.USER_NOT_FOUND);
    }

    return user;
  }

  async validateAdminCookieToken(params: { cookieToken: string }) {
    const { cookieToken } = params;

    const userSecurity =
      await this.adminPanelUserLoginSecretsCoreService.findFirst({
        where: { cookieToken },
      });

    if (!userSecurity) {
      throw new UnauthorizedException(AdminAuthMessages.INVALID_TOKEN);
    }

    //check if otp is expired
    const expireAt: any = userSecurity?.cookieTokenExpiresAt;
    const expireAtTimestamp = DateTime.fromJSDate(expireAt).toMillis();
    const currentTimeStamp = DateTime.utc().toMillis();

    if (currentTimeStamp > expireAtTimestamp) {
      throw new UnauthorizedException(AdminAuthMessages.INVALID_TOKEN);
    }

    const user = await this.adminPanelUserCoreService.findFirst({
      where: {
        id: userSecurity.userId,
        deletedAt: IsNull(),
        status: ADMIN_PANEL_USER_STATUS.Enable,
      },
    });

    if (!user) {
      throw new UnauthorizedException(COMMON_ERROR_MESSAGES.USER_NOT_FOUND);
    }

    if (!compareEmail(user.email, cookieToken)) {
      throw new UnauthorizedException(AdminAuthMessages.INVALID_AUTHENTICATION);
    }

    return user;
  }
}
