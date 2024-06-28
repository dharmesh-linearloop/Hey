import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { EmailAccount } from './email-account-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailAccountCorePaginateDto } from './email-account-core.dto';

@Injectable()
export class EmailAccountCoreService extends TypeormBaseRepository<
  EmailAccount,
  EmailAccountCorePaginateDto
> {
  constructor(
    @InjectRepository(EmailAccount)
    private readonly emailAccountRepository: Repository<EmailAccount>,
  ) {
    super(emailAccountRepository);
  }
}
