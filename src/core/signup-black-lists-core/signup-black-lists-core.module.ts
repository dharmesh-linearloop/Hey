import { Module } from '@nestjs/common';
import { SignupBlackListsCoreService } from './signup-black-lists-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignupBlackLists } from './signup-black-lists-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SignupBlackLists])],
  providers: [SignupBlackListsCoreService],
  exports: [SignupBlackListsCoreService],
})
export class SignupBlackListsCoreModule {}
