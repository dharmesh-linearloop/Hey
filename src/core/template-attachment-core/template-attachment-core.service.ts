import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { TemplateAttachment } from './template-attachment-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemplateAttachmentCorePaginateDto } from './template-attachment-core.dto';

@Injectable()
export class TemplateAttachmentCoreService extends TypeormBaseRepository<
  TemplateAttachment,
  TemplateAttachmentCorePaginateDto
> {
  constructor(
    @InjectRepository(TemplateAttachment)
    private readonly templateAttachmentRepository: Repository<TemplateAttachment>,
  ) {
    super(templateAttachmentRepository);
  }
}
