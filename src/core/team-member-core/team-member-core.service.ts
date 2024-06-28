import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { TeamMember } from './team-member-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMemberCorePaginateDto } from './team-member-core.dto';

@Injectable()
export class TeamMemberCoreService extends TypeormBaseRepository<
  TeamMember,
  TeamMemberCorePaginateDto
> {
  constructor(
    @InjectRepository(TeamMember)
    private readonly teamMemberRepository: Repository<TeamMember>,
  ) {
    super(teamMemberRepository);
  }
}
