export class CreateWebhookDto {}
export interface From {
  name: string;
  address: string;
}

export interface ReplyTo {
  name: string;
  address: string;
}

export interface Sender {
  name: string;
  address: string;
}

export interface To {
  name: string;
  address: string;
}

export interface Header {
  'delivered-to': string[];
  received: string[];
  'x-received': string[];
  'arc-seal': string[];
  'arc-message-signature': string[];
  'arc-authentication-results': string[];
  'return-path': string[];
  'received-spf': string[];
  'authentication-results': string[];
  'dkim-signature': string[];
  'x-google-dkim-signature': string[];
  'x-gm-message-state': string[];
  'x-google-smtp-source': string[];
  'mime-version': string[];
  from: string[];
  date: string[];
  'message-id': string[];
  subject: string[];
  to: string[];
  'content-type': string[];
}

export interface EncodedSize {
  plain: number;
  html: number;
}

export interface Text {
  id: string;
  encodedSize: EncodedSize;
  plain: string;
  html: string;
  hasMore: boolean;
}

export interface Data {
  id: string;
  uid: number;
  emailId: string;
  threadId: string;
  date: string;
  unseen: boolean;
  size: number;
  subject: string;
  from: From;
  replyTo: ReplyTo;
  sender: Sender;
  to: To[];
  messageId: string;
  labels: string[];
  headers: Header;
  text: Text;
}

export interface ReceivedEmailDto {
  account: string;
  date: string;
  path: string;
  specialUse: string;
  event: string;
  data: Data;
}
