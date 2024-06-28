import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { WarmupEmailHistory } from './warm-up-templates-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarmupEmailHistoryCorePaginateDto } from './warm-up-templates-core.dto';

@Injectable()
export class WarmupEmailHistoryCoreService extends TypeormBaseRepository<
  WarmupEmailHistory,
  WarmupEmailHistoryCorePaginateDto
> {
  constructor(
    @InjectRepository(WarmupEmailHistory)
    private readonly warmupEmailHistoryRepository: Repository<WarmupEmailHistory>,
  ) {
    super(warmupEmailHistoryRepository);
  }
}
