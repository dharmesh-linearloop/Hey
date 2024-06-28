import { Module } from '@nestjs/common';
import { TemplateAttachmentCoreService } from './template-attachment-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateAttachment } from './template-attachment-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateAttachment])],
  providers: [TemplateAttachmentCoreService],
  exports: [TemplateAttachmentCoreService],
})
export class TemplateAttachmentCoreModule {}
