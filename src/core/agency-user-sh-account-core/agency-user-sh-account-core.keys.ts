import { STATUS_ENUM } from 'src/keys';

export const AgencyUserShAccountMessages = {
  NOT_FOUND: 'Agency User Sh Account not found.',
  SESSION_NOT_FOUND: 'Agency User Sh Account Session not found.',
  ALREADY_DISABLED: 'Agency User Sh Account is already disabled.',
  DISABLED: 'Agency User Sh Account is disabled.',
  ALREADY_ENABLED: 'Agency User Sh Account is already enabled.',
  ENABLED: 'Agency User Sh Account is enabled.',
  ALREADY_DELETED: 'Agency User Sh Account is already deleted.',
  DELETED: 'Agency User Sh Account is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
