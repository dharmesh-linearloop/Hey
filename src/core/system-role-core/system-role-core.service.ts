import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { SystemRole } from './system-role-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemRoleCorePaginateDto } from './system-role-core.dto';

@Injectable()
export class SystemRoleCoreService extends TypeormBaseRepository<
  SystemRole,
  SystemRoleCorePaginateDto
> {
  constructor(
    @InjectRepository(SystemRole)
    private readonly systemRoleRepository: Repository<SystemRole>,
  ) {
    super(systemRoleRepository);
  }
}
