import { CreateContactDto } from '@modules/contact/dto/create-contact.dto';
import { useBulkInsertContact } from '@modules/contact/mutation/contact.post';
import { Button, notification, Table } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

const { Column } = Table;
interface PreviewTableProps {
  previewData: CreateContactDto[];
  setPreviewData: Dispatch<SetStateAction<CreateContactDto[]>>;
}

const PreviewTable: React.FC<PreviewTableProps> = ({
  previewData,
  setPreviewData,
}) => {
  const { mutate } = useBulkInsertContact();
  const navigate = useNavigate();
  const handleImport = () => {
    mutate(
      {
        bulk: previewData,
      },
      {
        onSuccess: () => {
          navigate('/contact');
        },
        onError: () => {
          notification.error({
            message: 'Error',
            description: 'Cannot import these contacts',
          });
        },
      }
    );
  };
  const handleRemove = (id: string) => {
    setPreviewData((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          style={{
            margin: 20,
            marginRight: 50,
          }}
          type='primary'
          onClick={() => handleImport()}
        >
          Start import
        </Button>
      </div>
      <Table dataSource={previewData} rowKey={(row) => row.id}>
        <Column title='Name' dataIndex='name' key='name' />
        <Column title='Email' dataIndex='email' key='email' />
        <Column title='Photo' dataIndex='photo' key='photo' />
        <Column title='Address' dataIndex='address' key='address' />
        <Column
          title='Job position'
          dataIndex='jobPosition'
          key='jobPosition'
        />
        <Column
          title='Internal note'
          dataIndex='internalNotes'
          key='internalNotes'
        />
        <Column
          title='Action'
          key='action'
          render={(_, record: CreateContactDto) => (
            <Button onClick={() => handleRemove(record.id)} danger>
              Remove
            </Button>
          )}
        />
      </Table>
    </>
  );
};

export default PreviewTable;
