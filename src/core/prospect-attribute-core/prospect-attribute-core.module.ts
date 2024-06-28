import { Module } from '@nestjs/common';
import { ProspectAttributeCoreService } from './prospect-attribute-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProspectAttribute } from './prospect-attribute-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProspectAttribute])],
  providers: [ProspectAttributeCoreService],
  exports: [ProspectAttributeCoreService],
})
export class ProspectAttributeCoreModule {}
