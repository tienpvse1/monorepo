import { useMutation, useQueryClient } from "react-query";
import { handleMutationResponse } from "@modules/base/base.handler";
import { IPipeline } from "@modules/pipeline/entity/pipeline.entity";
import { GET_PIPELINE_DESIGN } from "@modules/pipeline/query/pipeline.get";
import { actionPutPipeline } from "@modules/pipeline/mutation/pipeline.update";
import { usePostOpportunityHistory } from "@modules/opportunity-history/mutation/opportunity-history.post";
import { OpportunityHistoryType } from "@modules/opportunity-history/entity/opportunity-history.entity";


export const useChangeStagePipelineItems = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: mutateOpportunityHistory } = usePostOpportunityHistory();

  const { mutate, ...rest } = useMutation(actionPutPipeline,
    {
      ...handleMutationResponse('',
        (_, variables) => {
          const {
            itemsId,
            oldStage,
            newStage,
            startColumnName,
            finishColumnName } = variables.infoChangeStage;
          queryClient.invalidateQueries(GET_PIPELINE_DESIGN);
          mutateOpportunityHistory({
            newStageID: newStage,
            oldStageId: oldStage,
            description: `moved from ${startColumnName} to ${finishColumnName}`,
            pipelineItemId: itemsId,
            type: OpportunityHistoryType.CHANGE_STATE,
          });

        })
    }
  );

  const changeStage = (pipeline: IPipeline) => {
    mutate(pipeline);
  }

  return { changeStage, ...rest };
}