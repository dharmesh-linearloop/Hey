import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { AccountSubscription } from './account-subscription-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountSubscriptionCorePaginateDto } from './account-subscription-core.dto';

@Injectable()
export class AccountSubscriptionCoreService extends TypeormBaseRepository<
  AccountSubscription,
  AccountSubscriptionCorePaginateDto
> {
  constructor(
    @InjectRepository(AccountSubscription)
    private readonly accountSubscriptionRepository: Repository<AccountSubscription>,
  ) {
    super(accountSubscriptionRepository);
  }
}
