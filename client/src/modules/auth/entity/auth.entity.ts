import { Role } from "@interfaces/type-roles";

export interface IAuth {
  token: string;
  publicData: {
    role: Role;
    email: string;
    id: string;
  }
}
