import { Module } from '@nestjs/common';
import { UserSettingCoreService } from './user-setting-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSetting } from './user-setting-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSetting])],
  providers: [UserSettingCoreService],
  exports: [UserSettingCoreService],
})
export class UserSettingCoreModule {}
