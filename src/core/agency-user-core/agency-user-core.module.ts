import { Module } from '@nestjs/common';
import { AgencyUserCoreService } from './agency-user-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyUser } from './agency-user-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AgencyUser])],
  providers: [AgencyUserCoreService],
  exports: [AgencyUserCoreService],
})
export class AgencyUserCoreModule {}
