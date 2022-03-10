export enum InternalServerEvent {
  PIPELINE_UPDATED = 'pipeline-updated',
  NEW_MEMBER_JOIN_TEAM = 'new-member-join-team',
  INVITATION_SENT = 'invitation-sent',
  HISTORY_ADDED = 'history-added',
  TEAM_UPDATED = 'team-updated',
}

export enum SocketReceiveEvent {
  UPDATE_PIPELINE = 'update-pipeline',
  JOIN = 'join',
}

export enum SocketSendEvent {
  PIPELINE_UPDATED = 'pipeline-updated',
  NEW_MEMBER_JOIN_TEAM = 'new-member-join-team',
  INVITATION_SENT = 'invitation-sent',
  HISTORY_ADDED = 'history-added',
  JOINED = 'joined',
  TEAM_UPDATED = 'team-updated',
}
