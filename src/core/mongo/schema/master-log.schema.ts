import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';

export enum MasterLogEnum {
  EmailSent = 'email-sent',
  EmailFailed = 'email-failed',
  EmailOpened = 'email-opened',
  EmailBounced = 'email-bounced',
  LinkClicked = 'link-clicked',
  UnsubscribedAuto = 'unsubscribed-auto',
  UnsubscribedManual = 'unsubscribed-manual',
  ReSubscribed = 'resubscribed',
  ReplyReceivedAuto = 'reply-received-auto',
  ReplyReceivedManual = 'reply-received-manual',
  FinishedManual = 'finished-manual',
  EmailBouncedManual = 'email-bounced-manual',
  Blacklisted = 'blacklisted',
  RemovedFromBlacklist = 'removed-from-blacklist',
  SequencePaused = 'sequence-paused',
  EmailAccountDisconnected = 'email-account-disconnected',
  MailboxEmailSent = 'mailbox-email-sent',
  MailboxEmailOpened = 'mailbox-email-opened',
  MailboxEmailLinkClicked = 'mailbox-email-link-clicked',
  SequenceContactResumed = 'sequence-contact-resumed',
  SequenceContactPaused = 'sequence-contact-paused',
  UniboxEmailOpened = 'unibox-email-opened',
  UniboxEmailLinkClicked = 'unibox-email-link-clicked',
  UserAccountAccessed = 'user-account-accessed',
  AccountSubscriptionUpdated = 'account-subscription-updated',
  AccountSubscriptionPlanUpdated = 'account-subscription-plan-updated',
  AccountSubscriptionCustomerIdUpdated = 'account-subscription-cutromerId-updated',
  AccountSubscriptionPaymentMethodUpdated = 'account-subscription-payment-method-updated',
  AccountSubscriptionSubscriptionIdUpdated = 'account-subscription-subscriptionId-updated',
  AccountSubscriptionRenewalTypeUpdated = 'account-subscription-renewal-type-updated',
  AccountSubscriptionStartDateUpdated = 'account-subscription-start-date-updated',
  AccountSubscriptionEndDateUpdated = 'account-subscription-end-date-updated',
  AccountSubscriptionSlotUpdated = 'account-subscription-slot-updated',
  UserInformationUpdated = 'user-information-updated',
  UserInformationNameUpdated = 'user-information-name-updated',
  UserInformationEmailUpdated = 'user-information-email-updated',
  UserAccountDeleted = 'user-account-deleted',
  UserAccountSuspended = 'user-account-suspended',
  ShAccountDeleted = 'sh-account-deleted',
  ShAccountSuspended = 'sh-account-suspended',
  EvCreditsUpdated = 'ev-credits-updated',
  NoteAdded = 'note-added',
  SalesOwnerUpdated = 'sales-owner-updated',
  SuccessOwnerUpdated = 'success-owner-updated',
  EmailAccountWatchStarted = 'email-account-watch-started',
  EmailAccountWatchStopped = 'email-account-watch-stopped',
  AccountTagAdded = 'account-tag-added',
}

