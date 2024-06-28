export enum SubscriptionStatus {
  Active = 'active',
  Canceled = 'canceled',
  Paused = 'paused',
}

export enum SubscriptionPaymentMethod {
  Stripe = 'stripe',
  TwoCheckout = '2checkout',
  RazorPay = 'razorpay',
  BankTransfer = 'bank-transfer',
  OfflinePayment = 'offline-payment',
  Other = 'other',
}

export enum SubscriptionPaymentMethodDto {
  Null = 'null',
  Stripe = 'stripe',
  TwoCheckout = '2checkout',
  RazorPay = 'razorpay',
  BankTransfer = 'bank-transfer',
  OfflinePayment = 'offline-payment',
  Other = 'other',
}

export enum SubscriptionRenewalType {
  automatic = 'automatic',
  manual = 'manual',
}

export enum StripePlanCreationPreference {
  CreateNewPlan = 'CreateNewPlan',
  DoNotCreateNewPlan = 'DoNotCreateNewPlan',
  LinkExistingPlan = 'LinkExistingPlan',
}
