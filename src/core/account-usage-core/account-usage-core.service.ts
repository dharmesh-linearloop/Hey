import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { AccountUsage } from './account-usage-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountUsageCorePaginateDto } from './account-usage-core.dto';

@Injectable()
export class AccountUsageCoreService extends TypeormBaseRepository<
  AccountUsage,
  AccountUsageCorePaginateDto
> {
  constructor(
    @InjectRepository(AccountUsage)
    private readonly accountUsageRepository: Repository<AccountUsage>,
  ) {
    super(accountUsageRepository);
  }
}
