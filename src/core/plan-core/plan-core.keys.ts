import { STATUS_ENUM } from 'src/keys';

export const PlanMessages = {
  NOT_FOUND: 'Plan not found.',
  SESSION_NOT_FOUND: 'Plan Session not found.',
  ALREADY_DISABLED: 'Plan is already disabled.',
  DISABLED: 'Plan is disabled.',
  ALREADY_ENABLED: 'Plan is already enabled.',
  ENABLED: 'Plan is enabled.',
  ALREADY_DELETED: 'Plan is already deleted.',
  DELETED: 'Plan is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
