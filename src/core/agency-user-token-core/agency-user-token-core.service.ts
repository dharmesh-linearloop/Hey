import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { AgencyUserToken } from './agency-user-token-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgencyUserTokenCorePaginateDto } from './agency-user-token-core.dto';

@Injectable()
export class AgencyUserTokenCoreService extends TypeormBaseRepository<
  AgencyUserToken,
  AgencyUserTokenCorePaginateDto
> {
  constructor(
    @InjectRepository(AgencyUserToken)
    private readonly agencyUserTokenRepository: Repository<AgencyUserToken>,
  ) {
    super(agencyUserTokenRepository);
  }
}
