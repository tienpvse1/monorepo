export enum EmailTemplateType {
  CERTIFICATE_EXP = 'certificate_exp',
  COURSE_EXP = 'course_exp',
  BIRTHDAY = 'birthday',
}

export interface ICreateAET {
  design: any;
  type: EmailTemplateType;

  html: string;
  account_id: string;
}
