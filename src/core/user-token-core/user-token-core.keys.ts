import { STATUS_ENUM } from 'src/keys';

export const UserTokenMessages = {
  NOT_FOUND: 'User Token not found.',
  TOKEN_NOT_FOUND: 'User Token not found.',
  ALREADY_DISABLED: 'User Token is already disabled.',
  DISABLED: 'User Token is disabled.',
  ALREADY_ENABLED: 'User Token is already enabled.',
  ENABLED: 'User Token is enabled.',
  ALREADY_DELETED: 'User Token is already deleted.',
  DELETED: 'User Token is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
