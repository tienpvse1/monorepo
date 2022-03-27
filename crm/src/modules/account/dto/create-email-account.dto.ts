export interface Tl {
  rejectUnauthorized: boolean;
  minVersion: string;
}

export interface Imap {
  auth: Auth;
  host: string;
  port: number;
  secure: boolean;
  tls: Tl;
  resyncDelay: number;
}

export interface Auth {
  user: string;
  pass: string;
}

export interface Tl {
  rejectUnauthorized: boolean;
  minVersion: string;
}

export interface Smtp {
  auth: Auth;
  host: string;
  port: number;
  secure: boolean;
  tls: Tl;
}

export interface Auth {
  user: string;
}

export class CreateEmailAccount {
  account: string;
  name: string;
  email: string;
  path: string;
  copy: boolean;
  logs: boolean;
  imap: Imap;
  smtp: Smtp;
}
