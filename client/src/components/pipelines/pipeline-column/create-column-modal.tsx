import { ICreatePipelineColumnDto } from '@modules/pipeline-column/dto/create-pipeline-column.dto';
import { useSetWonPipelineColumn } from '@modules/pipeline-column/mutation/pipeline-column.patch';
import { usePostPipelineColumn } from '@modules/pipeline-column/mutation/pipeline-column.post';
import { ModalFormCreateStageColumn } from '../../modal/create-stage-form';
import { message } from 'antd';

interface CreateColumnModalProps {
  pipelineId: string;
  visible: boolean;
  setVisible: () => void;
}

export const CreateColumnModal: React.FC<CreateColumnModalProps> = ({ pipelineId, setVisible, visible }) => {

  const { mutate: createPipelineColumn } = usePostPipelineColumn();
  const { mutate: setWonPipelineColumn } = useSetWonPipelineColumn();

  const onCreate = (values: ICreatePipelineColumnDto) => {
    createPipelineColumn({ ...values, pipelineId: pipelineId }, {
      onSuccess: (data) => {
        if (values.isWon) {
          setWonPipelineColumn(data.id)
        }
        message.success('Created stage successfully!')
        setVisible();
      }
    });
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
