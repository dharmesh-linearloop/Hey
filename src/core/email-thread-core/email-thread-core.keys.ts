import { STATUS_ENUM } from 'src/keys';

export const EmailThreadMessages = {
  NOT_FOUND: 'Email Thread not found.',
  SESSION_NOT_FOUND: 'Email Thread Session not found.',
  ALREADY_DISABLED: 'Email Thread is already disabled.',
  DISABLED: 'Email Thread is disabled.',
  ALREADY_ENABLED: 'Email Thread is already enabled.',
  ENABLED: 'Email Thread is enabled.',
  ALREADY_DELETED: 'Email Thread is already deleted.',
  DELETED: 'Email Thread is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
