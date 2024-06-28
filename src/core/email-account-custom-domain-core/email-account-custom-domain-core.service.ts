import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { EmailAccountCustomDomain } from './email-account-custom-domain-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailAccountCustomDomainCorePaginateDto } from './email-account-custom-domain-core.dto';

@Injectable()
export class EmailAccountCustomDomainCoreService extends TypeormBaseRepository<
  EmailAccountCustomDomain,
  EmailAccountCustomDomainCorePaginateDto
> {
  constructor(
    @InjectRepository(EmailAccountCustomDomain)
    private readonly emailAccountCustomDomainRepository: Repository<EmailAccountCustomDomain>,
  ) {
    super(emailAccountCustomDomainRepository);
  }
}
