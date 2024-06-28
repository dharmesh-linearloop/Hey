import { Module } from '@nestjs/common';
import { SequenceSettingCoreService } from './sequence-setting-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequenceSetting } from './sequence-setting-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SequenceSetting])],
  providers: [SequenceSettingCoreService],
  exports: [SequenceSettingCoreService],
})
export class SequenceSettingCoreModule {}
