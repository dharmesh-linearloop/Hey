import { Module } from '@nestjs/common';
import { UserCoreService } from './user-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserCoreService],
  exports: [UserCoreService],
})
export class UserCoreModule {}
