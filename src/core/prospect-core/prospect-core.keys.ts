import { STATUS_ENUM } from 'src/keys';

export const ProspectMessages = {
  NOT_FOUND: 'Prospect not found.',
  SESSION_NOT_FOUND: 'Prospect Session not found.',
  ALREADY_DISABLED: 'Prospect is already disabled.',
  DISABLED: 'Prospect is disabled.',
  ALREADY_ENABLED: 'Prospect is already enabled.',
  ENABLED: 'Prospect is enabled.',
  ALREADY_DELETED: 'Prospect is already deleted.',
  DELETED: 'Prospect is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
