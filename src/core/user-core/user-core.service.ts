import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { User } from './user-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCorePaginateDto } from './user-core.dto';

@Injectable()
export class UserCoreService extends TypeormBaseRepository<
  User,
  UserCorePaginateDto
> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
}
