import { Module } from '@nestjs/common';
import { UserCustomDomainCoreService } from './user-custom-domain-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCustomDomain } from './user-custom-domain-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCustomDomain])],
  providers: [UserCustomDomainCoreService],
  exports: [UserCustomDomainCoreService],
})
export class UserCustomDomainCoreModule {}
