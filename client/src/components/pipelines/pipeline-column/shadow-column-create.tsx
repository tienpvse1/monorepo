import { useToggle } from '@hooks/useToggle';
import { ICreatePipelineColumnDto } from '@modules/pipeline-column/dto/create-pipeline-column.dto';
import { usePostPipelineColumn } from '@modules/pipeline-column/mutation/pipeline-column.post';
import { Button } from 'antd';
import { FC } from 'react';
import { ModalFormCreateColumn } from './modal-form-create';

interface ShadowColumnCreateProps {
  pipelineId: string;
  currentIndexColumn: number
}

export const ShadowColumnCreate: FC<ShadowColumnCreateProps> = ({ pipelineId, currentIndexColumn }) => {

  const [visible, setVisible] = useToggle();
  const { createPipelineColumn } = usePostPipelineColumn();

  const onCreate = (values: ICreatePipelineColumnDto) => {
    createPipelineColumn({ ...values, index: currentIndexColumn, pipelineId: pipelineId });
    setVisible();
  };

  return (
    <>
      <div className="shadow-column-create">
        <Button
          onClick={setVisible}
          style={{ width: '300px', height: '80px', fontSize: '15px' }}
          type="dashed"
        >
          Add column
        </Button>
        <ModalFormCreateColumn
          visible={visible}
          onCreate={onCreate}
          onCancel={() => { setVisible() }}
        />
      </div>
    </>
  );
};
