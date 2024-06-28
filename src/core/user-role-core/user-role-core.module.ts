import { Module } from '@nestjs/common';
import { UserRoleCoreService } from './user-role-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './user-role-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  providers: [UserRoleCoreService],
  exports: [UserRoleCoreService],
})
export class UserRoleCoreModule {}
