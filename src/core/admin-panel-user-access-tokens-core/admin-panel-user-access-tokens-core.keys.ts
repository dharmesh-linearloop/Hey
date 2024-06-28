import { STATUS_ENUM } from 'src/keys';

export const AdminPanelUserAccessTokensMessages = {
  NOT_FOUND: 'Admin Panel User Access Tokens not found.',
  SESSION_NOT_FOUND: 'Admin Panel User Access Tokens Session not found.',
  ALREADY_DISABLED: 'Admin Panel User Access Tokens is already disabled.',
  DISABLED: 'Admin Panel User Access Tokens is disabled.',
  ALREADY_ENABLED: 'Admin Panel User Access Tokens is already enabled.',
  ENABLED: 'Admin Panel User Access Tokens is enabled.',
  ALREADY_DELETED: 'Admin Panel User Access Tokens is already deleted.',
  DELETED: 'Admin Panel User Access Tokens is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
