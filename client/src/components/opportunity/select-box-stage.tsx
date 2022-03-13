import { isRequired } from '@constance/rules-of-input-antd';
import { Form, Select } from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';

const { Option } = Select;
import { useStages } from '@modules/pipeline-column/query/pipeline.get';

export const SelectBoxStage = () => {
  const { data: pipelineColumns } = useStages();

  return (
    <>
      {pipelineColumns && (
        <Form.Item
          name='columnId'
          label='Stage'
          required
          rules={[isRequired('Stage is required')]}
          initialValue={pipelineColumns[0].id}
        >
          <Select>
            {pipelineColumns?.map((column) => (
              <Option key={column.id} value={column.id}>
                {column.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
    </>
  );
};
