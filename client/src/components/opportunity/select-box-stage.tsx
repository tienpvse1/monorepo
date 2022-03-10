import { isRequired } from '@constance/rules-of-input-antd'
import { Form, Select } from 'antd'
const { Option } = Select;
import { useLiveQuery } from 'dexie-react-hooks';
import { getPipeline } from '@db/pipeline.db';
import { useGetStagesByPipelineId } from '@modules/pipeline-column/query/pipeline.get';

export const SelectBoxStage = () => {
  const pipeline = useLiveQuery(getPipeline);
  const { data: pipelineColumns } = useGetStagesByPipelineId(pipeline?.id);

  return (
    <>
      {pipelineColumns &&
        <Form.Item
          name="stage"
          label="Stage"
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
      }
    </>
  )
}
