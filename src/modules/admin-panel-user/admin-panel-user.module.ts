import { Module } from '@nestjs/common';
import { AdminPanelUserController } from './admin-panel-user.controller';
import { AdminPanelUserService } from './admin-panel-user.service';
import { SharedQueryModule } from 'src/shared/modules/shared-query/shared-query.module';
import { AdminPanelUserCoreModule } from 'src/core/admin-panel-user-core/admin-panel-user-core.module';
import { AdminPanelUserLoginSecretsCoreModule } from 'src/core/admin-panel-user-login-secrets-core/admin-panel-user-login-secrets-core.module';
import { EmailModule } from 'src/shared/modules/email/email.module';
import { AppConfigModule } from '../../app-config/app-config.module';

@Module({
  imports: [
    AppConfigModule,
    SharedQueryModule,
    AdminPanelUserCoreModule,
    AdminPanelUserLoginSecretsCoreModule,
    EmailModule,
  ],
  controllers: [AdminPanelUserController],
  providers: [AdminPanelUserService],
  exports: [AdminPanelUserService],
})
export class AdminPanelUserModule {}
