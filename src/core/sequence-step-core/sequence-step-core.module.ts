import { Module } from '@nestjs/common';
import { SequenceStepCoreService } from './sequence-step-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequenceStep } from './sequence-step-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SequenceStep])],
  providers: [SequenceStepCoreService],
  exports: [SequenceStepCoreService],
})
export class SequenceStepCoreModule {}
