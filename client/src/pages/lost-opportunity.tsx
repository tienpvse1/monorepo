import { SyncOutlined } from '@ant-design/icons';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { useRestoreOpportunity } from '@modules/pipeline-items/mutation/pipeline-item.patch';
import {
  GET_MY_LOSE_PIPELINE_ITEMS,
  useMyLosePipelineItems,
} from '@modules/pipeline-items/query/pipeline-item.get';
import { Button, notification, Table } from 'antd';
import moment from 'moment';
import { useCookies } from 'react-cookie';
import { client } from '../App';

interface LostOpportunityProps {}
const { Column } = Table;
const LostOpportunity: React.FC<LostOpportunityProps> = ({}) => {
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data } = useMyLosePipelineItems(id);

  const { mutate } = useRestoreOpportunity();
  const handleRestore = (id: string) => {
    mutate(
      { id },
      {
        onSettled: async () => {
          await client.invalidateQueries(GET_MY_LOSE_PIPELINE_ITEMS);
          notification.success({
            message: 'Reverted',
            description: 'revert success fully',
          });
        },
      }
    );
  };
  return (
    <Table pagination={false} dataSource={data} rowKey={(row) => row.id}>
      <Column title='Name' dataIndex='name' key='name' />
      <Column
        title='Lost reason'
        key='reason'
        render={(text, row: IPipelineItem) => <>{row.reason?.reason}</>}
      />
      <Column
        title='Expected closing'
        dataIndex={'expectedClosing'}
        render={(text) => <>{text && moment(text).format('DD MMMM YYYY')}</>}
        key='expectedClosing'
      />
      <Column
        title='Action'
        align='center'
        render={(text, record: IPipelineItem) => (
          <>
            <Button
              onClick={() => handleRestore(record.id)}
              icon={<SyncOutlined />}
            >
              revert
            </Button>
          </>
        )}
        key='expectedClosing'
      />
    </Table>
  );
};

export default LostOpportunity;
