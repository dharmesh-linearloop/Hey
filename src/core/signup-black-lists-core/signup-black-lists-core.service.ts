import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { SignupBlackLists } from './signup-black-lists-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupBlackListsCorePaginateDto } from './signup-black-lists-core.dto';

@Injectable()
export class SignupBlackListsCoreService extends TypeormBaseRepository<
  SignupBlackLists,
  SignupBlackListsCorePaginateDto
> {
  constructor(
    @InjectRepository(SignupBlackLists)
    private readonly adminPanelUserLoginSecretsRepository: Repository<SignupBlackLists>,
  ) {
    super(adminPanelUserLoginSecretsRepository);
  }
}
