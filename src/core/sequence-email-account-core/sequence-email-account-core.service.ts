import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { SequenceEmailAccount } from './sequence-email-account-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SequenceEmailAccountCorePaginateDto } from './sequence-email-account-core.dto';

@Injectable()
export class SequenceEmailAccountCoreService extends TypeormBaseRepository<
  SequenceEmailAccount,
  SequenceEmailAccountCorePaginateDto
> {
  constructor(
    @InjectRepository(SequenceEmailAccount)
    private readonly sequenceEmailAccountRepository: Repository<SequenceEmailAccount>,
  ) {
    super(sequenceEmailAccountRepository);
  }
}