export enum SentenceTemplates {
  'user-account-accessed' = `{{log.executor.firstName}} {{log.executor.lastName}} logged into {{log.user.email}} account`,
  'account-subscription-updated' = `{{log.executor.firstName}} {{log.executor.lastName}} updated plan of {{log.accountId}}`,
  'account-subscription-plan-updated' = `{{log.executor.firstName}} {{log.executor.lastName}} updated plan of {{log.accountId}}`,
  'account-subscription-payment-method-updated' = `{{log.executor.firstName}} {{log.executor.lastName}} updated payment method of {{log.accountId}}`,
  'account-subscription-cutromerId-updated' = `{{log.executor.firstName}} {{log.executor.lastName}} updated customer id of {{log.accountId}}`,
  'account-subscription-subscriptionId-updated' = `{{log.executor.firstName}} {{log.executor.lastName}} updated subscription id of {{log.accountId}}`,
  'account-subscription-renewal-type-updated' = `{{log.executor.firstName}} {{log.executor.lastName}} updated renewal type of {{log.accountId}}`,
  'account-subscription-start-date-updated' = `{{log.executor.firstName}} {{log.executor.lastName}} updated the plan start date of {{log.accountId}}`,
  'account-subscription-end-date-updated' = `{{log.executor.firstName}} {{log.executor.lastName}} updated the plan end date of {{log.accountId}}`,
  'account-subscription-slot-updated' = `{{log.executor.firstName}} {{log.executor.lastName}} updated the slot count of {{log.accountId}}`,
  'user-information-updated' = `{{log.executor.firstName}} {{log.executor.lastName}} updated the name of {{log.user.id}}`,
  'user-information-name-updated' = `{{log.executor.firstName}} {{log.executor.lastName}} updated the name of {{log.user.id}}`,
  'user-information-email-updated' = `{{log.executor.firstName}} {{log.executor.lastName}} updated the email account of {{log.user.id}}`,
  'user-account-deleted' = `{{log.executor.firstName}} {{log.executor.lastName}} deleted the user {{log.user.email}}`,
  'user-account-suspended' = `{{log.executor.firstName}} {{log.executor.lastName}} suspended the user {{log.user.email}}`,
  'sh-account-deleted' = `{{log.executor.firstName}} {{log.executor.lastName}} deleted the account {{log.accountId}}`,
  'sh-account-suspended' = `{{log.executor.firstName}} {{log.executor.lastName}} suspended the account {{log.accountId}}`,
  'ev-credits-updated' = `{{log.executor.firstName}} {{log.executor.lastName}} added {{log.credits}} verification credits`,
  'note-added' = `{{log.executor.firstName}} {{log.executor.lastName}} added note`,
  'sales-owner-updated' = `{{log.executor.firstName}} {{log.executor.lastName}} updated {{log.salesOwner.firstName}} {{log.salesOwner.lastName}} as Sales owner for {{log.accountId}}`,
  'success-owner-updated' = `{{log.executor.firstName}} {{log.executor.lastName}} updated {{log.successOwner.firstName}} {{log.successOwner.lastName}} as Success owner for {{log.accountId}}`,
  'email-account-watch-started' = `{{log.executor.firstName}} {{log.executor.lastName}} created watch for {{log.emailAccount.fromEmail}}`,
  'email-account-watch-stopped' = `{{log.executor.firstName}} {{log.executor.lastName}} stopped watch for {{log.emailAccount.fromEmail}}`,
  'account-tag-added' = `{{log.executor.firstName}} {{log.executor.lastName}} added tag(s) for {{log.accountId}}`,
}

export const MasterLogArr = {
  'user-account-accessed': 'UserAccountAccessed',
  'account-subscription-updated': 'AccountSubscriptionUpdated',
  'account-subscription-plan-updated': 'AccountSubscriptionPlanUpdated',
  'account-subscription-start-date-updated':
    'AccountSubscriptionStartDateUpdated',
  'account-subscription-end-date-updated': 'AccountSubscriptionEndDateUpdated',
  'account-subscription-slot-updated': 'AccountSubscriptionSlotUpdated',
  'account-subscription-payment-method-updated':
    'AccountSubscriptionPaymentMethodUpdated',
  'account-subscription-subscriptionId-updated':
    'AccountSubscriptionSubscriptionIdUpdated',
  'account-subscription-cutromerId-updated':
    'AccountSubscriptionCustomerIdUpdated',
  'account-subscription-renewal-type-updated':
    'AccountSubscriptionRenewalTypeUpdated',
  'user-information-updated': 'UserInformationUpdated',
  'user-information-name-updated': 'UserInformationNameUpdated',
  'user-information-email-updated': 'UserInformationEmailUpdated',
  'user-account-deleted': 'UserAccountDeleted',
  'user-account-suspended': 'UserAccountSuspended',
  'sh-account-deleted': 'ShAccountDeleted',
  'sh-account-suspended': 'ShAccountSuspended',
  'ev-credits-updated': 'EvCreditsUpdated',
  'note-added': 'NoteAdded',
  'sales-owner-updated': 'SalesOwnerUpdated',
  'success-owner-updated': 'SuccessOwnerUpdated',
  'email-account-watch-started': 'EmailAccountWatchStarted',
  'email-account-watch-stopped': 'EmailAccountWatchStopped',
  'account-tag-added': 'AccountTagAdded',
};

