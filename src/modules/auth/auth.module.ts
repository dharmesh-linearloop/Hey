import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtAdminConstants } from './keys/admin-auth.keys';
import { AdminAuthController } from './auth.controller';
import { AdminLoginJwtStrategy } from './strategies/admin-login-jwt.strategy';
import { AdminAuthService } from './auth.service';
import { CommonModule } from 'src/shared/modules/common/common.module';
import { SharedAuthModule } from 'src/shared/modules/shared-auth/shared-auth.module';
import { EmailModule } from 'src/shared/modules/email/email.module';
import { AdminAuthCookieController } from './auth-cookie.controller';
import { AdminPanelUserCoreModule } from 'src/core/admin-panel-user-core/admin-panel-user-core.module';
import { AdminPanelUserAccessTokensCoreModule } from 'src/core/admin-panel-user-access-tokens-core/admin-panel-user-access-tokens-core.module';
import { AdminPanelUserLoginSecretsCoreModule } from 'src/core/admin-panel-user-login-secrets-core/admin-panel-user-login-secrets-core.module';

@Module({
  imports: [
    CommonModule,
    PassportModule,
    EmailModule,
    SharedAuthModule,
    AdminPanelUserCoreModule,
    AdminPanelUserAccessTokensCoreModule,
    AdminPanelUserLoginSecretsCoreModule,
    JwtModule.register({
      secret: jwtAdminConstants.secret,
      signOptions: { expiresIn: jwtAdminConstants.expiresIn },
    }),
  ],
  controllers: [AdminAuthController, AdminAuthCookieController],
  providers: [AdminAuthService, AdminLoginJwtStrategy],
  exports: [AdminAuthService],
})
export class AdminAuthModule {}
