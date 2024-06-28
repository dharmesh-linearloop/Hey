import { Module } from '@nestjs/common';
import { SharedColumnsService } from './shared-columns.service';
import { AdminPanelUserApplicationSettingsCoreModule } from 'src/core/admin-panel-user-application-settings-core/admin-panel-user-application-settings-core.module';

@Module({
  imports: [AdminPanelUserApplicationSettingsCoreModule],
  providers: [SharedColumnsService],
  exports: [SharedColumnsService],
})
export class SharedColumnsModule {}
