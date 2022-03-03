export enum InternalServerEvent {
  PIPELINE_UPDATED = 'pipeline-updated',
  NEW_MEMBER_JOIN_TEAM = 'new-member-join-team',
}

export enum SocketReceiveEvent {
  UPDATE_PIPELINE = 'update-pipeline',
}

export enum SocketSendEvent {
  PIPELINE_UPDATED = 'pipeline-updated',
  NEW_MEMBER_JOIN_TEAM = 'new-member-join-team',
}
