import { MainPipeline } from '@components/pipelines/main-pipeline';
import { envVars } from '@env/var.env';
import { useSocket } from '@hooks/socket';
import { useHandleDnD } from '@hooks/useHandleDnD';
import { getStages } from '@modules/pipeline-column/query/pipeline-column.get';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import { GET_PIPELINE_DESIGN } from '@modules/pipeline/query/pipeline.get';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { connect } from 'socket.io-client';
const socket = connect(`${envVars.VITE_BE_DOMAIN}/pipeline`);

interface AdminPipelineProps { }

const AdminPipeline: React.FC<AdminPipelineProps> = ({ }) => {
  const { data: stages } = useQuery(GET_PIPELINE_DESIGN, getStages, {
    suspense: true,
    staleTime: Infinity
  });

  const pipeline: IPipeline = {
    id: "pipeline-project",
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
    name: "pipeline project",
    pipelineColumns: stages
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
    socket,
    onReceive: ({ pipelineColumns }: IPipeline) => {
      if (pipelineColumns) {
        setPipeLine({
          ...pipeline,
          pipelineColumns
        });
      }
    }
  });

  useEffect(() => {
    const ac = new AbortController();
    setPipeLine(pipeline);
    return () => {
      // @ts-ignore
      setPipeLine({});
      ac.abort();
    };
  }, [stages]);

  return (
    <MainPipeline
      data={pipeline}
      newPipeLine={newPipeLine}
      handleMoveColumn={handleMoveColumn}
      handleMoveItemColumn={handleMoveItemColumn}
      handleMoveItemsBetweenColumns={handleMoveItemsBetweenColumns}
    />
  );
};

export default AdminPipeline;
