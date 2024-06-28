import { Module } from '@nestjs/common';
import { ProfileProgressStepCoreService } from './profile-progress-step-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileProgressStep } from './profile-progress-step-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileProgressStep])],
  providers: [ProfileProgressStepCoreService],
  exports: [ProfileProgressStepCoreService],
})
export class ProfileProgressStepCoreModule {}
