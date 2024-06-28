import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { ProspectAttribute } from './prospect-attribute-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProspectAttributeCorePaginateDto } from './prospect-attribute-core.dto';

@Injectable()
export class ProspectAttributeCoreService extends TypeormBaseRepository<
  ProspectAttribute,
  ProspectAttributeCorePaginateDto
> {
  constructor(
    @InjectRepository(ProspectAttribute)
    private readonly prospectAttributeRepository: Repository<ProspectAttribute>,
  ) {
    super(prospectAttributeRepository);
  }
}
