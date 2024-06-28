export enum EmailAccountConnectionHistoryExecutor {
  User = 'user',
  System = 'system',
}

export enum EmailAccountConnectionHistoryStatus {
  Connected = 'connected',
  Disconnected = 'disconnected',
}

export enum EmailAccountConnectionHistoryMessage {
  EmailAccountDisconnected = 'Email Account Disconnected.',
  EmailAccountConnected = 'Email Account Connected.',
}

export enum Services {
  EdgeService = 'edge-service',
  ReplyTracker = 'reply-tracker',
  WatchManager = 'watch-manager',
  EmailSender = 'email-sender',
}
