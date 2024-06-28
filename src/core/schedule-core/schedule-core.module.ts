import { Module } from '@nestjs/common';
import { ScheduleCoreService } from './schedule-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  providers: [ScheduleCoreService],
  exports: [ScheduleCoreService],
})
export class ScheduleCoreModule {}
