import { STATUS_ENUM } from 'src/keys';

export const EmailMessages = {
  NOT_FOUND: 'Email not found.',
  SESSION_NOT_FOUND: 'Email Session not found.',
  ALREADY_DISABLED: 'Email is already disabled.',
  DISABLED: 'Email is disabled.',
  ALREADY_ENABLED: 'Email is already enabled.',
  ENABLED: 'Email is enabled.',
  ALREADY_DELETED: 'Email is already deleted.',
  DELETED: 'Email is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
