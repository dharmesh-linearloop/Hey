import { Module } from '@nestjs/common';
import { TeamMemberRoleCoreService } from './team-member-role-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMemberRole } from './team-member-role-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamMemberRole])],
  providers: [TeamMemberRoleCoreService],
  exports: [TeamMemberRoleCoreService],
})
export class TeamMemberRoleCoreModule {}
