import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminAuthMessages } from '../keys/admin-auth.keys';
import { SharedAuthService } from 'src/shared/modules/shared-auth/shared-auth.service';
import { Reflector } from '@nestjs/core';
import { FromBase64 } from 'src/shared/helpers/bcrypt';
import { AUTH_COOKIE_KEY } from 'src/keys';
import { AppConfigService } from '../../../app-config/app-config.service';

@Injectable()
export class AdminCookieTokenGuard implements CanActivate {
  constructor(
    private sharedAuthService: SharedAuthService,
    private appConfigService: AppConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    if (this.appConfigService.env !== 'PRODUCTION') {
      return true;
    }

    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    let validToken = req.cookies[AUTH_COOKIE_KEY];
    if (!validToken) {
      validToken = req.headers[AUTH_COOKIE_KEY];
    }

    if (validToken) {
      const cookieToken = FromBase64(validToken);

      const user = await this.sharedAuthService.validateAdminCookieToken({
        cookieToken,
      });

      if (user) {
        req['cookieUserData'] = user;
        return true;
      }
      throw new UnauthorizedException(AdminAuthMessages.UNAUTHORIZED_USER);
    } else {
      throw new UnauthorizedException(AdminAuthMessages.UNAUTHORIZED_USER);
    }
  }
}
