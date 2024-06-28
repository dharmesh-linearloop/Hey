import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { ShAccount } from './sh-account-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShAccountCorePaginateDto } from './sh-account-core.dto';

@Injectable()
export class ShAccountCoreService extends TypeormBaseRepository<
  ShAccount,
  ShAccountCorePaginateDto
> {
  constructor(
    @InjectRepository(ShAccount)
    private readonly shAccountRepository: Repository<ShAccount>,
  ) {
    super(shAccountRepository);
  }
}
