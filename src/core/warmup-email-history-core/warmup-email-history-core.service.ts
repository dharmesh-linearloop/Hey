import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { WarmupTemplates } from './warmup-email-history-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarmupTemplatesCorePaginateDto } from './warmup-email-history-core.dto';

@Injectable()
export class WarmupTemplatesCoreService extends TypeormBaseRepository<
  WarmupTemplates,
  WarmupTemplatesCorePaginateDto
> {
  constructor(
    @InjectRepository(WarmupTemplates)
    private readonly warmupTemplatesRepository: Repository<WarmupTemplates>,
  ) {
    super(warmupTemplatesRepository);
  }
}
