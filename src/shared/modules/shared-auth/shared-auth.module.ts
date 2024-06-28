import { Global, Module } from '@nestjs/common';
import { SharedAuthService } from './shared-auth.service';
import { AdminPanelUserAccessTokensCoreModule } from 'src/core/admin-panel-user-access-tokens-core/admin-panel-user-access-tokens-core.module';
import { AdminPanelUserCoreModule } from 'src/core/admin-panel-user-core/admin-panel-user-core.module';
import { AdminPanelUserLoginSecretsCoreModule } from 'src/core/admin-panel-user-login-secrets-core/admin-panel-user-login-secrets-core.module';

@Global()
@Module({
  imports: [
    AdminPanelUserCoreModule,
    AdminPanelUserAccessTokensCoreModule,
    AdminPanelUserLoginSecretsCoreModule,
  ],
  providers: [SharedAuthService],
  exports: [SharedAuthService],
})
export class SharedAuthModule {}
