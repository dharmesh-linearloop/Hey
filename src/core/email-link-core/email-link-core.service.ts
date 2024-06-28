import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { EmailLink } from './email-link-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailLinkCorePaginateDto } from './email-link-core.dto';

@Injectable()
export class EmailLinkCoreService extends TypeormBaseRepository<
  EmailLink,
  EmailLinkCorePaginateDto
> {
  constructor(
    @InjectRepository(EmailLink)
    private readonly emailLinkRepository: Repository<EmailLink>,
  ) {
    super(emailLinkRepository);
  }
}
