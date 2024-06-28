import { STATUS_ENUM } from 'src/keys';

export const RoleMessages = {
  NOT_FOUND: 'Role not found.',
  SESSION_NOT_FOUND: 'Role Session not found.',
  ALREADY_DISABLED: 'Role is already disabled.',
  DISABLED: 'Role is disabled.',
  ALREADY_ENABLED: 'Role is already enabled.',
  ENABLED: 'Role is enabled.',
  ALREADY_DELETED: 'Role is already deleted.',
  DELETED: 'Role is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
