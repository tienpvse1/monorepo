import { useCompanies } from '@modules/company/query/company.get';
import { CreateContactDto } from '@modules/contact/dto/create-contact.dto';
import { useBulkInsertContact } from '@modules/contact/mutation/contact.post';
import { AutoComplete, Button, notification, Table } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';
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
  const { data } = useCompanies();
  const [currentCompany, setCurrentCompany] = useState(null);
  const handleImport = () => {
    if (!currentCompany) alert('please choose an company');
    mutate(
      {
        bulk: previewData.map((item) => ({
          ...item,
          companyName: currentCompany,
        })),
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
        <div>
          <AutoComplete
            style={{ width: 200, transform: 'translateY(17px)' }}
            placeholder='input here'
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            options={data?.map((company) => ({
              value: company.name,
            }))}
            onChange={(value) => setCurrentCompany(value)}
          />
        </div>

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
