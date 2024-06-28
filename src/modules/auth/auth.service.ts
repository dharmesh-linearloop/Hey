import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as geoIp from 'geoip-lite';
import * as requestIp from 'request-ip';
import { DateTime } from 'luxon';
import {
  AdminAuthMessages,
  AdminSessionSettings,
} from './keys/admin-auth.keys';
import {
  ResendAdminLoginOtpDto,
  AdminLoginDto,
  VerifyAdminLoginOtpDto,
} from './dto/admin-login.dto';
import { CommonService } from 'src/shared/modules/common/common.service';
import { AxiosService } from 'src/shared/modules/axios/axios.service';
import { SharedAuthService } from 'src/shared/modules/shared-auth/shared-auth.service';
import {
  ADMIN_PANEL_USER_STATUS,
  COMMON_ERROR_MESSAGES,
  DEFAULT_OTP,
} from 'src/keys';
import { FromBase64, comparePassword } from 'src/shared/helpers/bcrypt';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { EmailService } from 'src/shared/modules/email/email.service';
import { findPermissionByRole } from './keys/admin-role-permission.data';
import { AdminPanelUserCoreService } from 'src/core/admin-panel-user-core/admin-panel-user-core.service';
import { AdminPanelUserAccessTokensCoreService } from 'src/core/admin-panel-user-access-tokens-core/admin-panel-user-access-tokens-core.service';
import { AdminPanelUser } from 'src/core/admin-panel-user-core/admin-panel-user-core.entity';
import { SessionStatusEnum } from 'src/core/admin-panel-user-access-tokens-core/admin-panel-user-access-tokens-core.enum';
import { IsNull, Not } from 'typeorm';
import { AdminPanelUserLoginSecretsCoreService } from 'src/core/admin-panel-user-login-secrets-core/admin-panel-user-login-secrets-core.service';
import { AppConfigService } from '../../app-config/app-config.service';

@Injectable()
export class AdminAuthService {
  private readonly logger: Logger = new Logger(AdminAuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private commonService: CommonService,
    private axiosService: AxiosService,
    private emailService: EmailService,
    private sharedAuthService: SharedAuthService,
    private adminPanelUserCoreService: AdminPanelUserCoreService,
    private adminPanelUserAccessTokensCoreService: AdminPanelUserAccessTokensCoreService,
    private adminPanelUserLoginSecretsCoreService: AdminPanelUserLoginSecretsCoreService,
    private appConfigService: AppConfigService,
  ) {}

  async validateCaptcha(params: { captchaToken: string }) {
    const { captchaToken } = params;
    if (captchaToken) {
      const apiResponse: any = await this.axiosService.post({
        url: `https://challenges.cloudflare.com/turnstile/v0/siteverify`,
        data: {
          secret: this.appConfigService.captchaSecretKey,
          response: captchaToken,
        },
      });

      if (apiResponse.data) {
        if (!apiResponse?.data?.success) {
          throw new BadRequestException(COMMON_ERROR_MESSAGES.INVALID_CAPTCHA);
        }
      }
    }
  }

  async validateAdmin(params: { adminLoginDto: AdminLoginDto }) {
    const { adminLoginDto } = params;
    const { email, password } = adminLoginDto;

    const sendOtp = true;

    // Check Admin
    const user = await this.sharedAuthService.validateAdminEmail({ email });

    if (!comparePassword(password, user.password)) {
      throw new NotFoundException(AdminAuthMessages.INVALID_CREDENTIALS_ERROR);
    }

    return { user, sendOtp };
  }

  private async createAdminSession(params: {
    user: AdminPanelUser;
    request: Request;
  }) {
    const { request, user } = params;

    const clientIp = <string>await requestIp.getClientIp(request);
    const geoLocation = await geoIp.lookup(clientIp);

    const tokenData = {
      id: user.id,
      name: user.firstName,
      email: user.email,
    };
    const token = this.jwtService.sign(tokenData);

    const currentSession =
      await this.adminPanelUserAccessTokensCoreService.create({
        data: {
          userId: user.id,
          token,
          geoIpCountry: geoLocation?.country,
          ipAddress: clientIp,
          userAgent: request.headers['user-agent'],
          expiresAt: DateTime.utc()
            .plus({
              hours: parseInt(AdminSessionSettings.SESSION_EXPIRATION_PERIOD),
            })
            .toISO(),
        },
      });

    await this.adminPanelUserAccessTokensCoreService.updateMany({
      where: {
        status: SessionStatusEnum.CURRENT,
        userId: user.id,
        id: Not(currentSession.id),
      },
      data: {
        status: SessionStatusEnum.EXPIRED,
      },
    });

    return currentSession;
  }

