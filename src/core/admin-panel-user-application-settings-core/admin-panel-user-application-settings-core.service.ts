import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { AdminPanelUserApplicationSettings } from './admin-panel-user-application-settings-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminPanelUserApplicationSettingsCorePaginateDto } from './admin-panel-user-application-settings-core.dto';

@Injectable()
export class AdminPanelUserApplicationSettingsCoreService extends TypeormBaseRepository<
  AdminPanelUserApplicationSettings,
  AdminPanelUserApplicationSettingsCorePaginateDto
> {
  constructor(
    @InjectRepository(AdminPanelUserApplicationSettings)
    private readonly adminPanelUserApplicationSettingsRepository: Repository<AdminPanelUserApplicationSettings>,
  ) {
    super(adminPanelUserApplicationSettingsRepository);
  }
}
