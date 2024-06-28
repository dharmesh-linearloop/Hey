import { STATUS_ENUM } from 'src/keys';

export const AdminPanelUserLoginSecretsMessages = {
  NOT_FOUND: 'Admin Panel User Login Secrets not found.',
  SESSION_NOT_FOUND: 'Admin Panel User Login Secrets Session not found.',
  ALREADY_DISABLED: 'Admin Panel User Login Secrets is already disabled.',
  DISABLED: 'Admin Panel User Login Secrets is disabled.',
  ALREADY_ENABLED: 'Admin Panel User Login Secrets is already enabled.',
  ENABLED: 'Admin Panel User Login Secrets is enabled.',
  ALREADY_DELETED: 'Admin Panel User Login Secrets is already deleted.',
  DELETED: 'Admin Panel User Login Secrets is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
