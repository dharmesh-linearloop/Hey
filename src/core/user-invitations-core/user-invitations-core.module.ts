import { Module } from '@nestjs/common';
import { UserInvitationCoreService } from './user-invitations-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInvitation } from './user-invitations-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInvitation])],
  providers: [UserInvitationCoreService],
  exports: [UserInvitationCoreService],
})
export class UserInvitationCoreModule {}
