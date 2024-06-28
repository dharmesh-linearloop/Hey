import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserCoreModule } from 'src/core/user-core/user-core.module';
import { SharedColumnsModule } from 'src/shared/modules/shared-columns/shared-columns.module';
import { SharedQueryModule } from 'src/shared/modules/shared-query/shared-query.module';
import { UserTokenCoreModule } from 'src/core/user-token-core/user-token-core.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtAdminAsUserConstants } from '../auth/keys/admin-auth.keys';
import { SharedLogModule } from 'src/shared/modules/shared-log/shared-log.module';
import { SharedUserQueryModule } from 'src/shared/modules/shared-user-query/shared-user-query.module';
import { AdminPanelUserCoreModule } from 'src/core/admin-panel-user-core/admin-panel-user-core.module';
import { ShAccountCoreModule } from 'src/core/sh-account-core/sh-account-core.module';
import { AppConfigService } from '../../app-config/app-config.service';

@Module({
  imports: [
    UserCoreModule,
    SharedColumnsModule,
    SharedQueryModule,
    SharedLogModule,
    UserTokenCoreModule,
    SharedUserQueryModule,
    AdminPanelUserCoreModule,
    ShAccountCoreModule,

    JwtModule.registerAsync({
      inject: [AppConfigService],
      useFactory: async (appConfigService: AppConfigService) => ({
        secret: appConfigService.shUserJwtSecret,
        signOptions: {
          expiresIn: jwtAdminAsUserConstants.expiresIn,
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
