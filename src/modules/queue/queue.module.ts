import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ExportQueueModule } from './export-queue/export-queue.module';
import { removeEmpty } from 'src/shared/modules/common/common.helper';
import { QueueOptions } from 'bull';
import { AppConfigService } from '../../app-config/app-config.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService): QueueOptions => ({
        redis: appConfigService.redisHost
          ? removeEmpty({
              host: appConfigService.redisHost,
              port: Number(appConfigService.redisPort),
              username: appConfigService.redisUsername,
              password: appConfigService.redisPassword,
              db: Number(appConfigService.redisDb),
              tls: {},
              connectTimeout: 30000,
            })
          : undefined,
        prefix: '{saleshandy-ap}',
        defaultJobOptions: { removeOnComplete: true },
      }),
    }),
    ExportQueueModule,
  ],
  exports: [ExportQueueModule],
})
export class QueueModule {}
