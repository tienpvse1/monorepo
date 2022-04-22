export enum InternalServerEvent {
  MANAGER_PIPELINE_UPDATED = 'manager-pipeline-updated',
  NEW_MEMBER_JOIN_TEAM = 'new-member-join-team',
  SEND_NOTIFICATION = 'send-notification',
  PIPELINE_UPDATED = 'pipeline-updated',
  HISTORY_ADDED = 'history-added',
  TEAM_UPDATED = 'team-updated',
  WEBHOOK_SENT_EVENT = 'webhook-sent-event',
  WEBHOOK_SENT_TEST_EVENT = 'webhook-sent-test-event',
  EMAIL_EVENT = 'email-event',
}

export enum SocketReceiveEvent {
  UPDATE_PIPELINE = 'update-pipeline',
  JOIN = 'join',
}

export enum SocketSendEvent {
  MANAGER_PIPELINE_UPDATED = 'manager-pipeline-updated',
  NEW_MEMBER_JOIN_TEAM = 'new-member-join-team',
  SEND_NOTIFICATION = 'send-notification',
  PIPELINE_UPDATED = 'pipeline-updated',
  HISTORY_ADDED = 'history-added',
  TEAM_UPDATED = 'team-updated',
  JOINED = 'joined',
  WEBHOOK_SENT_EVENT = 'webhook-sent-event',
  WEBHOOK_SENT_TEST_EVENT = 'webhook-sent-test-event',
}
