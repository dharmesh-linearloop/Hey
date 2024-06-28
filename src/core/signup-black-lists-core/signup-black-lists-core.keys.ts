import { STATUS_ENUM } from 'src/keys';

export const SignupBlackListsMessages = {
  NOT_FOUND: 'Account Subscription not found.',
  SESSION_NOT_FOUND: 'Account Subscription Session not found.',
  ALREADY_DISABLED: 'Account Subscription is already disabled.',
  DISABLED: 'Account Subscription is disabled.',
  ALREADY_ENABLED: 'Account Subscription is already enabled.',
  ENABLED: 'Account Subscription is enabled.',
  ALREADY_DELETED: 'Account Subscription is already deleted.',
  DELETED: 'Account Subscription is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
