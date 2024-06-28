import { Module } from '@nestjs/common';
import { SequenceEmailAccountCoreService } from './sequence-email-account-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequenceEmailAccount } from './sequence-email-account-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SequenceEmailAccount])],
  providers: [SequenceEmailAccountCoreService],
  exports: [SequenceEmailAccountCoreService],
})
export class SequenceEmailAccountCoreModule {}
