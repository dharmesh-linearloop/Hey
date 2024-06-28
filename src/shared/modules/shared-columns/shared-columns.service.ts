import { Injectable } from '@nestjs/common';
import { AdminSessionType } from '../../types/admin-session.type';
import { DEFAULT_COLUMN_SETTINGS } from 'src/keys';
import { SaveColumnSettingDto } from './dto/save-column-setting.dto';
import { AdminPanelUserApplicationSettingsCoreService } from 'src/core/admin-panel-user-application-settings-core/admin-panel-user-application-settings-core.service';
import { SettingTableEnum } from 'src/core/admin-panel-user-application-settings-core/admin-panel-user-application-settings-core.enum';

@Injectable()
export class SharedColumnsService {
  constructor(
    private adminPanelUserApplicationSettingsCoreService: AdminPanelUserApplicationSettingsCoreService,
  ) {}

  async saveColumns(params: {
    sessionData: AdminSessionType;
    table: SettingTableEnum;
    saveColumnSettingDto: SaveColumnSettingDto;
  }) {
    const {
      saveColumnSettingDto: { columns },
      sessionData: {
        user: { id: userId },
      },
      table,
    } = params;

    let data =
      await this.adminPanelUserApplicationSettingsCoreService.findFirst({
        where: { userId, table },
      });

    if (!data) {
      data = await this.adminPanelUserApplicationSettingsCoreService.create({
        data: { userId, table, columns: JSON.stringify(columns) },
      });
    } else {
      data = await this.adminPanelUserApplicationSettingsCoreService.update({
        where: { id: data.id },
        data: { userId, table, columns: JSON.stringify(columns) },
      });
    }

    if (data) {
      return JSON.parse(data.columns);
    }
  }

  async getColumnsByAdminUserId(params: {
    userId: number;
    table: SettingTableEnum;
  }) {
    const { userId, table } = params;

    const columnsToReturn = DEFAULT_COLUMN_SETTINGS[table];

    const data =
      await this.adminPanelUserApplicationSettingsCoreService.findFirst({
        where: { userId, table },
      });

    if (!data) {
      await this.adminPanelUserApplicationSettingsCoreService.create({
        data: { userId, table, columns: JSON.stringify(columnsToReturn) },
      });
    } else {
      const userColumn = JSON.parse(data.columns);

      let isColumnChanged = false;
      columnsToReturn.forEach((val, i) => {
        const foundItem = userColumn.find(
          (item) => item.dataIndex === columnsToReturn[i].dataIndex,
        );

        if (foundItem) {
          columnsToReturn[i].visible = foundItem.visible;
        } else {
          isColumnChanged = true;
        }
      });

      if (isColumnChanged) {
        await this.adminPanelUserApplicationSettingsCoreService.update({
          where: { id: data.id },
          data: { userId, table, columns: JSON.stringify(columnsToReturn) },
        });
      }
    }

    return columnsToReturn;
  }

  async getColumns(params: {
    sessionData: AdminSessionType;
    table: SettingTableEnum;
  }) {
    const {
      sessionData: {
        user: { id: userId },
      },
      table,
    } = params;

    return this.getColumnsByAdminUserId({ userId, table });
  }
}
