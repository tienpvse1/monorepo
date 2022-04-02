/**
 * new web hook interface
 */

export interface Header {
  content: string;
}

export interface HeaderLine {
  key: string;
  line: string;
}

export interface Value {
  address: string;
  name: string;
}

export interface To {
  value: Value[];
  html: string;
  text: string;
}

export interface Value {
  address: string;
  name: string;
}

export interface From {
  value: Value[];
  html: string;
  text: string;
}

export class WebHookDto {
  attachments: any[];
  headers: Header;
  headerLines: HeaderLine[];
  html: string;
  text: string;
  textAsHtml: string;
  subject: string;
  date: string;
  to: To;
  from: From;
  messageId: string;
}
