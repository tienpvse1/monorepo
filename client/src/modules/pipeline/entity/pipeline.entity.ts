import { IAccount } from "@interfaces/account";
import { IBase } from "@interfaces/base";
import { IPipelineColumn } from "@modules/pipeline-column/entity/pipeline-column.entity";

export interface IPipeline extends IBase{
  name: string;
  account: IAccount;
  pipelineColumns: IPipelineColumn[]
}
