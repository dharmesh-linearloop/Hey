import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { StripeSubscriptionHistory } from './stripe-subscription-history-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StripeSubscriptionHistoryCorePaginateDto } from './stripe-subscription-history-core.dto';

@Injectable()
export class StripeSubscriptionHistoryCoreService extends TypeormBaseRepository<
  StripeSubscriptionHistory,
  StripeSubscriptionHistoryCorePaginateDto
> {
  constructor(
    @InjectRepository(StripeSubscriptionHistory)
    private readonly stripeSubscriptionHistoryRepository: Repository<StripeSubscriptionHistory>,
  ) {
    super(stripeSubscriptionHistoryRepository);
  }
}
