import { STATUS_ENUM } from 'src/keys';

export const AdminPanelAccountTagsMessages = {
  NOT_FOUND: 'Admin Panel Account Tags not found.',
  SESSION_NOT_FOUND: 'Admin Panel Account Tags Session not found.',
  ALREADY_DISABLED: 'Admin Panel Account Tags is already disabled.',
  DISABLED: 'Admin Panel Account Tags is disabled.',
  ALREADY_ENABLED: 'Admin Panel Account Tags is already enabled.',
  ENABLED: 'Admin Panel Account Tags is enabled.',
  ALREADY_DELETED: 'Admin Panel Account Tags is already deleted.',
  DELETED: 'Admin Panel Account Tags is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
