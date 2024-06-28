import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { TeamMemberRole } from './team-member-role-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMemberRoleCorePaginateDto } from './team-member-role-core.dto';

@Injectable()
export class TeamMemberRoleCoreService extends TypeormBaseRepository<
  TeamMemberRole,
  TeamMemberRoleCorePaginateDto
> {
  constructor(
    @InjectRepository(TeamMemberRole)
    private readonly teamMemberRoleRepository: Repository<TeamMemberRole>,
  ) {
    super(teamMemberRoleRepository);
  }
}
