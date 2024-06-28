import { STATUS_ENUM } from 'src/keys';

export const PlanRestrictionMessages = {
  NOT_FOUND: 'Plan Restriction not found.',
  SESSION_NOT_FOUND: 'Plan Restriction Session not found.',
  ALREADY_DISABLED: 'Plan Restriction is already disabled.',
  DISABLED: 'Plan Restriction is disabled.',
  ALREADY_ENABLED: 'Plan Restriction is already enabled.',
  ENABLED: 'Plan Restriction is enabled.',
  ALREADY_DELETED: 'Plan Restriction is already deleted.',
  DELETED: 'Plan Restriction is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
