import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { BounceLog } from './bounce-log-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BounceLogCorePaginateDto } from './bounce-log-core.dto';

@Injectable()
export class BounceLogCoreService extends TypeormBaseRepository<
  BounceLog,
  BounceLogCorePaginateDto
> {
  constructor(
    @InjectRepository(BounceLog)
    private readonly bounceLogRepository: Repository<BounceLog>,
  ) {
    super(bounceLogRepository);
  }
}
