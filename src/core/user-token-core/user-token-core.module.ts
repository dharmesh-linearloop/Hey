import { Module } from '@nestjs/common';
import { UserTokenCoreService } from './user-token-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserToken } from './user-token-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserToken])],
  providers: [UserTokenCoreService],
  exports: [UserTokenCoreService],
})
export class UserTokenCoreModule {}
