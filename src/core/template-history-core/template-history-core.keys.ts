import { STATUS_ENUM } from 'src/keys';

export const TemplateHistoryMessages = {
  NOT_FOUND: 'Template History not found.',
  SESSION_NOT_FOUND: 'Template History Session not found.',
  ALREADY_DISABLED: 'Template History is already disabled.',
  DISABLED: 'Template History is disabled.',
  ALREADY_ENABLED: 'Template History is already enabled.',
  ENABLED: 'Template History is enabled.',
  ALREADY_DELETED: 'Template History is already deleted.',
  DELETED: 'Template History is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
