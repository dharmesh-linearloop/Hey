import { Module } from '@nestjs/common';
import { AgencyUserShAccountCoreService } from './agency-user-sh-account-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyUserShAccount } from './agency-user-sh-account-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AgencyUserShAccount])],
  providers: [AgencyUserShAccountCoreService],
  exports: [AgencyUserShAccountCoreService],
})
export class AgencyUserShAccountCoreModule {}
