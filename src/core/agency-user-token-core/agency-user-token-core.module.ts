import { Module } from '@nestjs/common';
import { AgencyUserTokenCoreService } from './agency-user-token-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyUserToken } from './agency-user-token-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AgencyUserToken])],
  providers: [AgencyUserTokenCoreService],
  exports: [AgencyUserTokenCoreService],
})
export class AgencyUserTokenCoreModule {}
