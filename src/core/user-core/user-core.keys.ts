import { STATUS_ENUM } from 'src/keys';

export const UserMessages = {
  NOT_FOUND: 'User not found.',
  SESSION_NOT_FOUND: 'User Session not found.',
  ALREADY_DISABLED: 'User is already disabled.',
  DISABLED: 'User is disabled.',
  ALREADY_ENABLED: 'User is already enabled.',
  ENABLED: 'User is enabled.',
  ALREADY_DELETED: 'User is already deleted.',
  DELETED: 'User is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
