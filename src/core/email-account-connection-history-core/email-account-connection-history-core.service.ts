import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { EmailAccountConnectionHistory } from './email-account-connection-history-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailAccountConnectionHistoryCorePaginateDto } from './email-account-connection-history-core.dto';

@Injectable()
export class EmailAccountConnectionHistoryCoreService extends TypeormBaseRepository<
  EmailAccountConnectionHistory,
  EmailAccountConnectionHistoryCorePaginateDto
> {
  constructor(
    @InjectRepository(EmailAccountConnectionHistory)
    private readonly emailAccountConnectionHistoryRepository: Repository<EmailAccountConnectionHistory>,
  ) {
    super(emailAccountConnectionHistoryRepository);
  }
}
