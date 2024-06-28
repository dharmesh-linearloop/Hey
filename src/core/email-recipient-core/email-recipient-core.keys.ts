import { STATUS_ENUM } from 'src/keys';

export const EmailRecipientMessages = {
  NOT_FOUND: 'Email Recipient not found.',
  SESSION_NOT_FOUND: 'Email Recipient Session not found.',
  ALREADY_DISABLED: 'Email Recipient is already disabled.',
  DISABLED: 'Email Recipient is disabled.',
  ALREADY_ENABLED: 'Email Recipient is already enabled.',
  ENABLED: 'Email Recipient is enabled.',
  ALREADY_DELETED: 'Email Recipient is already deleted.',
  DELETED: 'Email Recipient is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
