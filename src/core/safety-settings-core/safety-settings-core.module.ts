import { Module } from '@nestjs/common';
import { SafetySettingsCoreService } from './safety-settings-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SafetySettings } from './safety-settings-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SafetySettings])],
  providers: [SafetySettingsCoreService],
  exports: [SafetySettingsCoreService],
})
export class SafetySettingsCoreModule {}
