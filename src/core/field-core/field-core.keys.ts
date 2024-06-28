import { STATUS_ENUM } from 'src/keys';

export const FieldMessages = {
  NOT_FOUND: 'Field not found.',
  SESSION_NOT_FOUND: 'Field Session not found.',
  ALREADY_DISABLED: 'Field is already disabled.',
  DISABLED: 'Field is disabled.',
  ALREADY_ENABLED: 'Field is already enabled.',
  ENABLED: 'Field is enabled.',
  ALREADY_DELETED: 'Field is already deleted.',
  DELETED: 'Field is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
