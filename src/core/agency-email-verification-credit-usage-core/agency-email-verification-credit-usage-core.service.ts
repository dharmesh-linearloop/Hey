import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { AgencyEmailVerificationCreditUsage } from './agency-email-verification-credit-usage-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgencyEmailVerificationCreditUsageCorePaginateDto } from './agency-email-verification-credit-usage-core.dto';

@Injectable()
export class AgencyEmailVerificationCreditUsageCoreService extends TypeormBaseRepository<
  AgencyEmailVerificationCreditUsage,
  AgencyEmailVerificationCreditUsageCorePaginateDto
> {
  constructor(
    @InjectRepository(AgencyEmailVerificationCreditUsage)
    private readonly agencyEmailVerificationCreditUsageRepository: Repository<AgencyEmailVerificationCreditUsage>,
  ) {
    super(agencyEmailVerificationCreditUsageRepository);
  }
}
