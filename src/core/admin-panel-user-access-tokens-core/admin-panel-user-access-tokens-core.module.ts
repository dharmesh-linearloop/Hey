import { Module } from '@nestjs/common';
import { AdminPanelUserAccessTokensCoreService } from './admin-panel-user-access-tokens-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminPanelUserAccessTokens } from './admin-panel-user-access-tokens-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminPanelUserAccessTokens])],
  providers: [AdminPanelUserAccessTokensCoreService],
  exports: [AdminPanelUserAccessTokensCoreService],
})
export class AdminPanelUserAccessTokensCoreModule {}
