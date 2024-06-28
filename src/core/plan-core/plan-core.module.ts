import { Module } from '@nestjs/common';
import { PlanCoreService } from './plan-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './plan-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  providers: [PlanCoreService],
  exports: [PlanCoreService],
})
export class PlanCoreModule {}
