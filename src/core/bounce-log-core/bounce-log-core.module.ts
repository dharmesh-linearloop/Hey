import { Module } from '@nestjs/common';
import { BounceLogCoreService } from './bounce-log-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BounceLog } from './bounce-log-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BounceLog])],
  providers: [BounceLogCoreService],
  exports: [BounceLogCoreService],
})
export class BounceLogCoreModule {}
