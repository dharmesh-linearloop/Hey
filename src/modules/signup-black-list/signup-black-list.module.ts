import { Module } from '@nestjs/common';
import { SignupBlackListController } from './signup-black-list.controller';
import { SignupBlackListService } from './signup-black-list.service';
import { SharedQueryModule } from 'src/shared/modules/shared-query/shared-query.module';
import { SignupBlackListsCoreModule } from 'src/core/signup-black-lists-core/signup-black-lists-core.module';

@Module({
  imports: [SignupBlackListsCoreModule, SharedQueryModule],
  controllers: [SignupBlackListController],
  providers: [SignupBlackListService],
  exports: [SignupBlackListService],
})
export class SignupBlackListModule {}
