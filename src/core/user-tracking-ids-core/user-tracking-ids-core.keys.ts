import { STATUS_ENUM } from 'src/keys';

export const UserTrackingIdsMessages = {
  NOT_FOUND: 'User Tracking Ids not found.',
  SESSION_NOT_FOUND: 'User Tracking Ids Session not found.',
  ALREADY_DISABLED: 'User Tracking Ids is already disabled.',
  DISABLED: 'User Tracking Ids is disabled.',
  ALREADY_ENABLED: 'User Tracking Ids is already enabled.',
  ENABLED: 'User Tracking Ids is enabled.',
  ALREADY_DELETED: 'User Tracking Ids is already deleted.',
  DELETED: 'User Tracking Ids is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
