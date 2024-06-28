import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { AccountSubscriptionHistory } from './account-subscription-history-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountSubscriptionHistoryCorePaginateDto } from './account-subscription-history-core.dto';

@Injectable()
export class AccountSubscriptionHistoryCoreService extends TypeormBaseRepository<
  AccountSubscriptionHistory,
  AccountSubscriptionHistoryCorePaginateDto
> {
  constructor(
    @InjectRepository(AccountSubscriptionHistory)
    private readonly accountSubscriptionHistoryRepository: Repository<AccountSubscriptionHistory>,
  ) {
    super(accountSubscriptionHistoryRepository);
  }
}
