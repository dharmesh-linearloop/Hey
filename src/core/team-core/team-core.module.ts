import { Module } from '@nestjs/common';
import { TeamCoreService } from './team-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  providers: [TeamCoreService],
  exports: [TeamCoreService],
})
export class TeamCoreModule {}
