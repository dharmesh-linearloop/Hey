import { STATUS_ENUM } from 'src/keys';

export const UserCustomDomainMessages = {
  NOT_FOUND: 'User Custom Domain Custom Domain not found.',
  SESSION_NOT_FOUND: 'User Custom Domain Custom Domain Session not found.',
  ALREADY_DISABLED: 'User Custom Domain Custom Domain is already disabled.',
  DISABLED: 'User Custom Domain Custom Domain is disabled.',
  ALREADY_ENABLED: 'User Custom Domain Custom Domain is already enabled.',
  ENABLED: 'User Custom Domain Custom Domain is enabled.',
  ALREADY_DELETED: 'User Custom Domain Custom Domain is already deleted.',
  DELETED: 'User Custom Domain Custom Domain is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
