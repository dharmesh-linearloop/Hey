import { Module } from '@nestjs/common';
import { SequenceCoreService } from './sequence-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sequence } from './sequence-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sequence])],
  providers: [SequenceCoreService],
  exports: [SequenceCoreService],
})
export class SequenceCoreModule {}
