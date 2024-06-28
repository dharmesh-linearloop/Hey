import { STATUS_ENUM } from 'src/keys';

export const EmailAccountSettingMessages = {
  NOT_FOUND: 'Email Account Setting not found.',
  SESSION_NOT_FOUND: 'Email Account Setting Session not found.',
  ALREADY_DISABLED: 'Email Account Setting is already disabled.',
  DISABLED: 'Email Account Setting is disabled.',
  ALREADY_ENABLED: 'Email Account Setting is already enabled.',
  ENABLED: 'Email Account Setting is enabled.',
  ALREADY_DELETED: 'Email Account Setting is already deleted.',
  DELETED: 'Email Account Setting is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
