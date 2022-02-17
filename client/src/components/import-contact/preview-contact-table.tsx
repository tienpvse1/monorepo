import { FileAddOutlined } from '@ant-design/icons';
import { CreateContactDto } from '@modules/contact/dto/create-contact.dto';
import { useBulkInsertContact } from '@modules/contact/mutation/contact.post';
import { Button, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { nanoid } from 'nanoid';
import { Dispatch, FC, SetStateAction } from 'react';
import { Navigate } from 'react-router-dom';

interface PreviewContactTableProps {
  contacts: CreateContactDto[];
  setContacts: Dispatch<SetStateAction<CreateContactDto[]>>;
}

const PreviewContactTable: FC<PreviewContactTableProps> = ({
  contacts,
  setContacts,
}) => {
  const { mutate, isSuccess } = useBulkInsertContact();

  const handleSaveData = () => {
    const data = { bulk: contacts };
    console.log(data);
    mutate(data);
  };

  if (isSuccess) {
    return <Navigate to={'/contact'} />;
  }

  return (
    <>
      <Button type='primary' onClick={handleSaveData}>
        save data
      </Button>

      <Table dataSource={contacts} rowKey={() => nanoid(3)}>
        <Column title='Name' dataIndex='name' key='name' />
        <Column title='Address' dataIndex='address' key='address' />
        <Column title='Birth' dataIndex='birth' key='birth' />
        <Column title='Address' dataIndex='address' key='address' />
        <Column
          title='Type'
          dataIndex='type'
          key='type'
          render={(text, record: CreateContactDto) => (
            <Tag color={'volcano'}>{record.type}</Tag>
          )}
        />
        <Column
          title='Action'
          key='action'
          render={(text, record: any) => (
            <span>
              <a href='#' className='ant-dropdown-link'>
                <FileAddOutlined type='down' />
              </a>
            </span>
          )}
        />
      </Table>
    </>
  );
};

export default PreviewContactTable;
