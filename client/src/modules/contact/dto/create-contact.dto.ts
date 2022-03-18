export interface IImportedContact {
  name: string;
  company: string;
  phone: string;
  type: string;
  email: string;
  jobPosition: string;
  address: string;
  internalNotes: string;
}

export interface CreateContactDto {
  name: string;
  companyName: string;
  phone: string;
  type: string;
  email: string;
  jobPosition: string;
  address: string;
  internalNotes: string;
}
