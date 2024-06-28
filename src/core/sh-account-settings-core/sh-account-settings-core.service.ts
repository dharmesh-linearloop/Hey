import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { ShAccountSettings } from './sh-account-settings-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShAccountSettingsCorePaginateDto } from './sh-account-settings-core.dto';

@Injectable()
export class ShAccountSettingsCoreService extends TypeormBaseRepository<
  ShAccountSettings,
  ShAccountSettingsCorePaginateDto
> {
  constructor(
    @InjectRepository(ShAccountSettings)
    private readonly shAccountSettingsRepository: Repository<ShAccountSettings>,
  ) {
    super(shAccountSettingsRepository);
  }
}
