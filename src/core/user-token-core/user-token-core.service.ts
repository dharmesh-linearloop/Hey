import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { UserToken } from './user-token-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTokenCorePaginateDto } from './user-token-core.dto';

@Injectable()
export class UserTokenCoreService extends TypeormBaseRepository<
  UserToken,
  UserTokenCorePaginateDto
> {
  constructor(
    @InjectRepository(UserToken)
    private readonly userTokenRepository: Repository<UserToken>,
  ) {
    super(userTokenRepository);
  }
}
