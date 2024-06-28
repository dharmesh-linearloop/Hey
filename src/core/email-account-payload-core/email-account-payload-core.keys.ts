import { STATUS_ENUM } from 'src/keys';

export const EmailAccountsPayloadMessages = {
  NOT_FOUND: 'Email Accounts Payload not found.',
  SESSION_NOT_FOUND: 'Email Accounts Payload Session not found.',
  ALREADY_DISABLED: 'Email Accounts Payload is already disabled.',
  DISABLED: 'Email Accounts Payload is disabled.',
  ALREADY_ENABLED: 'Email Accounts Payload is already enabled.',
  ENABLED: 'Email Accounts Payload is enabled.',
  ALREADY_DELETED: 'Email Accounts Payload is already deleted.',
  DELETED: 'Email Accounts Payload is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
