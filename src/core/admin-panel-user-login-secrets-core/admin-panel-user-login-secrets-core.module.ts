import { Module } from '@nestjs/common';
import { AdminPanelUserLoginSecretsCoreService } from './admin-panel-user-login-secrets-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminPanelUserLoginSecrets } from './admin-panel-user-login-secrets-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminPanelUserLoginSecrets])],
  providers: [AdminPanelUserLoginSecretsCoreService],
  exports: [AdminPanelUserLoginSecretsCoreService],
})
export class AdminPanelUserLoginSecretsCoreModule {}
