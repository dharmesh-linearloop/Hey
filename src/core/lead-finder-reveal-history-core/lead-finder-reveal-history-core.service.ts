import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { LeadFinderRevealHistory } from './lead-finder-reveal-history-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadFinderRevealHistoryCorePaginateDto } from './lead-finder-reveal-history-core.dto';

@Injectable()
export class LeadFinderRevealHistoryCoreService extends TypeormBaseRepository<
  LeadFinderRevealHistory,
  LeadFinderRevealHistoryCorePaginateDto
> {
  constructor(
    @InjectRepository(LeadFinderRevealHistory)
    private readonly leadFinderRevealHistoryRepository: Repository<LeadFinderRevealHistory>,
  ) {
    super(leadFinderRevealHistoryRepository);
  }
}
