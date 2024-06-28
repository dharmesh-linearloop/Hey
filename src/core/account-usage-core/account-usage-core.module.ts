import { Module } from '@nestjs/common';
import { AccountUsageCoreService } from './account-usage-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountUsage } from './account-usage-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountUsage])],
  providers: [AccountUsageCoreService],
  exports: [AccountUsageCoreService],
})
export class AccountUsageCoreModule {}
