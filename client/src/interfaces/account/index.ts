import { IBase } from '@interfaces/base';
import { Role } from '@interfaces/type-roles';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';

export interface IAccount extends IBase {
  avatar: string;
  firstName: string;
  lastName: string;
  photo: string;
  teamIndex: number;
  email: string;
  password: string;
  isSocialAccount: boolean;
  role: Role;
  pipeline: IPipeline;
}
