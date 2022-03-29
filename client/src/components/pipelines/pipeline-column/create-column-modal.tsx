import { ICreatePipelineColumnDto } from '@modules/pipeline-column/dto/create-pipeline-column.dto';
import { usePostPipelineColumn } from '@modules/pipeline-column/mutation/pipeline-column.post';
import { ModalFormCreateStageColumn } from '../../modal/create-stage-form';

interface CreateColumnModalProps {
  pipelineId: string;
  visible: boolean;
  setVisible: () => void;
}

export const CreateColumnModal: React.FC<CreateColumnModalProps> = ({ pipelineId, setVisible, visible }) => {

  const { createPipelineColumn } = usePostPipelineColumn();

  const onCreate = (values: ICreatePipelineColumnDto) => {
    createPipelineColumn({ ...values, pipelineId: pipelineId });    
    console.log("ccc:", { ...values, pipelineId: pipelineId });
    
    setVisible();
  };

  return (
    <>
      <ModalFormCreateStageColumn
        visible={visible}
        onCreate={onCreate}
        onCancel={() => { setVisible() }}
      />
    </>
  );
};
