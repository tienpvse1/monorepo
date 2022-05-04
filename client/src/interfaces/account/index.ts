import { IBase } from '@interfaces/base';
import { Role } from '@interfaces/type-roles';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import { ISchedule } from '@modules/schedule/entity/schedule.entity';
import { ITeam } from '@modules/team/entity/team.entity';

export interface IAccount extends IBase {
  username: string;
  avatar: string;
  firstName: string;
  lastName: string;
  photo: string;
  teamIndex: number;
  team: ITeam;
  email: string;
  password: string;
  isEnable: boolean;
  isSocialAccount: boolean;
  role: {
    name: Role;
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
  pipeline: IPipeline;
  pipelineItems: IPipelineItem[];
  isLeader?: boolean;
  schedules: ISchedule[];
}
