import { IPipeline } from "@interfaces/pipeline";
import { Role } from "@interfaces/type-roles";

export interface IAccount {
  avatar: string;
  firstName: string;
  lastName: string;
  photo: string;
  email: string;
  password: string;
  isSocialAccount: boolean;
  role: Role;
  pipeline: IPipeline;
}