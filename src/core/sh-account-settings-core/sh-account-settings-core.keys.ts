import { STATUS_ENUM } from 'src/keys';

export const ShAccountSettingsMessages = {
  NOT_FOUND: 'Sh Account Settings not found.',
  SESSION_NOT_FOUND: 'Sh Account Settings Session not found.',
  ALREADY_DISABLED: 'Sh Account Settings is already disabled.',
  DISABLED: 'Sh Account Settings is disabled.',
  ALREADY_ENABLED: 'Sh Account Settings is already enabled.',
  ENABLED: 'Sh Account Settings is enabled.',
  ALREADY_DELETED: 'Sh Account Settings is already deleted.',
  DELETED: 'Sh Account Settings is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
