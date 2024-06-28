import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { AdminPanelUserCoreModule } from 'src/core/admin-panel-user-core/admin-panel-user-core.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminPanelLogSchema } from 'src/core/mongo/schema/admin-panel-log.schema';

@Module({
  imports: [
    AdminPanelUserCoreModule,
    MongooseModule.forFeature([
      { name: 'Adminpanellog', schema: AdminPanelLogSchema },
    ]),
  ],
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
