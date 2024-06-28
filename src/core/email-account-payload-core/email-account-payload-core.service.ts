import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { EmailAccountsPayload } from './email-account-payload-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailAccountsPayloadCorePaginateDto } from './email-account-payload-core.dto';

@Injectable()
export class EmailAccountsPayloadCoreService extends TypeormBaseRepository<
  EmailAccountsPayload,
  EmailAccountsPayloadCorePaginateDto
> {
  constructor(
    @InjectRepository(EmailAccountsPayload)
    private readonly emailAccountsPayloadRepository: Repository<EmailAccountsPayload>,
  ) {
    super(emailAccountsPayloadRepository);
  }
}
