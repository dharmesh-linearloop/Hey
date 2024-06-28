import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { Sequence } from './sequence-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SequenceCorePaginateDto } from './sequence-core.dto';

@Injectable()
export class SequenceCoreService extends TypeormBaseRepository<
  Sequence,
  SequenceCorePaginateDto
> {
  constructor(
    @InjectRepository(Sequence)
    private readonly sequenceRepository: Repository<Sequence>,
  ) {
    super(sequenceRepository);
  }
}
