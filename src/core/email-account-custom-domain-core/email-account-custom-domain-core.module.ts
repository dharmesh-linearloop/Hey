import { Module } from '@nestjs/common';
import { EmailAccountCustomDomainCoreService } from './email-account-custom-domain-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailAccountCustomDomain } from './email-account-custom-domain-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailAccountCustomDomain])],
  providers: [EmailAccountCustomDomainCoreService],
  exports: [EmailAccountCustomDomainCoreService],
})
export class EmailAccountCustomDomainCoreModule {}
