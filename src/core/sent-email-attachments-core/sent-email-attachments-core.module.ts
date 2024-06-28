import { Module } from '@nestjs/common';
import { SentEmailAttachmentsCoreService } from './sent-email-attachments-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentEmailAttachments } from './sent-email-attachments-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SentEmailAttachments])],
  providers: [SentEmailAttachmentsCoreService],
  exports: [SentEmailAttachmentsCoreService],
})
export class SentEmailAttachmentsCoreModule {}
