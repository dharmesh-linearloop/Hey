import { Module } from '@nestjs/common';
import { UserDefaultScheduleCoreService } from './user-default-schedule-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDefaultSchedule } from './user-default-schedule-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserDefaultSchedule])],
  providers: [UserDefaultScheduleCoreService],
  exports: [UserDefaultScheduleCoreService],
})
export class UserDefaultScheduleCoreModule {}
