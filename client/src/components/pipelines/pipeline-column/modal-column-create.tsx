import { ICreatePipelineColumnDto } from '@modules/pipeline-column/dto/create-pipeline-column.dto';
import { usePostPipelineColumn } from '@modules/pipeline-column/mutation/pipeline-column.post';
import { ModalFormCreateStageColumn } from '../../modal/form-create-stage-column';

interface ModalColumnCreateProps {
  pipelineId: string;
  currentIndexColumn: number;
  visible: boolean;
  setVisible: () => void;
}

export const ModalColumnCreate: React.FC<ModalColumnCreateProps> = ({ pipelineId, currentIndexColumn, setVisible, visible }) => {

  const { createPipelineColumn } = usePostPipelineColumn();

  const onCreate = (values: ICreatePipelineColumnDto) => {
    createPipelineColumn({ ...values, index: currentIndexColumn, pipelineId: pipelineId });
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
