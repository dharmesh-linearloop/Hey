import { STATUS_ENUM } from 'src/keys';

export const StripeSubscriptionHistoryMessages = {
  NOT_FOUND: 'Stripe Subscription History not found.',
  SESSION_NOT_FOUND: 'Stripe Subscription History Session not found.',
  ALREADY_DISABLED: 'Stripe Subscription History is already disabled.',
  DISABLED: 'Stripe Subscription History is disabled.',
  ALREADY_ENABLED: 'Stripe Subscription History is already enabled.',
  ENABLED: 'Stripe Subscription History is enabled.',
  ALREADY_DELETED: 'Stripe Subscription History is already deleted.',
  DELETED: 'Stripe Subscription History is deleted.',
  INVALID_STATUS: `Please enter a valid status. i.e. ${STATUS_ENUM.ENABLED} or ${STATUS_ENUM.DISABLED}`,
};
