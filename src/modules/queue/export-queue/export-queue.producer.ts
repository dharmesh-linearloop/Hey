import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { EXPORT_MODULES_ENUM, ExportTypeEnum } from 'src/keys';

@Injectable()
export class ExportQueueProducer {
  constructor(
    @InjectQueue('export-queue')
    private notificationQueue: Queue,
  ) {}

  async add(params: {
    userId: string | number;
    module: EXPORT_MODULES_ENUM;
    filterQuery: any;
    type: ExportTypeEnum;
  }) {
    return this.notificationQueue.add('export-job', params, {
      removeOnComplete: true,
      delay: 500,
    });
  }
}
