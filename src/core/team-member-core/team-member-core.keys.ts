import { STATUS_ENUM } from 'src/keys';

export const TeamMemberMessages = {
  NOT_FOUND: 'Team Member not found.',
  SESSION_NOT_FOUND: 'Team Member Session not found.',
  ALREADY_DISABLED: 'Team Member is already disabled.',
  DISABLED: 'Team Member is disabled.',
  ALREADY_ENABLED: 'Team Member is already enabled.',
  ENABLED: 'Team Member is enabled.',
  ALREADY_DELETED: 'Team Member is already deleted.',
  DELETED: 'Team Member is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
