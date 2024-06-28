import { Injectable } from '@nestjs/common';
import { AdminSessionType } from 'src/shared/types/admin-session.type';
import { ListLogDto } from './dto/list-log.dto';
import {
  getServerDate,
  updateDatesArr,
} from 'src/shared/modules/common/common.helper';
import { AdminPanelUserCoreService } from 'src/core/admin-panel-user-core/admin-panel-user-core.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AccountLogsCorePaginateDto,
  AdminPanelLogDocument,
} from 'src/core/mongo/schema/admin-panel-log.schema';
import { DateTime } from 'luxon';
import {
  MasterLogArr,
  MasterLogEnumArr,
} from 'src/core/mongo/schema/master-log.schema';

@Injectable()
export class LogService {
  constructor(
    private adminPanelUserCoreService: AdminPanelUserCoreService,
    @InjectModel('Adminpanellog')
    private readonly adminPanelLogModel: Model<AdminPanelLogDocument>,
  ) {}

  async findAll(params: {
    sessionData: AdminSessionType;
    query: ListLogDto;
  }): Promise<AccountLogsCorePaginateDto> {
    const { query } = params;

    const project = {
      _id: 1,
      key: 1,
      accountId: 1,
      adminUserId: 1,
      ipAddress: 1,
      log: 1,
      note: 1,
      timestamp: 1,
      createdAt: 1,
      updatedAt: 1,
    };

    const returnData = {
      count: 0,
      hasMany: false,
      total: 0,
      list: [],
    };

    const { skip = 0, take = 10 } = query;

    let sort: any = { createdAt: -1 };
    if (query?.order?.createdAt) {
      sort = { createdAt: query?.order?.createdAt === 'desc' ? -1 : 1 };
    } else if (query?.order?.accountId) {
      sort = { accountId: query?.order?.accountId === 'desc' ? -1 : 1 };
    }

    const match: any = {};

    if (query?.where?.accountId) {
      match['accountId'] = query?.where?.accountId;
    }

    if (query?.where?.key) {
      if (query?.where?.key?.in) {
        const inKeys = query.where.key.in.map((v) => {
          return MasterLogEnumArr[v];
        });

        match['key'] = { $in: inKeys };
      } else if (query?.where?.key?.notIn) {
        const notInKeys = query.where.key.notIn.map((v) => {
          return MasterLogEnumArr[v];
        });

        match['key'] = { $nin: notInKeys };
      }
    }

    if (query?.where?.adminUserId) {
      if (query?.where?.adminUserId?.in) {
        match['adminUserId'] = { $in: query?.where?.adminUserId?.in };
      } else if (query?.where?.adminUserId?.notIn) {
        match['adminUserId'] = { $nin: query?.where?.adminUserId?.notIn };
      }
    }

    if (query?.where?.createdAt) {
      if (query?.where?.createdAt?.between) {
        const createdAt = query?.where?.createdAt?.between;

        let dates: any = [];
        if (typeof createdAt === 'object') {
          if (Array.isArray(createdAt)) {
            dates = createdAt;
          }
        } else if (typeof createdAt === 'string') {
          dates = createdAt.split('|');
        }

        if (dates.length === 2) {
          let from: any = `${dates[0]}`;
          from = DateTime.fromFormat(from, 'yyyy-MM-dd')
            .setZone('asia/kolkata')
            .toISO({ includeOffset: false });
          from = getServerDate({ date: from });

          let to: any = `${dates[1]}`;
          to = DateTime.fromFormat(to, 'yyyy-MM-dd')
            .plus({ hours: 24 })
            .setZone('asia/kolkata')
            .toISO({ includeOffset: false });
          to = getServerDate({ date: to });

          match['createdAt'] = {
            $gte: new Date(DateTime.fromISO(from).toISO()),
            $lte: new Date(DateTime.fromISO(to).toISO()),
          };
        }
      }
    }

    const listData = await this.adminPanelLogModel.aggregate([
      { $match: match },
      { $project: project },
      {
        $unionWith: {
          coll: 'accountlogs',
          pipeline: [{ $match: match }, { $project: project }],
        },
      },
      { $sort: sort },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [{ $skip: skip }, { $limit: take + 1 }],
        },
      },
    ]);

    if (listData.length > 0) {
      if (listData[0].metadata.length > 0) {
        const total = listData[0].metadata[0].total;
        let list = listData[0].data;

        let hasMany = false;
        if (list.length > take) {
          hasMany = true;
          list = list.slice(0, -1);
        }

        returnData.total = total;
        returnData.list = list;
        returnData.hasMany = hasMany;
        returnData.count = list.length;

        await Promise.all(
          returnData.list.map(async (data, i) => {
            returnData.list[i]['key'] = MasterLogArr[returnData.list[i]['key']];

            returnData.list[i]['adminUser'] =
              await this.adminPanelUserCoreService.findFirst({
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                  role: true,
                },
                where: {
                  id: Number(returnData.list[i]['adminUserId']),
                },
              });
          }),
        );

        returnData.list = await updateDatesArr(
          JSON.parse(JSON.stringify(returnData.list)),
        );
      }
    }

    return returnData;
  }
}
