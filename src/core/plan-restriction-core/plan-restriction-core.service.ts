import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { PlanRestriction } from './plan-restriction-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanRestrictionCorePaginateDto } from './plan-restriction-core.dto';

@Injectable()
export class PlanRestrictionCoreService extends TypeormBaseRepository<
  PlanRestriction,
  PlanRestrictionCorePaginateDto
> {
  constructor(
    @InjectRepository(PlanRestriction)
    private readonly planRestrictionRepository: Repository<PlanRestriction>,
  ) {
    super(planRestrictionRepository);
  }
}
