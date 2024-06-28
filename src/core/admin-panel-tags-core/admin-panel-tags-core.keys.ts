import { STATUS_ENUM } from 'src/keys';

export const AdminPanelTagsMessages = {
  NOT_FOUND: 'Admin Panel Tags not found.',
  SESSION_NOT_FOUND: 'Admin Panel Tags Session not found.',
  ALREADY_DISABLED: 'Admin Panel Tags is already disabled.',
  DISABLED: 'Admin Panel Tags is disabled.',
  ALREADY_ENABLED: 'Admin Panel Tags is already enabled.',
  ENABLED: 'Admin Panel Tags is enabled.',
  ALREADY_DELETED: 'Admin Panel Tags is already deleted.',
  DELETED: 'Admin Panel Tags is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
