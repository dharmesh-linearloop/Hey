import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { SmtpImapConnectionPayload } from './smtp-imap-connection-payload-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmtpImapConnectionPayloadCorePaginateDto } from './smtp-imap-connection-payload-core.dto';

@Injectable()
export class SmtpImapConnectionPayloadCoreService extends TypeormBaseRepository<
  SmtpImapConnectionPayload,
  SmtpImapConnectionPayloadCorePaginateDto
> {
  constructor(
    @InjectRepository(SmtpImapConnectionPayload)
    private readonly smtpImapConnectionPayloadRepository: Repository<SmtpImapConnectionPayload>,
  ) {
    super(smtpImapConnectionPayloadRepository);
  }
}
