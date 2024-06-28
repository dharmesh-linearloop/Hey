import { Module } from '@nestjs/common';
import { TemplateCoreService } from './template-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from './template-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Template])],
  providers: [TemplateCoreService],
  exports: [TemplateCoreService],
})
export class TemplateCoreModule {}
