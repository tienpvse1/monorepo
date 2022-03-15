import { MainPipeline } from '@components/pipelines/main-pipeline';
import { envVars } from '@env/var.env';
import { useSocket } from '@hooks/socket';
import { useHandleDnD } from '@hooks/useHandleDnD';
import { getStages, GET_STAGES_BY_PIPELINE_ID } from '@modules/pipeline-column/query/pipeline-column.get';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { connect } from 'socket.io-client';
import { abstractSort } from '@util/array';

const socket = connect(`${envVars.VITE_BE_DOMAIN}/pipeline`);

interface PipelineProps { }

const PipelineAdmin: React.FC<PipelineProps> = ({ }) => {
  // const { data: Stages } = useStages();
  const { data: Stages } = useQuery([GET_STAGES_BY_PIPELINE_ID], getStages, {
    suspense: true,
    staleTime: Infinity
  });

  const pipeline: IPipeline = {
    id: "QIECTiuvzY",
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
    name: "pipeline 1",
    pipelineColumns: Stages
  }

  const {
    newPipeLine,
    setPipeLine,
    handleMoveColumn,
    handleMoveItemColumn,
    handleMoveItemsBetweenColumns,
  } = useHandleDnD(pipeline);

  useSocket({
    event: 'manager-pipeline-updated',
    onReceive: ({ pipelineColumns }: IPipeline) => {
      if (pipelineColumns) {
        abstractSort(pipelineColumns, 'pipelineItems');
        setPipeLine({
          ...pipeline,
          pipelineColumns
        });
      }
    },
    socket,
  });

  useEffect(() => {
    setPipeLine(pipeline);
  }, [Stages]);

  // useEffect(() => {
  //   getStages().then((data) => {
  //     setPipeLine({
  //       ...pipeline,
  //       pipelineColumns: data
  //     });
  //   });
  // }, [data, isError]);

  return (
    <MainPipeline
      data={pipeline}
      newPipeLine={newPipeLine}
      handleMoveColumn={handleMoveColumn}
      handleMoveItemColumn={handleMoveItemColumn}
      handleMoveItemsBetweenColumns={handleMoveItemsBetweenColumns}
    />
    // <h1>123</h1>
  );
};

export default PipelineAdmin;
