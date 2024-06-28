import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { Agency } from './agency-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgencyCorePaginateDto } from './agency-core.dto';

@Injectable()
export class AgencyCoreService extends TypeormBaseRepository<
  Agency,
  AgencyCorePaginateDto
> {
  constructor(
    @InjectRepository(Agency)
    private readonly agencyRepository: Repository<Agency>,
  ) {
    super(agencyRepository);
  }
}
