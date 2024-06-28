import { STATUS_ENUM } from 'src/keys';

export const UserInvitationMessages = {
  NOT_FOUND: 'User Invitation not found.',
  SESSION_NOT_FOUND: 'User Invitation Session not found.',
  ALREADY_DISABLED: 'User Invitation is already disabled.',
  DISABLED: 'User Invitation is disabled.',
  ALREADY_ENABLED: 'User Invitation is already enabled.',
  ENABLED: 'User nvitation is enabled.',
  ALREADY_DELETED: 'User Invitation is already deleted.',
  DELETED: 'User Invitation is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
