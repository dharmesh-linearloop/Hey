import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { SequenceStepVariantAttachment } from './sequence-step-variant-attachment-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SequenceStepVariantAttachmentCorePaginateDto } from './sequence-step-variant-attachment-core.dto';

@Injectable()
export class SequenceStepVariantAttachmentCoreService extends TypeormBaseRepository<
  SequenceStepVariantAttachment,
  SequenceStepVariantAttachmentCorePaginateDto
> {
  constructor(
    @InjectRepository(SequenceStepVariantAttachment)
    private readonly sequenceStepVariantAttachmentRepository: Repository<SequenceStepVariantAttachment>,
  ) {
    super(sequenceStepVariantAttachmentRepository);
  }
}
