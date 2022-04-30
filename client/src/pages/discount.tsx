import { DiscountHeader } from '@components/sale-manager/discount/header';
import { useDiscountCodes } from '@modules/discount/query/discount.get';
import { Button, Table, Tag } from 'antd';
import { IDiscount } from '@modules/discount/entity/discount.entity';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface DiscountProps {}

const { Column } = Table;

const Discount: React.FC<DiscountProps> = ({}) => {
  const { data } = useDiscountCodes(true);
  return (
    <div>
      <DiscountHeader />
      <Table dataSource={data} rowKey={(row) => row.id}>
        <Column dataIndex='name' title='Title' key='name' />
        <Column
          title='Discount amount'
          key='discount amount'
          render={(row: IDiscount) => <div>{row.discountAmount * 100}%</div>}
        />
        <Column
          dataIndex='expireAt'
          title='Expire in'
          key='expire in'
          render={(row: IDiscount) =>
            new Date(row.expireAt) > new Date() ? (
              <div>{moment(row.expireAt).fromNow()}</div>
            ) : (
              <div>
                <Tag color={'red'}>expired</Tag>
              </div>
            )
          }
        />
        <Column
          align='center'
          render={(row: IDiscount) => (
            <>
              <Button icon={<DeleteOutlined />}>Delete</Button>
              <Button icon={<EditOutlined />}>Update</Button>
            </>
          )}
          title='Title'
          key='name'
        />
      </Table>
    </div>
  );
};

export default Discount;
