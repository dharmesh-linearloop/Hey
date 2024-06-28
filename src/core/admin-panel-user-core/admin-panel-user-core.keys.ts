import { STATUS_ENUM } from 'src/keys';

export const AdminPanelUserMessages = {
  NOT_FOUND: 'Admin Panel User not found.',
  SESSION_NOT_FOUND: 'Admin Panel User Session not found.',
  ALREADY_DISABLED: 'Admin Panel User is already disabled.',
  DISABLED: 'Admin Panel User is disabled.',
  ALREADY_ENABLED: 'Admin Panel User is already enabled.',
  ENABLED: 'Admin Panel User is enabled.',
  ALREADY_DELETED: 'Admin Panel User is already deleted.',
  DELETED: 'Admin Panel User is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
