import { Module } from '@nestjs/common';
import { ShAccountSettingsCoreService } from './sh-account-settings-core.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShAccountSettings } from './sh-account-settings-core.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShAccountSettings])],
  providers: [ShAccountSettingsCoreService],
  exports: [ShAccountSettingsCoreService],
})
export class ShAccountSettingsCoreModule {}
