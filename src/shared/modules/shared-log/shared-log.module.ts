import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedLogService } from './shared-log.service';
import { AdminPanelUserCoreModule } from 'src/core/admin-panel-user-core/admin-panel-user-core.module';
import { MasterLogSchema } from 'src/core/mongo/schema/master-log.schema';
import { AccountLogSchema } from 'src/core/mongo/schema/account-log.schema';
import { AdminPanelLogSchema } from 'src/core/mongo/schema/admin-panel-log.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Masterlog', schema: MasterLogSchema },
      { name: 'Accountlog', schema: AccountLogSchema },
      { name: 'Adminpanellog', schema: AdminPanelLogSchema },
    ]),
    AdminPanelUserCoreModule,
  ],
  providers: [SharedLogService],
  exports: [SharedLogService],
})
export class SharedLogModule {}
