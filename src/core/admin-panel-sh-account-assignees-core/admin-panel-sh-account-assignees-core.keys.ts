import { STATUS_ENUM } from 'src/keys';

export const AdminPanelShAccountAssigneesMessages = {
  NOT_FOUND: 'Admin Panel ShAccount Assignees not found.',
  SESSION_NOT_FOUND: 'Admin Panel ShAccount Assignees Session not found.',
  ALREADY_DISABLED: 'Admin Panel ShAccount Assignees is already disabled.',
  DISABLED: 'Admin Panel ShAccount Assignees is disabled.',
  ALREADY_ENABLED: 'Admin Panel ShAccount Assignees is already enabled.',
  ENABLED: 'Admin Panel ShAccount Assignees is enabled.',
  ALREADY_DELETED: 'Admin Panel ShAccount Assignees is already deleted.',
  DELETED: 'Admin Panel ShAccount Assignees is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
