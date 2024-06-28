import { Module } from '@nestjs/common';
import { UserSessionController } from './user-session.controller';
import { UserSessionService } from './user-session.service';
import { SharedQueryModule } from 'src/shared/modules/shared-query/shared-query.module';
import { AdminPanelUserAccessTokensCoreModule } from 'src/core/admin-panel-user-access-tokens-core/admin-panel-user-access-tokens-core.module';

@Module({
  imports: [SharedQueryModule, AdminPanelUserAccessTokensCoreModule],
  controllers: [UserSessionController],
  providers: [UserSessionService],
  exports: [UserSessionService],
})
export class UserSessionModule {}
