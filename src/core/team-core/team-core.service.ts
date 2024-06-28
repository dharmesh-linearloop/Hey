import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { Team } from './team-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamCorePaginateDto } from './team-core.dto';

@Injectable()
export class TeamCoreService extends TypeormBaseRepository<
  Team,
  TeamCorePaginateDto
> {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {
    super(teamRepository);
  }
}
