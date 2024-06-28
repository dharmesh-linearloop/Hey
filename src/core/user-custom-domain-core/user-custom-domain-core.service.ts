import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { UserCustomDomain } from './user-custom-domain-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCustomDomainCorePaginateDto } from './user-custom-domain-core.dto';

@Injectable()
export class UserCustomDomainCoreService extends TypeormBaseRepository<
  UserCustomDomain,
  UserCustomDomainCorePaginateDto
> {
  constructor(
    @InjectRepository(UserCustomDomain)
    private readonly userCustomDomainRepository: Repository<UserCustomDomain>,
  ) {
    super(userCustomDomainRepository);
  }
}
