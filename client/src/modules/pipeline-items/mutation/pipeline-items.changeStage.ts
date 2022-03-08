import { useMutation, useQueryClient } from "react-query";
import { handleMutationResponse } from "@modules/base/base.handler";
import { IPipeline } from "@modules/pipeline/entity/pipeline.entity";
import { GET_PIPELINE_DESIGN } from "@modules/pipeline/query/pipeline.get";
import { usePostHistory } from "@modules/history/mutation/history.post";
import { actionPutPipeline } from "@modules/pipeline/mutation/pipeline.update";


export const useChangeStagePipelineItems = () => {
  const queryClient = useQueryClient();
  const { createHistory } = usePostHistory();

  const { mutate, ...rest } = useMutation(actionPutPipeline,
    {
      ...handleMutationResponse('',
        (_, variables) => {
          const info = variables.infoChangeStage;
          queryClient.invalidateQueries(GET_PIPELINE_DESIGN);
          createHistory({
            url: '/api/v1/history',
            method: 'POST',
            name: `Move an #${info.itemsId} from stage ${info.oldStage} to ${info.newStage}`
          });

        })
    }
  );

  const changeStage = (pipeline: IPipeline) => {
    mutate(pipeline);
  }

  return { changeStage, ...rest };
}