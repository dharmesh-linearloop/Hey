import { Module } from '@nestjs/common';
import { UserTrackingIdsCoreService } from './user-tracking-ids-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTrackingIds } from './user-tracking-ids-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTrackingIds])],
  providers: [UserTrackingIdsCoreService],
  exports: [UserTrackingIdsCoreService],
})
export class UserTrackingIdsCoreModule {}
