import { Module } from '@nestjs/common';
import { AdminPanelUserApplicationSettingsCoreService } from './admin-panel-user-application-settings-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminPanelUserApplicationSettings } from './admin-panel-user-application-settings-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminPanelUserApplicationSettings])],
  providers: [AdminPanelUserApplicationSettingsCoreService],
  exports: [AdminPanelUserApplicationSettingsCoreService],
})
export class AdminPanelUserApplicationSettingsCoreModule {}