  async login(params: {
    user: AdminPanelUser;
    request: Request;
  }): Promise<AdminSessionType> {
    const { user } = params;

    // Create & get session
    const session = await this.createAdminSession(params);

    return {
      user,
      session,
      role: user.role,
      permissions: findPermissionByRole(user.role),
    };
  }

  async sendLoginOtp(params: { user: AdminPanelUser }) {
    const {
      user: { id: userId, email, firstName },
    } = params;

    const security = this.commonService.generateOtp();

    await this.adminPanelUserLoginSecretsCoreService.upsert({
      where: { userId },
      create: { userId, ...security },
      update: { ...security },
    });

    const returnData = { otpRef: security.otpRef };

    if (this.appConfigService.bypassOtp === 'true') {
      returnData['otp'] = security.otp;
    } else {
      await this.emailService.sendOTP({
        to: email,
        otp: security.otp,
        firstName,
      });
    }

    return returnData;
  }

  async resendLoginOtp(params: {
    resendAdminLoginOtpDto: ResendAdminLoginOtpDto;
  }) {
    const { resendAdminLoginOtpDto } = params;
    const { otpRef } = resendAdminLoginOtpDto;

    const userSecurity =
      await this.adminPanelUserLoginSecretsCoreService.findFirst({
        where: { otpRef },
      });

    if (!userSecurity) {
      throw new BadRequestException(
        COMMON_ERROR_MESSAGES.INVALID_OTP_REFERENCE,
      );
    }

    const user = await this.adminPanelUserCoreService.findFirst({
      where: {
        id: userSecurity.userId,
        deletedAt: IsNull(),
        status: ADMIN_PANEL_USER_STATUS.Enable,
      },
    });

    if (!user) {
      throw new BadRequestException(
        COMMON_ERROR_MESSAGES.INVALID_OTP_REFERENCE,
      );
    }

    return this.sendLoginOtp({ user });
  }

  async verifyLoginOtp(params: {
    verifyAdminLoginOtpDto: VerifyAdminLoginOtpDto;
  }) {
    const { verifyAdminLoginOtpDto } = params;
    const { otp, otpRef } = verifyAdminLoginOtpDto;

    const otpData = await this.adminPanelUserLoginSecretsCoreService.findFirst({
      where: { otpRef },
    });

    if (!otpData) {
      throw new BadRequestException(
        COMMON_ERROR_MESSAGES.INVALID_OTP_REFERENCE,
      );
    }

    let checkOtp = true;
    if (this.appConfigService.bypassOtp === 'true') {
      checkOtp = otp.toString() !== DEFAULT_OTP;
    }

    if (checkOtp) {
      //check if otp is valid
      if (otpData?.otp !== otp.toString()) {
        throw new BadRequestException(AdminAuthMessages.ENTER_VALID_OTP);
      }
    }

    //check if otp is expired
    const expireAt: any = otpData?.otpExpiresAt;
    const expireAtTimestamp = DateTime.fromJSDate(expireAt).toMillis();
    const currentTimeStamp = DateTime.utc().toMillis();

    if (currentTimeStamp > expireAtTimestamp) {
      throw new BadRequestException(AdminAuthMessages.OTP_IS_EXPIRED);
    }

    return this.adminPanelUserCoreService.findFirst({
      where: { id: otpData.userId },
    });
  }

  async logout(params: { sessionData: AdminSessionType }) {
    const {
      sessionData: {
        session: { id },
      },
    } = params;

    const session = await this.adminPanelUserAccessTokensCoreService.findUnique(
      {
        where: { id },
      },
    );

    if (session && session.status == SessionStatusEnum.EXPIRED) {
      throw new BadRequestException(AdminAuthMessages.SESSION_ALREADY_EXPIRED);
    }

    await this.adminPanelUserAccessTokensCoreService.update({
      where: { id },
      data: {
        status: SessionStatusEnum.EXPIRED,
        deletedAt: DateTime.utc().toISO(),
        modifiedAt: DateTime.utc().toISO(),
      },
    });

    return { message: AdminAuthMessages.LOGOUT_SUCCESS };
  }

  async validateCookieToken(params: { token: string }) {
    const { token } = params;
    const cookieToken = FromBase64(token);

    return this.sharedAuthService.validateAdminCookieToken({ cookieToken });
  }
}
