import { Module } from '@nestjs/common';
import { AgencyCoreService } from './agency-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from './agency-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agency])],
  providers: [AgencyCoreService],
  exports: [AgencyCoreService],
})
export class AgencyCoreModule {}
