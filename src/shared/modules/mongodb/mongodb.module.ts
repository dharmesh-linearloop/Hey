import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppConfigService } from '../../../app-config/app-config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (
        appConfigService: AppConfigService,
      ): MongooseModuleOptions => ({
        uri: appConfigService.mongodbDbUrl,
      }),
    }),
  ],
})
export class MongodbModule {}
