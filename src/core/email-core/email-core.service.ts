import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { Email } from './email-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailCorePaginateDto } from './email-core.dto';

@Injectable()
export class EmailCoreService extends TypeormBaseRepository<
  Email,
  EmailCorePaginateDto
> {
  constructor(
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
  ) {
    super(emailRepository);
  }
}
