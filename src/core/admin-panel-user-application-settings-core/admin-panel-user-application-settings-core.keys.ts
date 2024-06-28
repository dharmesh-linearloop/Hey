import { STATUS_ENUM } from 'src/keys';

export const AdminPanelUserApplicationSettingsMessages = {
  NOT_FOUND: 'Admin Panel User Application Settings not found.',
  SESSION_NOT_FOUND: 'Admin Panel User Application Settings Session not found.',
  ALREADY_DISABLED:
    'Admin Panel User Application Settings is already disabled.',
  DISABLED: 'Admin Panel User Application Settings is disabled.',
  ALREADY_ENABLED: 'Admin Panel User Application Settings is already enabled.',
  ENABLED: 'Admin Panel User Application Settings is enabled.',
  ALREADY_DELETED: 'Admin Panel User Application Settings is already deleted.',
  DELETED: 'Admin Panel User Application Settings is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
