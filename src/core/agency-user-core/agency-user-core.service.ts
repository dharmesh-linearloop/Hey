import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { AgencyUser } from './agency-user-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgencyUserCorePaginateDto } from './agency-user-core.dto';

@Injectable()
export class AgencyUserCoreService extends TypeormBaseRepository<
  AgencyUser,
  AgencyUserCorePaginateDto
> {
  constructor(
    @InjectRepository(AgencyUser)
    private readonly agencyUserRepository: Repository<AgencyUser>,
  ) {
    super(agencyUserRepository);
  }
}
