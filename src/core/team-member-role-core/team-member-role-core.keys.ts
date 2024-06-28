import { STATUS_ENUM } from 'src/keys';

export const TeamMemberRoleMessages = {
  NOT_FOUND: 'Team Member Role not found.',
  SESSION_NOT_FOUND: 'Team Member Role Session not found.',
  ALREADY_DISABLED: 'Team Member Role is already disabled.',
  DISABLED: 'Team Member Role is disabled.',
  ALREADY_ENABLED: 'Team Member Role is already enabled.',
  ENABLED: 'Team Member Role is enabled.',
  ALREADY_DELETED: 'Team Member Role is already deleted.',
  DELETED: 'Team Member Role is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
