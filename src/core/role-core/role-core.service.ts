import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { Role } from './role-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleCorePaginateDto } from './role-core.dto';

@Injectable()
export class RoleCoreService extends TypeormBaseRepository<
  Role,
  RoleCorePaginateDto
> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }
}
