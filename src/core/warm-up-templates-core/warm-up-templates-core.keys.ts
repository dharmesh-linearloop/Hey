import { STATUS_ENUM } from 'src/keys';

export const WarmupEmailHistoryMessages = {
  NOT_FOUND: 'Warmup Email History not found.',
  SESSION_NOT_FOUND: 'Warmup Email History Session not found.',
  ALREADY_DISABLED: 'Warmup Email History is already disabled.',
  DISABLED: 'Warmup Email History is disabled.',
  ALREADY_ENABLED: 'Warmup Email History is already enabled.',
  ENABLED: 'Warmup Email History is enabled.',
  ALREADY_DELETED: 'Warmup Email History is already deleted.',
  DELETED: 'Warmup Email History is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
