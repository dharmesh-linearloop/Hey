import { STATUS_ENUM } from 'src/keys';

export const AgencyUserMessages = {
  NOT_FOUND: 'Agency User not found.',
  SESSION_NOT_FOUND: 'Agency User Session not found.',
  ALREADY_DISABLED: 'Agency User is already disabled.',
  DISABLED: 'Agency User is disabled.',
  ALREADY_ENABLED: 'Agency User is already enabled.',
  ENABLED: 'Agency User is enabled.',
  ALREADY_DELETED: 'Agency User is already deleted.',
  DELETED: 'Agency User is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
