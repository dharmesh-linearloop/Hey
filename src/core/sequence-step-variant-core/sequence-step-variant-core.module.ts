import { Module } from '@nestjs/common';
import { SequenceStepVariantCoreService } from './sequence-step-variant-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequenceStepVariant } from './sequence-step-variant-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SequenceStepVariant])],
  providers: [SequenceStepVariantCoreService],
  exports: [SequenceStepVariantCoreService],
})
export class SequenceStepVariantCoreModule {}
