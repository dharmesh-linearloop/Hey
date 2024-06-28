import { Module } from '@nestjs/common';
import { EmailRecipientCoreService } from './email-recipient-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailRecipient } from './email-recipient-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailRecipient])],
  providers: [EmailRecipientCoreService],
  exports: [EmailRecipientCoreService],
})
export class EmailRecipientCoreModule {}
