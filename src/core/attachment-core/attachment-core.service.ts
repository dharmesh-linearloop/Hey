import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { Attachment } from './attachment-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttachmentCorePaginateDto } from './attachment-core.dto';

@Injectable()
export class AttachmentCoreService extends TypeormBaseRepository<
  Attachment,
  AttachmentCorePaginateDto
> {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,
  ) {
    super(attachmentRepository);
  }
}
