import { Injectable, Logger } from '@nestjs/common';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ExportFiltersDto } from './dto/filter-data-export.dto';
import { ExportQueueProducer } from '../queue/export-queue/export-queue.producer';
import { EXPORT_MODULES_ENUM, ExportTypeEnum } from 'src/keys';

@Injectable()
export class ExportService {
  private readonly logger: Logger = new Logger(ExportService.name);

  constructor(private exportQueueProducer: ExportQueueProducer) {}

  async exportData(params: {
    sessionData: AdminSessionType;
    exportFiltersDto: ExportFiltersDto;
    module: EXPORT_MODULES_ENUM;
  }) {
    const {
      exportFiltersDto,
      sessionData: {
        user: { id: userId },
      },
      module,
    } = params;

    const { filters = {} } = exportFiltersDto;

    await this.exportQueueProducer.add({
      userId,
      module,
      filterQuery: JSON.stringify(filters),
      type: ExportTypeEnum.CSV,
    });

    return true;
  }
}
