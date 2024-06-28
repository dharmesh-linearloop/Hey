import { Module } from '@nestjs/common';
import { AccountSubscriptionHistoryCoreService } from './account-subscription-history-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountSubscriptionHistory } from './account-subscription-history-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountSubscriptionHistory])],
  providers: [AccountSubscriptionHistoryCoreService],
  exports: [AccountSubscriptionHistoryCoreService],
})
export class AccountSubscriptionHistoryCoreModule {}
