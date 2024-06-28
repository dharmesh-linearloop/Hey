import { Module } from '@nestjs/common';
import { AttachmentCoreService } from './attachment-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './attachment-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment])],
  providers: [AttachmentCoreService],
  exports: [AttachmentCoreService],
})
export class AttachmentCoreModule {}
