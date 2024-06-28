import { STATUS_ENUM } from 'src/keys';

export const TeamMessages = {
  NOT_FOUND: 'Team not found.',
  SESSION_NOT_FOUND: 'Team Session not found.',
  ALREADY_DISABLED: 'Team is already disabled.',
  DISABLED: 'Team is disabled.',
  ALREADY_ENABLED: 'Team is already enabled.',
  ENABLED: 'Team is enabled.',
  ALREADY_DELETED: 'Team is already deleted.',
  DELETED: 'Team is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
