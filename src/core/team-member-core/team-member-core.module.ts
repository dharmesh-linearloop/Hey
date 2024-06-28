import { Module } from '@nestjs/common';
import { TeamMemberCoreService } from './team-member-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMember } from './team-member-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamMember])],
  providers: [TeamMemberCoreService],
  exports: [TeamMemberCoreService],
})
export class TeamMemberCoreModule {}
