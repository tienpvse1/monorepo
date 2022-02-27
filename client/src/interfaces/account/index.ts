import { Role } from "@interfaces/type-roles";
import { IPipeline } from "@modules/pipeline/entity/pipeline.entity";

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