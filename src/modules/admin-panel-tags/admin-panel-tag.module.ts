import { Module } from '@nestjs/common';
import { AdminPanelTagController } from './admin-panel-tag.controller';
import { AdminPanelTagService } from './admin-panel-tag.service';
import { SharedQueryModule } from 'src/shared/modules/shared-query/shared-query.module';
import { AdminPanelTagsCoreModule } from 'src/core/admin-panel-tags-core/admin-panel-tags-core.module';
import { AdminPanelAccountTagsCoreModule } from 'src/core/admin-panel-account-tags-core/admin-panel-account-tags-core.module';

@Module({
  imports: [
    SharedQueryModule,
    AdminPanelTagsCoreModule,
    AdminPanelAccountTagsCoreModule,
  ],
  controllers: [AdminPanelTagController],
  providers: [AdminPanelTagService],
  exports: [AdminPanelTagService],
})
export class AdminPanelTagModule {}
