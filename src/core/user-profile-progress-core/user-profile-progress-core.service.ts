import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { UserProfileProgress } from './user-profile-progress-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfileProgressCorePaginateDto } from './user-profile-progress-core.dto';

@Injectable()
export class UserProfileProgressCoreService extends TypeormBaseRepository<
  UserProfileProgress,
  UserProfileProgressCorePaginateDto
> {
  constructor(
    @InjectRepository(UserProfileProgress)
    private readonly userProfileProgressRepository: Repository<UserProfileProgress>,
  ) {
    super(userProfileProgressRepository);
  }
}
