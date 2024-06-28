import { Module } from '@nestjs/common';
import { UserProfileProgressCoreService } from './user-profile-progress-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileProgress } from './user-profile-progress-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfileProgress])],
  providers: [UserProfileProgressCoreService],
  exports: [UserProfileProgressCoreService],
})
export class UserProfileProgressCoreModule {}
