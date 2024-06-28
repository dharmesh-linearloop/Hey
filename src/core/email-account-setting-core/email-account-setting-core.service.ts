import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { EmailAccountSetting } from './email-account-setting-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailAccountSettingCorePaginateDto } from './email-account-setting-core.dto';

@Injectable()
export class EmailAccountSettingCoreService extends TypeormBaseRepository<
  EmailAccountSetting,
  EmailAccountSettingCorePaginateDto
> {
  constructor(
    @InjectRepository(EmailAccountSetting)
    private readonly emailAccountSettingRepository: Repository<EmailAccountSetting>,
  ) {
    super(emailAccountSettingRepository);
  }
}
