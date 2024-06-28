import { STATUS_ENUM } from 'src/keys';

export const AgencyMessages = {
  NOT_FOUND: 'Agency not found.',
  SESSION_NOT_FOUND: 'Agency Session not found.',
  ALREADY_DISABLED: 'Agency is already disabled.',
  DISABLED: 'Agency is disabled.',
  ALREADY_ENABLED: 'Agency is already enabled.',
  ENABLED: 'Agency is enabled.',
  ALREADY_DELETED: 'Agency is already deleted.',
  DELETED: 'Agency is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
