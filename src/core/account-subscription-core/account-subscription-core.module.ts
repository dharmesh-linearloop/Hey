import { Module } from '@nestjs/common';
import { AccountSubscriptionCoreService } from './account-subscription-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountSubscription } from './account-subscription-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountSubscription])],
  providers: [AccountSubscriptionCoreService],
  exports: [AccountSubscriptionCoreService],
})
export class AccountSubscriptionCoreModule {}
