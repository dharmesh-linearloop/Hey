import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from 'src/shared/libs/typeorm-base.repository';
import { Feature } from './feature-core.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeatureCorePaginateDto } from './feature-core.dto';

@Injectable()
export class FeatureCoreService extends TypeormBaseRepository<
  Feature,
  FeatureCorePaginateDto
> {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
  ) {
    super(featureRepository);
  }
}
