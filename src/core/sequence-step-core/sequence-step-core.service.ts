import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { SequenceStep } from './sequence-step-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SequenceStepCorePaginateDto } from './sequence-step-core.dto';

@Injectable()
export class SequenceStepCoreService extends TypeormBaseRepository<
  SequenceStep,
  SequenceStepCorePaginateDto
> {
  constructor(
    @InjectRepository(SequenceStep)
    private readonly sequenceStepRepository: Repository<SequenceStep>,
  ) {
    super(sequenceStepRepository);
  }
}
