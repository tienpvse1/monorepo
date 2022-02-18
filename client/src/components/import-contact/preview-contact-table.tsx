import { FileAddOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { CreateContactDto } from '@modules/contact/dto/create-contact.dto';
import { useBulkInsertContact } from '@modules/contact/mutation/contact.post';
import { contactSchema } from '@modules/contact/schema/contact.schema';
import { removeDuplicate, removeMissingProps } from '@util/array';
import { Button, Popover, Radio, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { clone } from 'lodash';
import { nanoid } from 'nanoid';
import { Dispatch, FC, lazy, SetStateAction, useState } from 'react';
import { Navigate } from 'react-router-dom';
const SaveModal = lazy(() => import('./save-modal'));

interface PreviewContactTableProps {
  contacts: CreateContactDto[];
  setContacts: Dispatch<SetStateAction<CreateContactDto[]>>;
}

export enum Types {
  ALL = 'all',
  CLEANED = 'cleaned',
  FULL_FILLED = 'full-filled',
}

const PreviewContactTable: FC<PreviewContactTableProps> = ({
  contacts,
  setContacts,
}) => {
  const initialData = clone(contacts);
  const [showModal, setShowModal] = useState(false);
  const { mutate, isSuccess } = useBulkInsertContact();
  const [previewData, setPreviewData] = useState(initialData);

  const handleSaveData = (contactData: CreateContactDto[]) => {
    const data = { bulk: contactData };
    mutate(data);
  };

  if (isSuccess) {
    return <Navigate to={'/contact'} />;
  }

  const handleChange = async (value: Types) => {
    console.log('callledddd');
    console.log(value);
    if (value === Types.ALL) {
      setPreviewData(initialData);
    } else if (value === Types.CLEANED) {
      setPreviewData(removeDuplicate<CreateContactDto>(initialData, 'phone'));
    } else {
      const filteredData = await removeMissingProps<CreateContactDto>(
        initialData,
        contactSchema
      );
      setPreviewData(filteredData);
    }
  };

  return (
    <>
      {showModal && (
        <SaveModal
          setShowModal={setShowModal}
          handleSave={handleSaveData}
          rawContacts={initialData}
        />
      )}
      <Button
        style={{ margin: '20px 0px' }}
        type='primary'
        onClick={() => setShowModal(true)}
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
        <Popover
          placement='right'
          content={
            <div style={{ padding: '0 20px' }}>
              <p>All: all data will be displayed</p>
              <p>
                Cleaned: contact with duplicated email, phone number will be
                removed
              </p>
              <p>
                Full-filled: contact with missing information will be removed
              </p>
            </div>
          }
          title='HINT'
        >
          <span>
            <QuestionCircleOutlined
              style={{ marginLeft: 10, fontSize: 20, color: 'rgba(0,0,0,0.4)' }}
            />
          </span>
        </Popover>
      </div>
      <Table dataSource={previewData} rowKey={() => nanoid(3)}>
        <Column title='Name' dataIndex='name' key='name' />
        <Column title='Address' dataIndex='address' key='address' />
        <Column title='Phone' dataIndex='phone' key='phone' />
        <Column title='Birth' dataIndex='birth' key='birth' />
        <Column title='Email' dataIndex='email' key='email' />
        <Column title='Birth' dataIndex='birth' key='birth' />
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
