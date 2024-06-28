import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { EmailAccountWarmupSettings } from './email-account-warmup-settings-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailAccountWarmupSettingsCorePaginateDto } from './email-account-warmup-settings-core.dto';

@Injectable()
export class EmailAccountWarmupSettingsCoreService extends TypeormBaseRepository<
  EmailAccountWarmupSettings,
  EmailAccountWarmupSettingsCorePaginateDto
> {
  constructor(
    @InjectRepository(EmailAccountWarmupSettings)
    private readonly emailAccountWarmupSettingsRepository: Repository<EmailAccountWarmupSettings>,
  ) {
    super(emailAccountWarmupSettingsRepository);
  }
}
