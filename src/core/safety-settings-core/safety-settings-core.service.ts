import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { SafetySettings } from './safety-settings-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SafetySettingsCorePaginateDto } from './safety-settings-core.dto';

@Injectable()
export class SafetySettingsCoreService extends TypeormBaseRepository<
  SafetySettings,
  SafetySettingsCorePaginateDto
> {
  constructor(
    @InjectRepository(SafetySettings)
    private readonly safetySettingsRepository: Repository<SafetySettings>,
  ) {
    super(safetySettingsRepository);
  }
}
