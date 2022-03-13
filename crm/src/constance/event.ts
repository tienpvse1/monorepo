export enum InternalServerEvent {
  MANAGER_PIPELINE_UPDATED = 'manager-pipeline-updated',
  NEW_MEMBER_JOIN_TEAM = 'new-member-join-team',
  SEND_NOTIFICATION = 'send-notification',
  PIPELINE_UPDATED = 'pipeline-updated',
  INVITATION_SENT = 'invitation-sent',
  HISTORY_ADDED = 'history-added',
  TEAM_UPDATED = 'team-updated',
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
  INVITATION_SENT = 'invitation-sent',
  HISTORY_ADDED = 'history-added',
  TEAM_UPDATED = 'team-updated',
  JOINED = 'joined',
}
