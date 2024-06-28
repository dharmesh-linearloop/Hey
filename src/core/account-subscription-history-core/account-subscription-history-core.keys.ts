import { STATUS_ENUM } from 'src/keys';

export const AccountSubscriptionHistoryMessages = {
  NOT_FOUND: 'Account Subscription History not found.',
  SESSION_NOT_FOUND: 'Account Subscription History Session not found.',
  ALREADY_DISABLED: 'Account Subscription History is already disabled.',
  DISABLED: 'Account Subscription History is disabled.',
  ALREADY_ENABLED: 'Account Subscription History is already enabled.',
  ENABLED: 'Account Subscription History is enabled.',
  ALREADY_DELETED: 'Account Subscription History is already deleted.',
  DELETED: 'Account Subscription History is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
