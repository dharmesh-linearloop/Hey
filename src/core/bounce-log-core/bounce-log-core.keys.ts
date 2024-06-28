import { STATUS_ENUM } from 'src/keys';

export const BounceLogMessages = {
  NOT_FOUND: 'BounceLog not found.',
  SESSION_NOT_FOUND: 'BounceLog Session not found.',
  ALREADY_DISABLED: 'BounceLog is already disabled.',
  DISABLED: 'BounceLog is disabled.',
  ALREADY_ENABLED: 'BounceLog is already enabled.',
  ENABLED: 'BounceLog is enabled.',
  ALREADY_DELETED: 'BounceLog is already deleted.',
  DELETED: 'BounceLog is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
