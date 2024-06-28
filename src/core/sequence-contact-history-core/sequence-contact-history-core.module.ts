import { Module } from '@nestjs/common';
import { SequenceContactHistoryCoreService } from './sequence-contact-history-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequenceContactHistory } from './sequence-contact-history-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SequenceContactHistory])],
  providers: [SequenceContactHistoryCoreService],
  exports: [SequenceContactHistoryCoreService],
})
export class SequenceContactHistoryCoreModule {}
