import { Module } from '@nestjs/common';
import { ProspectCoreService } from './prospect-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prospect } from './prospect-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prospect])],
  providers: [ProspectCoreService],
  exports: [ProspectCoreService],
})
export class ProspectCoreModule {}
