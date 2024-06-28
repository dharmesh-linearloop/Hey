import { Module } from '@nestjs/common';
import { FeatureCoreService } from './feature-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from './feature-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feature])],
  providers: [FeatureCoreService],
  exports: [FeatureCoreService],
})
export class FeatureCoreModule {}
