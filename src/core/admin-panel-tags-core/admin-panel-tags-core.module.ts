import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminPanelTags } from './admin-panel-tags-core.entity';
import { AdminPanelTagsCoreService } from './admin-panel-tags-core.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminPanelTags])],
  providers: [AdminPanelTagsCoreService],
  exports: [AdminPanelTagsCoreService],
})
export class AdminPanelTagsCoreModule {}
