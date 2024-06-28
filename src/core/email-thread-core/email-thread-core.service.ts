import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { EmailThread } from './email-thread-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailThreadCorePaginateDto } from './email-thread-core.dto';

@Injectable()
export class EmailThreadCoreService extends TypeormBaseRepository<
  EmailThread,
  EmailThreadCorePaginateDto
> {
  constructor(
    @InjectRepository(EmailThread)
    private readonly emailThreadRepository: Repository<EmailThread>,
  ) {
    super(emailThreadRepository);
  }
}
