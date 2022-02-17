import { FileAddOutlined } from '@ant-design/icons';
import { CreateContactDto } from '@modules/contact/dto/create-contact.dto';
import { useBulkInsertContact } from '@modules/contact/mutation/contact.post';
import { removeDuplicate } from '@util/array';
import { Button, Radio, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { nanoid } from 'nanoid';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface PreviewContactTableProps {
  contacts: CreateContactDto[];
  setContacts: Dispatch<SetStateAction<CreateContactDto[]>>;
}

enum Types {
  ALL = 'all',
  CLEANED = 'cleaned',
  FULL_FILLED = 'full-filled',
}

const PreviewContactTable: FC<PreviewContactTableProps> = ({
  contacts,
  setContacts,
}) => {
  const initialData = contacts.slice(0);
  const { mutate, isSuccess } = useBulkInsertContact();
  const [previewData, setPreviewData] = useState(initialData);
  const handleSaveData = () => {
    const data = { bulk: contacts };
    console.log(data);
    mutate(data);
  };

  if (isSuccess) {
    return <Navigate to={'/contact'} />;
  }

  const handleChange = (value: Types) => {
    if (value === Types.ALL) {
      setPreviewData(initialData);
    } else if (value === Types.CLEANED) {
      setContacts(removeDuplicate<CreateContactDto>(initialData, 'phone'));
    } else {
    }
  };

  return (
    <>
      <Button
        style={{ margin: '20px 0px' }}
        type='primary'
        onClick={handleSaveData}
      >
        save data
      </Button>
      <div>
        <Radio.Group
          optionType='button'
          defaultValue={Types.ALL}
          onChange={(e) => handleChange(e.target.value)}
          options={[
            {
              label: 'All',
              value: Types.ALL,
            },
            {
              label: 'Cleaned',
              value: Types.CLEANED,
            },
            {
              label: 'Full-filled',
              value: Types.FULL_FILLED,
            },
          ]}
        />
      </div>
      <Table dataSource={previewData} rowKey={() => nanoid(3)}>
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
