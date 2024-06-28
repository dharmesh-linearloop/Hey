import { STATUS_ENUM } from 'src/keys';

export const EmailAccountMessages = {
  NOT_FOUND: 'Email Account not found.',
  SESSION_NOT_FOUND: 'Email Account Session not found.',
  ALREADY_DISABLED: 'Email Account is already disabled.',
  DISABLED: 'Email Account is disabled.',
  ALREADY_ENABLED: 'Email Account is already enabled.',
  ENABLED: 'Email Account is enabled.',
  ALREADY_DELETED: 'Email Account is already deleted.',
  DELETED: 'Email Account is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
