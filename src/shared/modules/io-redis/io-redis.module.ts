import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { AppConfigService } from '../../../app-config/app-config.service';

@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => ({
        config: {
          port: Number(appConfigService.redisPort),
          db: Number(appConfigService.redisDb),
          host: appConfigService.redisHost,
        },
      }),
    }),
  ],
})
export class IoRedisModule {}
