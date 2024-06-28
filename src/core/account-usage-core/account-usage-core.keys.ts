import { STATUS_ENUM } from 'src/keys';

export const AccountUsageMessages = {
  NOT_FOUND: 'Account Usage not found.',
  SESSION_NOT_FOUND: 'Account Usage Session not found.',
  ALREADY_DISABLED: 'Account Usage is already disabled.',
  DISABLED: 'Account Usage is disabled.',
  ALREADY_ENABLED: 'Account Usage is already enabled.',
  ENABLED: 'Account Usage is enabled.',
  ALREADY_DELETED: 'Account Usage is already deleted.',
  DELETED: 'Account Usage is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
