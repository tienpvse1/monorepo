import { IAccount } from '@interfaces/account';
import {
  Avatar,
  Button,
  DatePicker,
  Descriptions,
  PageHeader,
  Select,
} from 'antd';
import moment, { Moment } from 'moment';
import { Dispatch, SetStateAction } from 'react';

const { Option } = Select;
interface StatisticHeaderProps {
  timeRange: Moment[];
  setTimeRange: Dispatch<SetStateAction<Moment[]>>;
  sales: IAccount[];
  currentSale: IAccount;
  setCurrentSale: Dispatch<SetStateAction<IAccount>>;
}

export const StatisticHeader: React.FC<StatisticHeaderProps> = ({
  currentSale,
  sales,
  setCurrentSale,
  setTimeRange,
  timeRange,
}) => {
  return (
    <div className='site-page-header-ghost-wrapper'>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title='Statistic'
        subTitle='Sales activity statistic'
        extra={[
          <Button key='3'>Operation</Button>,
          <Button key='2'>Operation</Button>,
          <Button key='1' type='primary'>
            Primary
          </Button>,
        ]}
      >
        <Descriptions size='small' column={3}>
          <Descriptions.Item label='Total sales'>
            {sales && <span>{sales.length}</span>}
          </Descriptions.Item>
          <Descriptions.Item label='Range'>
            <DatePicker.RangePicker
              style={{
                transform: 'translateY(-7px)',
              }}
              defaultValue={[
                moment(new Date()).subtract(1, 'M'),
                moment(new Date()),
              ]}
            />
          </Descriptions.Item>
          <Descriptions.Item label='Sale'>
            <Select
              defaultValue={currentSale.id}
              style={{ width: 200, transform: 'translateY(-7px)' }}
              onChange={(e) =>
                setCurrentSale(sales.filter((item) => item.id === e)[0])
              }
            >
              {sales.map((account) => (
                <Option key={account.id} value={account.id}>
                  <Avatar
                    style={{ marginRight: 10 }}
                    size={'small'}
                    src={account.photo}
                  />
                  {account.firstName} {account.lastName}
                </Option>
              ))}
            </Select>
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </div>
  );
};
