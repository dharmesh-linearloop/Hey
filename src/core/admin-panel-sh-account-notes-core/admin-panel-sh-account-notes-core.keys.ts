import { STATUS_ENUM } from 'src/keys';

export const AdminPanelShAccountNotesMessages = {
  NOT_FOUND: 'Admin Panel ShAccount Notes not found.',
  SESSION_NOT_FOUND: 'Admin Panel ShAccount Notes Session not found.',
  ALREADY_DISABLED: 'Admin Panel ShAccount Notes is already disabled.',
  DISABLED: 'Admin Panel ShAccount Notes is disabled.',
  ALREADY_ENABLED: 'Admin Panel ShAccount Notes is already enabled.',
  ENABLED: 'Admin Panel ShAccount Notes is enabled.',
  ALREADY_DELETED: 'Admin Panel ShAccount Notes is already deleted.',
  DELETED: 'Admin Panel ShAccount Notes is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
