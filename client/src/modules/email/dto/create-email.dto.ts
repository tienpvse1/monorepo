export class CreateEmailDto {
  to: { email: string; isTag: boolean }[];
  subject: string;
  value: string;
}
