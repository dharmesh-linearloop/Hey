import { Module } from '@nestjs/common';
import { EmailAccountController } from './email-account.controller';
import { EmailAccountService } from './email-account.service';
import { EmailAccountCoreModule } from 'src/core/email-account-core/email-account-core.module';
import { EmailAccountSettingCoreModule } from 'src/core/email-account-setting-core/email-account-setting-core.module';
import { SmtpImapConnectionPayloadCoreModule } from 'src/core/smtp-imap-connection-payload-core/smtp-imap-connection-payload-core.module';
import { AxiosModule } from 'src/shared/modules/axios/axios.module';
import { SharedQueryModule } from 'src/shared/modules/shared-query/shared-query.module';
import { UserCoreModule } from 'src/core/user-core/user-core.module';
import { SharedLogModule } from 'src/shared/modules/shared-log/shared-log.module';

@Module({
  imports: [
    AxiosModule,
    EmailAccountCoreModule,
    EmailAccountSettingCoreModule,
    SmtpImapConnectionPayloadCoreModule,
    SharedQueryModule,
    UserCoreModule,
    SharedLogModule,
  ],
  controllers: [EmailAccountController],
  providers: [EmailAccountService],
  exports: [EmailAccountService],
})
export class EmailAccountModule {}
