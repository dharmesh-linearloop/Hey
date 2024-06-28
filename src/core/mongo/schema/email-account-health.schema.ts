import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type Spf = {
  validSpf: boolean;
  spfResults: string;
};

export type Dmarc = {
  validDmarc: boolean;
  dmarcResults: string;
};

export type CustomTrackingDomain = {
  isCustomTrackingDomainCreated: boolean;
  isCustomTrackingDomainLinkedToEmailAccount: boolean;
};

export type EmailAccountAge = {
  score: number;
  message?: EmailAccountAgeMessage;
};

export type EmailAccountAgeMessage = {
  code: TokenError;
};

export enum TokenError {
  GrantRevoked = 'Grant is Revoked',
}

export type EmailAccountHealthDocument = EmailAccountHealth & Document;

@Schema({ autoCreate: true })
export class EmailAccountHealth {
  @Prop({ required: true })
  id: number;

  @Prop()
  emailAccountHealthScore: number;

  @Prop({ type: Object, required: true })
  spf: Spf;

  @Prop({ type: Object, required: true })
  dmarc: Dmarc;

  @Prop({
    type: Object,
  })
  customTrackingDomain: CustomTrackingDomain;

  @Prop({ type: Object })
  emailAccountAge: EmailAccountAge;

  @Prop({ type: Object })
  metadata: unknown;

  @Prop({ required: true })
  timeStamp: Date;
}

export const EmailAccountHealthSchema =
  SchemaFactory.createForClass(EmailAccountHealth);
