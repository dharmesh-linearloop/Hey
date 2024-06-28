import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { AdminPanelUserCoreService } from 'src/core/admin-panel-user-core/admin-panel-user-core.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  MasterLogDocument,
  MasterLogEnum,
  SentenceTemplates,
} from 'src/core/mongo/schema/master-log.schema';
import { AccountLogDocument } from 'src/core/mongo/schema/account-log.schema';
import { AdminPanelLogDocument } from 'src/core/mongo/schema/admin-panel-log.schema';

@Injectable()
export class SharedLogService {
  constructor(
    private adminPanelUserCoreService: AdminPanelUserCoreService,

    @InjectModel('Masterlog')
    private readonly masterLogModel: Model<MasterLogDocument>,
    @InjectModel('Accountlog')
    private readonly accountLogModel: Model<AccountLogDocument>,
    @InjectModel('Adminpanellog')
    private readonly adminPanelLogModel: Model<AdminPanelLogDocument>,
  ) {}

  async processLog(params: {
    event: MasterLogEnum;
    eventLogDetail: {
      ipAddress: string;
      executorId: number;
      accountId: number;
      logData: any;
    };
    isAdminLog?: boolean;
  }) {
    try {
      const { event, eventLogDetail, isAdminLog = false } = params;
      const { ipAddress, accountId, executorId, logData } = eventLogDetail;

      const executor = await this.adminPanelUserCoreService.findFirst({
        where: { id: executorId },
      });

      const createLogData = {
        key: event,
        accountId,
        ipAddress,
        log: {
          ...logData,
          executor: {
            id: executor.id,
            firstName: executor.firstName,
            lastName: executor.lastName,
            role: executor.role,
          },
        },
        timestamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const masterLogData = new this.masterLogModel(createLogData);
      const masterLog = await masterLogData.save();

      // const masterLog = await this.masterLogsCoreService.create({
      //   data: createLogData,
      // });

      return this.logParser({
        event,
        masterLog,
        isAdminLog,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async logParser(params: {
    event: MasterLogEnum;
    masterLog: MasterLogDocument;
    isAdminLog?: boolean;
  }) {
    const { event, masterLog, isAdminLog = false } = params;

    const log: any = masterLog.log;

    const logData = {
      key: event,
      masterLogId: masterLog._id,
      accountId: masterLog.accountId,
      ipAddress: masterLog.ipAddress,
      adminUserId: log?.executor?.id,
      note: log?.note,
      log: this.parseLogMessage({
        masterLog,
        sentenceTemplate: SentenceTemplates[event],
      }),
      timestamp: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (isAdminLog) {
      const adminPanelLogData = new this.adminPanelLogModel(logData);
      await adminPanelLogData.save();

      // await this.adminPanelLogsCoreService.create({ data: logData });
    } else {
      const accountLogData = new this.accountLogModel(logData);
      await accountLogData.save();

      // await this.accountLogsCoreService.create({ data: logData });
    }
  }

  parseLogMessage(params: {
    sentenceTemplate: string;
    masterLog: MasterLogDocument;
  }) {
    const { sentenceTemplate, masterLog } = params;
    return sentenceTemplate.replace(/{{.*?}}/g, (x) =>
      _.get(masterLog, x.slice(2, -2).trim()),
    );
  }
}