export const MasterLogEnumArr = {
  EmailSent: 'email-sent',
  EmailFailed: 'email-failed',
  EmailOpened: 'email-opened',
  EmailBounced: 'email-bounced',
  LinkClicked: 'link-clicked',
  UnsubscribedAuto: 'unsubscribed-auto',
  UnsubscribedManual: 'unsubscribed-manual',
  ReSubscribed: 'resubscribed',
  ReplyReceivedAuto: 'reply-received-auto',
  ReplyReceivedManual: 'reply-received-manual',
  FinishedManual: 'finished-manual',
  EmailBouncedManual: 'email-bounced-manual',
  Blacklisted: 'blacklisted',
  RemovedFromBlacklist: 'removed-from-blacklist',
  SequencePaused: 'sequence-paused',
  EmailAccountDisconnected: 'email-account-disconnected',
  MailboxEmailSent: 'mailbox-email-sent',
  MailboxEmailOpened: 'mailbox-email-opened',
  MailboxEmailLinkClicked: 'mailbox-email-link-clicked',
  SequenceContactResumed: 'sequence-contact-resumed',
  SequenceContactPaused: 'sequence-contact-paused',
  UniboxEmailOpened: 'unibox-email-opened',
  UniboxEmailLinkClicked: 'unibox-email-link-clicked',
  UserAccountAccessed: 'user-account-accessed',
  AccountSubscriptionUpdated: 'account-subscription-updated',
  AccountSubscriptionPlanUpdated: 'account-subscription-plan-updated',
  AccountSubscriptionStartDateUpdated:
    'account-subscription-start-date-updated',
  AccountSubscriptionEndDateUpdated: 'account-subscription-end-date-updated',
  AccountSubscriptionSlotUpdated: 'account-subscription-slot-updated',
  AccountSubscriptionPaymentMethodUpdated:
    'account-subscription-payment-method-updated',
  AccountSubscriptionSubscriptionIdUpdated:
    'account-subscription-subscriptionId-updated',
  AccountSubscriptionCustomerIdUpdated:
    'account-subscription-customerId-updated',
  AccountSubscriptionRenewalTypeUpdated:
    'account-subscription-renewal-type-updated',
  UserInformationUpdated: 'user-information-updated',
  UserInformationNameUpdated: 'user-information-name-updated',
  UserInformationEmailUpdated: 'user-information-email-updated',
  UserAccountDeleted: 'user-account-deleted',
  UserAccountSuspended: 'user-account-suspended',
  ShAccountDeleted: 'sh-account-deleted',
  ShAccountSuspended: 'sh-account-suspended',
  EvCreditsUpdated: 'ev-credits-updated',
  NoteAdded: 'note-added',
  SalesOwnerUpdated: 'sales-owner-updated',
  SuccessOwnerUpdated: 'success-owner-updated',
  EmailAccountWatchStarted: 'email-account-watch-started',
  EmailAccountWatchStopped: 'email-account-watch-stopped',
  AccountTagAdded: 'account-tag-added',
};

export type MasterLogDocument = MasterLog & Document;

@Schema({ timestamps: true, autoCreate: true })
export class MasterLog {
  @Prop()
  key: MasterLogEnum;

  @Prop()
  timestamp: Date;

  @Prop()
  accountId: number;

  @Prop()
  ipAddress: string;

  @Prop({ type: S.Types.Mixed })
  log: {
    [x: string]: any;
  };

  @Prop()
  userId: number;
}

export const MasterLogSchema = SchemaFactory.createForClass(MasterLog);
