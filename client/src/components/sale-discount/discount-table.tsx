import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useBooleanToggle } from '@mantine/hooks';
import {
  useContactsByAccountId,
  useContactsDealsById,
} from '@modules/contact/query/contact.get';
import { IDiscount } from '@modules/discount/entity/discount.entity';
import {
  useCreateDiscountCodeTemplate,
  useSendDiscountCode,
} from '@modules/discount/mutation/discount.post';
import { useDiscountCodes } from '@modules/discount/query/discount.get';
import { Button, Modal, Select, Table, Tooltip } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

const { Column } = Table;
interface DiscountTableProps {}

export const DiscountTable: React.FC<DiscountTableProps> = ({}) => {
  const [
    {
      public_user_info: { id: accountId },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data: discountCodes } = useDiscountCodes(true);
  const [showModal, setShowModal] = useBooleanToggle(false);
  const { data: myContacts } = useContactsByAccountId(accountId);
  const [currentContactId, setCurrentContactID] = useState(undefined);
  const [currentDiscountId, setCurrentDiscountId] = useState(undefined);
  const [currentTemplate, setCurrentTemplate] = useState(undefined);
  const { mutate } = useCreateDiscountCodeTemplate();
  const { mutate: sendEmail } = useSendDiscountCode();

  const handleChange = (pipelineItemId: string) => {
    if (currentDiscountId) {
      mutate(
        {
          contactId: currentContactId,
          pipelineItemId: pipelineItemId,
          discountId: currentDiscountId,
        },
        {
          onSettled(data) {
            setCurrentTemplate(data);
          },
        }
      );
    }
  };

  return (
    <div>
      <Modal
        title='Send discount code'
        visible={showModal}
        onOk={() => {
          sendEmail({
            contactEmail: myContacts.filter(
              (contact) => contact.id === currentContactId
            )[0].email,
            template: currentTemplate,
          });
          setShowModal(false);
        }}
        style={{
          width: '600px',
        }}
        bodyStyle={{
          width: '600px',
        }}
        width='700px'
        onCancel={() => setShowModal(false)}
        okButtonProps={{
          disabled: !Boolean(currentTemplate),
        }}
      >
        {myContacts && (
          <>
            <Select
              showSearch
              filterOption={(input, option) =>
                option.children
                  .toString()
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              placeholder='Select an deals'
              style={{ width: '300px' }}
              onSelect={(value: string) => {
                setCurrentContactID(value);
              }}
            >
              {myContacts?.map((contact) => (
                <Select.Option key={contact.id}>{contact.name}</Select.Option>
              ))}
            </Select>
            <Select
              placeholder='Select an deals'
              style={{ width: '300px' }}
              onSelect={(value: string) => handleChange(value)}
            >
              {currentContactId &&
                myContacts
                  .filter((item) => item.id === currentContactId)[0]
                  .pipelineItems.map((item) => (
                    <Select.Option key={item.id}>{item.name}</Select.Option>
                  ))}
            </Select>
            {currentTemplate && (
              <>
                <h3>preview template:</h3>
                <div
                  style={{
                    paddingLeft: 50,
                    border: '1px solid rgba(0,0,0,0.4)',
                    borderRadius: 15,
                  }}
                >
                  <div
                    style={{
                      width: '700px',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: currentTemplate,
                    }}
                  ></div>
                </div>
              </>
            )}
          </>
        )}
      </Modal>
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
                <Button
                  onClick={() => {
                    setShowModal(true);
                    setCurrentDiscountId(row.id);
                  }}
                >
                  Send
                </Button>
              </Tooltip>
            </span>
          )}
        />
      </Table>
    </div>
  );
};
