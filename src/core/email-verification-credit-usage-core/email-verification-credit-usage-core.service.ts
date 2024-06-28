import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { EmailVerificationCreditUsage } from './email-verification-credit-usage-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailVerificationCreditUsageCorePaginateDto } from './email-verification-credit-usage-core.dto';

@Injectable()
export class EmailVerificationCreditUsageCoreService extends TypeormBaseRepository<
  EmailVerificationCreditUsage,
  EmailVerificationCreditUsageCorePaginateDto
> {
  constructor(
    @InjectRepository(EmailVerificationCreditUsage)
    private readonly emailVerificationCreditUsageRepository: Repository<EmailVerificationCreditUsage>,
  ) {
    super(emailVerificationCreditUsageRepository);
  }
}
