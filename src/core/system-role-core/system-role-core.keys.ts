import { STATUS_ENUM } from 'src/keys';

export const SystemRoleMessages = {
  NOT_FOUND: 'System Role not found.',
  SESSION_NOT_FOUND: 'System Role Session not found.',
  ALREADY_DISABLED: 'System Role is already disabled.',
  DISABLED: 'System Role is disabled.',
  ALREADY_ENABLED: 'System Role is already enabled.',
  ENABLED: 'System Role is enabled.',
  ALREADY_DELETED: 'System Role is already deleted.',
  DELETED: 'System Role is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
