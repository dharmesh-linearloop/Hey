import { STATUS_ENUM } from 'src/keys';

export const UserSettingMessages = {
  NOT_FOUND: 'User Setting not found.',
  SESSION_NOT_FOUND: 'User Setting Session not found.',
  ALREADY_DISABLED: 'User Setting is already disabled.',
  DISABLED: 'User Setting is disabled.',
  ALREADY_ENABLED: 'User Setting is already enabled.',
  ENABLED: 'User Setting is enabled.',
  ALREADY_DELETED: 'User Setting is already deleted.',
  DELETED: 'User Setting is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
