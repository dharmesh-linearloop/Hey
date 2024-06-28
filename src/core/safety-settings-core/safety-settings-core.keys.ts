import { STATUS_ENUM } from 'src/keys';

export const SafetySettingsMessages = {
  NOT_FOUND: 'Safety Settings not found.',
  SESSION_NOT_FOUND: 'Safety Settings Session not found.',
  ALREADY_DISABLED: 'Safety Settings is already disabled.',
  DISABLED: 'Safety Settings is disabled.',
  ALREADY_ENABLED: 'Safety Settings is already enabled.',
  ENABLED: 'Safety Settings is enabled.',
  ALREADY_DELETED: 'Safety Settings is already deleted.',
  DELETED: 'Safety Settings is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
