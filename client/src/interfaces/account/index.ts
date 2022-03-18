import { IBase } from '@interfaces/base';
import { Role } from '@interfaces/type-roles';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import { ITeam } from '@modules/team/entity/team.entity';

export interface IAccount extends IBase {
  avatar: string;
  firstName: string;
  lastName: string;
  photo: string;
  teamIndex: number;
  team: ITeam;
  email: string;
  password: string;
  isSocialAccount: boolean;
  role: {
    name: Role;
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
  pipeline: IPipeline;
}
