import { Module } from '@nestjs/common';
import { EmailVerificationCreditUsageCoreService } from './email-verification-credit-usage-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerificationCreditUsage } from './email-verification-credit-usage-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailVerificationCreditUsage])],
  providers: [EmailVerificationCreditUsageCoreService],
  exports: [EmailVerificationCreditUsageCoreService],
})
export class EmailVerificationCreditUsageCoreModule {}
