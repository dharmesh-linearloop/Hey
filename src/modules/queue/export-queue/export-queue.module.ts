import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ExportQueueConsumer } from './export-queue.consumer';
import { ExportQueueProducer } from './export-queue.producer';
import { UserCoreModule } from 'src/core/user-core/user-core.module';
import { EmailModule } from 'src/shared/modules/email/email.module';
import { ShAccountCoreModule } from 'src/core/sh-account-core/sh-account-core.module';
import { EmailAccountCoreModule } from 'src/core/email-account-core/email-account-core.module';
import { PostmarkModule } from 'src/shared/modules/postmark/postmark.module';
import { SharedQueryModule } from 'src/shared/modules/shared-query/shared-query.module';
import { AdminPanelUserApplicationSettingsCoreModule } from 'src/core/admin-panel-user-application-settings-core/admin-panel-user-application-settings-core.module';
import { AdminPanelUserCoreModule } from 'src/core/admin-panel-user-core/admin-panel-user-core.module';
import { SharedColumnsModule } from 'src/shared/modules/shared-columns/shared-columns.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'export-queue',
    }),
    UserCoreModule,
    AdminPanelUserApplicationSettingsCoreModule,
    ShAccountCoreModule,
    EmailAccountCoreModule,
    EmailModule,
    PostmarkModule,
    SharedQueryModule,
    SharedColumnsModule,
    AdminPanelUserCoreModule,
  ],
  providers: [ExportQueueProducer, ExportQueueConsumer],
  exports: [ExportQueueProducer],
})
export class ExportQueueModule {}
