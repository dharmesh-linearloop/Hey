import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { AgencyUserShAccount } from './agency-user-sh-account-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgencyUserShAccountCorePaginateDto } from './agency-user-sh-account-core.dto';

@Injectable()
export class AgencyUserShAccountCoreService extends TypeormBaseRepository<
  AgencyUserShAccount,
  AgencyUserShAccountCorePaginateDto
> {
  constructor(
    @InjectRepository(AgencyUserShAccount)
    private readonly agencyUserShAccountRepository: Repository<AgencyUserShAccount>,
  ) {
    super(agencyUserShAccountRepository);
  }
}
