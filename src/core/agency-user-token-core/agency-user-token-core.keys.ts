import { STATUS_ENUM } from 'src/keys';

export const AgencyUserTokenMessages = {
  NOT_FOUND: 'Agency User Token not found.',
  TOKEN_NOT_FOUND: 'Agency User Token not found.',
  ALREADY_DISABLED: 'Agency User Token is already disabled.',
  DISABLED: 'Agency User Token is disabled.',
  ALREADY_ENABLED: 'Agency User Token is already enabled.',
  ENABLED: 'Agency User Token is enabled.',
  ALREADY_DELETED: 'Agency User Token is already deleted.',
  DELETED: 'Agency User Token is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
