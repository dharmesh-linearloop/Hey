import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { Plan } from './plan-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanCorePaginateDto } from './plan-core.dto';

@Injectable()
export class PlanCoreService extends TypeormBaseRepository<
  Plan,
  PlanCorePaginateDto
> {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {
    super(planRepository);
  }
}
