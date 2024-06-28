import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { UserInvitation } from './user-invitations-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInvitationCorePaginateDto } from './user-invitations-core.dto';

@Injectable()
export class UserInvitationCoreService extends TypeormBaseRepository<
  UserInvitation,
  UserInvitationCorePaginateDto
> {
  constructor(
    @InjectRepository(UserInvitation)
    private readonly userInvitationRepository: Repository<UserInvitation>,
  ) {
    super(userInvitationRepository);
  }
}
