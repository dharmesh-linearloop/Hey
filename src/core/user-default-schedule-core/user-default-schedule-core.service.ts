import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { UserDefaultSchedule } from './user-default-schedule-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDefaultScheduleCorePaginateDto } from './user-default-schedule-core.dto';

@Injectable()
export class UserDefaultScheduleCoreService extends TypeormBaseRepository<
  UserDefaultSchedule,
  UserDefaultScheduleCorePaginateDto
> {
  constructor(
    @InjectRepository(UserDefaultSchedule)
    private readonly userDefaultScheduleRepository: Repository<UserDefaultSchedule>,
  ) {
    super(userDefaultScheduleRepository);
  }
}
