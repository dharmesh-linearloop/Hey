import { Module } from '@nestjs/common';
import { SharedUserQueryService } from './shared-user-query.service';
import { EmailAccountCoreModule } from 'src/core/email-account-core/email-account-core.module';
import { SequenceEmailAccountCoreModule } from 'src/core/sequence-email-account-core/sequence-email-account-core.module';
import { SequenceCoreModule } from 'src/core/sequence-core/sequence-core.module';
import { AxiosModule } from '../axios/axios.module';
import { UserCoreModule } from 'src/core/user-core/user-core.module';
import { EmailAccountsPayloadCoreModule } from 'src/core/email-account-payload-core/email-account-payload-core.module';
import { EmailAccountConnectionHistoryCoreModule } from 'src/core/email-account-connection-history-core/email-account-connection-history-core.module';
import { UserTokenCoreModule } from 'src/core/user-token-core/user-token-core.module';

@Module({
  imports: [
    EmailAccountCoreModule,
    SequenceEmailAccountCoreModule,
    SequenceCoreModule,
    AxiosModule,
    UserCoreModule,
    EmailAccountsPayloadCoreModule,
    EmailAccountConnectionHistoryCoreModule,
    UserTokenCoreModule,
  ],
  providers: [SharedUserQueryService],
  exports: [SharedUserQueryService],
})
export class SharedUserQueryModule {}
