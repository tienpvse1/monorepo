export interface Auth {
  user: string;
  pass: string;
}

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

export class VerifyAccountDto {
  imap: Imap;
  smtp: Smtp;
}
