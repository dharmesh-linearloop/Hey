import { Module } from '@nestjs/common';
import { StripeSubscriptionHistoryCoreService } from './stripe-subscription-history-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeSubscriptionHistory } from './stripe-subscription-history-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StripeSubscriptionHistory])],
  providers: [StripeSubscriptionHistoryCoreService],
  exports: [StripeSubscriptionHistoryCoreService],
})
export class StripeSubscriptionHistoryCoreModule {}
