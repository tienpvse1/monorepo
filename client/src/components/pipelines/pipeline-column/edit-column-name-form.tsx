import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { ThemeColor } from '@constance/color';
import { ICreatePipelineColumnDto } from '@modules/pipeline-column/dto/create-pipeline-column.dto';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { useUpdatePipelineColumn } from '@modules/pipeline-column/mutation/pipeline-column.patch';
import { Button, Form, Input } from 'antd';

interface FormEditColumnNameProps {
  setShowInput: () => void;
  pipelineColumn: IPipelineColumn;
}

export const FormEditColumnName: React.FC<FormEditColumnNameProps> = ({ setShowInput, pipelineColumn }) => {

  const { updatePipelineColumn } = useUpdatePipelineColumn();

  const handleSubmit = (value: ICreatePipelineColumnDto) => {
    if (value.name == '') {
      setShowInput();
      return;
    }
    updatePipelineColumn({ ...value, pipelineId: pipelineColumn.id });
    setShowInput();
  }

  return (
    <>
      <Form
        initialValues={{ ["name"]: pipelineColumn.name }}
        style={{ height: '40px', display: 'flex', marginTop: '4.25px' }}
        onFinish={(value) => handleSubmit(value)}
      >
        <Form.Item name="name">
          <Input className="title-pipeline-column"
            style={{
              height: '35px',
              width: "100%"
            }} />
        </Form.Item>
        <Button
          htmlType='submit'
          icon={<CheckOutlined style={{ fontSize: '14px' }} />}
          style={{
            height: '35px',
            border: 'none',
            backgroundColor: ThemeColor.darkGreyBackgroundColor
          }}
        />
        <Button
          onClick={setShowInput}
          icon={<CloseOutlined style={{ fontSize: '14px' }} />}
          style={{
            height: '35px',
            border: 'none',
            backgroundColor: ThemeColor.darkGreyBackgroundColor
          }}
        />
      </Form>
    </>
  );
};
