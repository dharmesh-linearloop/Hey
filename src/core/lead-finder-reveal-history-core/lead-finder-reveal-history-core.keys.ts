import { STATUS_ENUM } from 'src/keys';

export const LeadFinderRevealHistoryMessages = {
  NOT_FOUND: 'Lead Reveal History not found.',
  SESSION_NOT_FOUND: 'Lead Reveal History Session not found.',
  ALREADY_DISABLED: 'Lead Reveal History is already disabled.',
  DISABLED: 'Lead Reveal History is disabled.',
  ALREADY_ENABLED: 'Lead Reveal History is already enabled.',
  ENABLED: 'Lead Reveal History is enabled.',
  ALREADY_DELETED: 'Lead Reveal History is already deleted.',
  DELETED: 'Lead Reveal History is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
