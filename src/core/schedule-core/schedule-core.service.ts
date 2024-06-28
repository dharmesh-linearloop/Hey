import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { Schedule } from './schedule-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleCorePaginateDto } from './schedule-core.dto';

@Injectable()
export class ScheduleCoreService extends TypeormBaseRepository<
  Schedule,
  ScheduleCorePaginateDto
> {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {
    super(scheduleRepository);
  }
}
