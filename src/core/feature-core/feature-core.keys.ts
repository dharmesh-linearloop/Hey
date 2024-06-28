import { STATUS_ENUM } from 'src/keys';

export const FeatureMessages = {
  NOT_FOUND: 'Feature not found.',
  SESSION_NOT_FOUND: 'Feature Session not found.',
  ALREADY_DISABLED: 'Feature is already disabled.',
  DISABLED: 'Feature is disabled.',
  ALREADY_ENABLED: 'Feature is already enabled.',
  ENABLED: 'Feature is enabled.',
  ALREADY_DELETED: 'Feature is already deleted.',
  DELETED: 'Feature is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
