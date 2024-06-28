import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { SequenceStepVariant } from './sequence-step-variant-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SequenceStepVariantCorePaginateDto } from './sequence-step-variant-core.dto';

@Injectable()
export class SequenceStepVariantCoreService extends TypeormBaseRepository<
  SequenceStepVariant,
  SequenceStepVariantCorePaginateDto
> {
  constructor(
    @InjectRepository(SequenceStepVariant)
    private readonly sequenceStepVariantRepository: Repository<SequenceStepVariant>,
  ) {
    super(sequenceStepVariantRepository);
  }
}
