import { Module } from '@nestjs/common';
import { SequenceStepVariantAttachmentCoreService } from './sequence-step-variant-attachment-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequenceStepVariantAttachment } from './sequence-step-variant-attachment-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SequenceStepVariantAttachment])],
  providers: [SequenceStepVariantAttachmentCoreService],
  exports: [SequenceStepVariantAttachmentCoreService],
})
export class SequenceStepVariantAttachmentCoreModule {}
