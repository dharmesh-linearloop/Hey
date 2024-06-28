import { STATUS_ENUM } from 'src/keys';

export const UserProfileProgressMessages = {
  NOT_FOUND: 'User Profile Progress not found.',
  SESSION_NOT_FOUND: 'User Profile Progress Session not found.',
  ALREADY_DISABLED: 'User Profile Progress is already disabled.',
  DISABLED: 'User Profile Progress is disabled.',
  ALREADY_ENABLED: 'User Profile Progress is already enabled.',
  ENABLED: 'User Profile Progress is enabled.',
  ALREADY_DELETED: 'User Profile Progress is already deleted.',
  DELETED: 'User Profile Progress is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
