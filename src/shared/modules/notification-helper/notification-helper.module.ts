import { Module } from '@nestjs/common';
import { NotificationToDataService } from './notification-to-data.service';

@Module({
  imports: [],
  providers: [NotificationToDataService],
  exports: [NotificationToDataService],
})
export class NotificationHelperModule {}
