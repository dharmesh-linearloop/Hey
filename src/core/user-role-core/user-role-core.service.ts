import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { UserRole } from './user-role-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoleCorePaginateDto } from './user-role-core.dto';

@Injectable()
export class UserRoleCoreService extends TypeormBaseRepository<
  UserRole,
  UserRoleCorePaginateDto
> {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {
    super(userRoleRepository);
  }
}
