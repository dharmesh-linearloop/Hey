import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { ProfileProgressStep } from './profile-progress-step-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileProgressStepCorePaginateDto } from './profile-progress-step-core.dto';

@Injectable()
export class ProfileProgressStepCoreService extends TypeormBaseRepository<
  ProfileProgressStep,
  ProfileProgressStepCorePaginateDto
> {
  constructor(
    @InjectRepository(ProfileProgressStep)
    private readonly profileProgressStepRepository: Repository<ProfileProgressStep>,
  ) {
    super(profileProgressStepRepository);
  }
}
