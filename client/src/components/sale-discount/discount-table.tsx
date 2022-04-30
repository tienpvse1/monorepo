import { IDiscount } from '@modules/discount/entity/discount.entity';
import { useDiscountCodes } from '@modules/discount/query/discount.get';
import { Button, Table, Tooltip } from 'antd';
import moment from 'moment';

const { Column } = Table;
interface DiscountTableProps {}

export const DiscountTable: React.FC<DiscountTableProps> = ({}) => {
  const { data: discountCodes } = useDiscountCodes(true);
  return (
    <div>
      <Table dataSource={discountCodes} rowKey={(row) => row.id}>
        <Column dataIndex='name' title='Name' key='name' />
        <Column
          key='iat'
          title='Created at'
          render={(row: IDiscount) => (
            <span>{moment(row.createdAt).format('DD MMMM YYYY')}</span>
          )}
        />
        <Column
          dataIndex='expireAt'
          title='Expire at'
          key='expireAt'
          render={(row: IDiscount) => (
            <span>{moment(row.expireAt).format('DD MMMM YYYY')}</span>
          )}
        />
        <Column
          key='discountAmount'
          title='Discount'
          sorter={(a: IDiscount, b: IDiscount) =>
            a.discountAmount - b.discountAmount
          }
          render={(row: IDiscount) => <span>{row.discountAmount * 100}%</span>}
        />
        <Column
          key='actions'
          title='Actions'
          render={(row: IDiscount) => (
            <span>
              <Tooltip title='Send this discount code to specific customer using email'>
                <Button>Send</Button>
              </Tooltip>
            </span>
          )}
        />
      </Table>
    </div>
  );
};
