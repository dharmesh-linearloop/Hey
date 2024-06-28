import { Module } from '@nestjs/common';
import { EmailAccountWarmupSettingsCoreService } from './email-account-warmup-settings-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailAccountWarmupSettings } from './email-account-warmup-settings-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailAccountWarmupSettings])],
  providers: [EmailAccountWarmupSettingsCoreService],
  exports: [EmailAccountWarmupSettingsCoreService],
})
export class EmailAccountWarmupSettingsCoreModule {}
