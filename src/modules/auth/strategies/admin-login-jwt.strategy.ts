import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SharedAuthService } from 'src/shared/modules/shared-auth/shared-auth.service';
import { jwtAdminConstants } from '../keys/admin-auth.keys';
import { AdminPanelUser } from 'src/core/admin-panel-user-core/admin-panel-user-core.entity';

@Injectable()
export class AdminLoginJwtStrategy extends PassportStrategy(
  Strategy,
  'admin-jwt',
) {
  constructor(private readonly sharedAuthService: SharedAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtAdminConstants.secret,
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request & {
      headers: { authorization: string };
    },
    user: AdminPanelUser,
  ) {
    return this.sharedAuthService.performJWTStrategy({ request, user });
  }
}
