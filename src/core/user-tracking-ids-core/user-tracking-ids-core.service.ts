import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { UserTrackingIds } from './user-tracking-ids-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTrackingIdsCorePaginateDto } from './user-tracking-ids-core.dto';

@Injectable()
export class UserTrackingIdsCoreService extends TypeormBaseRepository<
  UserTrackingIds,
  UserTrackingIdsCorePaginateDto
> {
  constructor(
    @InjectRepository(UserTrackingIds)
    private readonly userTrackingIdsRepository: Repository<UserTrackingIds>,
  ) {
    super(userTrackingIdsRepository);
  }
}
