import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { SentEmailAttachments } from './sent-email-attachments-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SentEmailAttachmentsCorePaginateDto } from './sent-email-attachments-core.dto';

@Injectable()
export class SentEmailAttachmentsCoreService extends TypeormBaseRepository<
  SentEmailAttachments,
  SentEmailAttachmentsCorePaginateDto
> {
  constructor(
    @InjectRepository(SentEmailAttachments)
    private readonly sentEmailAttachmentsRepository: Repository<SentEmailAttachments>,
  ) {
    super(sentEmailAttachmentsRepository);
  }
}
