import { STATUS_ENUM } from 'src/keys';

export const EmailAccountConnectionHistoryMessages = {
  NOT_FOUND: 'Email Account Connection History not found.',
  SESSION_NOT_FOUND: 'Email Account Connection History Session not found.',
  ALREADY_DISABLED: 'Email Account Connection History is already disabled.',
  DISABLED: 'Email Account Connection History is disabled.',
  ALREADY_ENABLED: 'Email Account Connection History is already enabled.',
  ENABLED: 'Email Account Connection History is enabled.',
  ALREADY_DELETED: 'Email Account Connection History is already deleted.',
  DELETED: 'Email Account Connection History is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
