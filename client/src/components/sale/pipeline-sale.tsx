import { MainPipeline } from '@components/pipelines/main-pipeline';
import { envVars } from '@env/var.env';
import { useSocket } from '@hooks/socket';
import { useHandleDnD } from '@hooks/useHandleDnD';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import { GET_PIPELINE_DESIGN, useGetPipeLineUser } from '@modules/pipeline/query/pipeline.get';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { connect } from 'socket.io-client';

const socket = connect(`${envVars.VITE_BE_DOMAIN}/pipeline`);

interface PipelineSaleProps { }

const PipelineSale: React.FC<PipelineSaleProps> = ({ }) => {
  const { data } = useGetPipeLineUser();
  const queryClient = useQueryClient();

  //filter opportunity is lose = false
  data?.pipelineColumns.map(column => column.pipelineItems = column.pipelineItems.filter(item => !item.isLose))

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
    onReceive: () => queryClient.refetchQueries(GET_PIPELINE_DESIGN)
  });

  useEffect(() => {
    setPipeLine(data);
    return () => {
      console.log('123')
      
      // @ts-ignore
      setPipeLine({});
    };
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

export default PipelineSale;