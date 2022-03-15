import { MainPipeline } from '@components/pipelines/main-pipeline';
import { envVars } from '@env/var.env';
import { useSocket } from '@hooks/socket';
import { useHandleDnD } from '@hooks/useHandleDnD';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import { useGetPipeLineUser } from '@modules/pipeline/query/pipeline.get';
import { useEffect } from 'react';
import { connect } from 'socket.io-client';

const socket = connect(`${envVars.VITE_BE_DOMAIN}/pipeline`);

interface PipelineProps { }

const Pipeline: React.FC<PipelineProps> = ({ }) => {
  const { data } = useGetPipeLineUser();
  const {
    newPipeLine,
    setPipeLine,
    handleMoveColumn,
    handleMoveItemColumn,
    handleMoveItemsBetweenColumns,
  } = useHandleDnD(data);

  useSocket<IPipeline, any>({
    event: 'pipeline-updated',
    socket,
    onReceive: (data) => console.log("dataSale:", data)
  });

  useEffect(() => {
    setPipeLine(data);
  }, [data]);

  return (
    <MainPipeline
      data={data}
      newPipeLine={newPipeLine}
      handleMoveColumn={handleMoveColumn}
      handleMoveItemColumn={handleMoveItemColumn}
      handleMoveItemsBetweenColumns={handleMoveItemsBetweenColumns}
    />
  );
};

export default Pipeline;
