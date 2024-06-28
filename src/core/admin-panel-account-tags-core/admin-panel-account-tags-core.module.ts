import { Module } from '@nestjs/common';
import { AdminPanelAccountTagsCoreService } from './admin-panel-account-tags-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminPanelAccountTags } from './admin-panel-account-tags-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminPanelAccountTags])],
  providers: [AdminPanelAccountTagsCoreService],
  exports: [AdminPanelAccountTagsCoreService],
})
export class AdminPanelAccountTagsCoreModule {}
