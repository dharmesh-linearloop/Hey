import { STATUS_ENUM } from 'src/keys';

export const ProfileProgressStepMessages = {
  NOT_FOUND: 'Profile Progress Step not found.',
  SESSION_NOT_FOUND: 'Profile Progress Step Session not found.',
  ALREADY_DISABLED: 'Profile Progress Step is already disabled.',
  DISABLED: 'Profile Progress Step is disabled.',
  ALREADY_ENABLED: 'Profile Progress Step is already enabled.',
  ENABLED: 'Profile Progress Step is enabled.',
  ALREADY_DELETED: 'Profile Progress Step is already deleted.',
  DELETED: 'Profile Progress Step is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
