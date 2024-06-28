import { Module } from '@nestjs/common';
import { AdminPanelShAccountAssigneesCoreService } from './admin-panel-sh-account-assignees-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminPanelShAccountAssignees } from './admin-panel-sh-account-assignees-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminPanelShAccountAssignees])],
  providers: [AdminPanelShAccountAssigneesCoreService],
  exports: [AdminPanelShAccountAssigneesCoreService],
})
export class AdminPanelShAccountAssigneesCoreModule {}
