import { STATUS_ENUM } from 'src/keys';

export const UserRoleMessages = {
  NOT_FOUND: 'User Role not found.',
  SESSION_NOT_FOUND: 'User Role Session not found.',
  ALREADY_DISABLED: 'User Role is already disabled.',
  DISABLED: 'User Role is disabled.',
  ALREADY_ENABLED: 'User Role is already enabled.',
  ENABLED: 'User Role is enabled.',
  ALREADY_DELETED: 'User Role is already deleted.',
  DELETED: 'User Role is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
