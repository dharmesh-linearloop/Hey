import { Module } from '@nestjs/common';
import { EmailAccountSettingCoreService } from './email-account-setting-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailAccountSetting } from './email-account-setting-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailAccountSetting])],
  providers: [EmailAccountSettingCoreService],
  exports: [EmailAccountSettingCoreService],
})
export class EmailAccountSettingCoreModule {}
