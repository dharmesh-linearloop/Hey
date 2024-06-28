import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { EmailRecipient } from './email-recipient-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailRecipientCorePaginateDto } from './email-recipient-core.dto';

@Injectable()
export class EmailRecipientCoreService extends TypeormBaseRepository<
  EmailRecipient,
  EmailRecipientCorePaginateDto
> {
  constructor(
    @InjectRepository(EmailRecipient)
    private readonly emailRecipientRepository: Repository<EmailRecipient>,
  ) {
    super(emailRecipientRepository);
  }
}
