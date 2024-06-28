import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { TemplateHistory } from './template-history-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemplateHistoryCorePaginateDto } from './template-history-core.dto';

@Injectable()
export class TemplateHistoryCoreService extends TypeormBaseRepository<
  TemplateHistory,
  TemplateHistoryCorePaginateDto
> {
  constructor(
    @InjectRepository(TemplateHistory)
    private readonly templateHistoryRepository: Repository<TemplateHistory>,
  ) {
    super(templateHistoryRepository);
  }
}
