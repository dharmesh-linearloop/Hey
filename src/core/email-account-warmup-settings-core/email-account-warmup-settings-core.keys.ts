import { STATUS_ENUM } from 'src/keys';

export const EmailAccountWarmupSettingsMessages = {
  NOT_FOUND: 'Email Account Warmup Setting not found.',
  SESSION_NOT_FOUND: 'Email Account Warmup Setting Session not found.',
  ALREADY_DISABLED: 'Email Account Warmup Setting is already disabled.',
  DISABLED: 'Email Account Warmup Setting is disabled.',
  ALREADY_ENABLED: 'Email Account Warmup Setting is already enabled.',
  ENABLED: 'Email Account Warmup Setting is enabled.',
  ALREADY_DELETED: 'Email Account Warmup Setting is already deleted.',
  DELETED: 'Email Account Warmup Setting is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
