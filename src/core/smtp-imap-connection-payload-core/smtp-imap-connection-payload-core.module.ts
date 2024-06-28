import { Module } from '@nestjs/common';
import { SmtpImapConnectionPayloadCoreService } from './smtp-imap-connection-payload-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmtpImapConnectionPayload } from './smtp-imap-connection-payload-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SmtpImapConnectionPayload])],
  providers: [SmtpImapConnectionPayloadCoreService],
  exports: [SmtpImapConnectionPayloadCoreService],
})
export class SmtpImapConnectionPayloadCoreModule {}
