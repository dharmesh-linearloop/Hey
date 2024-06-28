import { Module } from '@nestjs/common';
import { AgencyEmailVerificationCreditUsageCoreService } from './agency-email-verification-credit-usage-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyEmailVerificationCreditUsage } from './agency-email-verification-credit-usage-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AgencyEmailVerificationCreditUsage])],
  providers: [AgencyEmailVerificationCreditUsageCoreService],
  exports: [AgencyEmailVerificationCreditUsageCoreService],
})
export class AgencyEmailVerificationCreditUsageCoreModule {}
