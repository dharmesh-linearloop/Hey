import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';
import { MasterLogEnum } from './master-log.schema';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export type AdminPanelLogDocument = AdminPanelLog & Document;

@Schema({ timestamps: true, autoCreate: true })
export class AdminPanelLog {
  @Prop()
  key: MasterLogEnum;

  @Prop()
  masterLogId: S.Types.ObjectId;

  @Prop()
  accountId: number;

  @Prop()
  adminUserId?: number;

  @Prop()
  ipAddress: string;

  @Prop()
  log: string;

  @Prop()
  note: string;

  @Prop()
  timestamp: Date;
}

export const AdminPanelLogSchema = SchemaFactory.createForClass(AdminPanelLog);

export class AccountLogsCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: AdminPanelLogDocument[];
}
