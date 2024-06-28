import { Module } from '@nestjs/common';
import { FieldCoreService } from './field-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './field-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Field])],
  providers: [FieldCoreService],
  exports: [FieldCoreService],
})
export class FieldCoreModule {}
