import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { SequenceContactHistory } from './sequence-contact-history-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SequenceContactHistoryCorePaginateDto } from './sequence-contact-history-core.dto';

@Injectable()
export class SequenceContactHistoryCoreService extends TypeormBaseRepository<
  SequenceContactHistory,
  SequenceContactHistoryCorePaginateDto
> {
  constructor(
    @InjectRepository(SequenceContactHistory)
    private readonly sequenceContactHistoryRepository: Repository<SequenceContactHistory>,
  ) {
    super(sequenceContactHistoryRepository);
  }
}
