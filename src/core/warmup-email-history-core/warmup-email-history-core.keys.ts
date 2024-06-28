import { STATUS_ENUM } from 'src/keys';

export const WarmupTemplatesMessages = {
  NOT_FOUND: 'Warmup Templates not found.',
  SESSION_NOT_FOUND: 'Warmup Templates Session not found.',
  ALREADY_DISABLED: 'Warmup Templates is already disabled.',
  DISABLED: 'Warmup Templates is disabled.',
  ALREADY_ENABLED: 'Warmup Templates is already enabled.',
  ENABLED: 'Warmup Templates is enabled.',
  ALREADY_DELETED: 'Warmup Templates is already deleted.',
  DELETED: 'Warmup Templates is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
