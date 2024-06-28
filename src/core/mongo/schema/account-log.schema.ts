import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';
import { MasterLogEnum } from './master-log.schema';

export type AccountLogDocument = AccountLog & Document;

@Schema({ timestamps: true, autoCreate: true })
export class AccountLog {
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

export const AccountLogSchema = SchemaFactory.createForClass(AccountLog);
