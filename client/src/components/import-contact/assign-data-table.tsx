import { CreateContactDto } from '@modules/contact/dto/create-contact.dto';
import { IContact } from '@modules/contact/entity/contact.entity';
import { Button, Checkbox, Form, Select, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { nanoid } from 'nanoid';
import { Dispatch, FC, SetStateAction, useState } from 'react';

interface PreviewContactTableProps {
  contacts: Partial<CreateContactDto>[];
  setPreviewContacts: Dispatch<SetStateAction<CreateContactDto[]>>;
}

export enum Types {
  ALL = 'all',
  CLEANED = 'cleaned',
  FULL_FILLED = 'full-filled',
}
const contactsKeys = [
  'name',
  'birth',
  'phone',
  'email',
  'address',
  'photo',
  'jobPosition',
  'description',
];
const AssignDataTable: FC<PreviewContactTableProps> = ({
  contacts,
  setPreviewContacts,
}) => {
  const [selected, setSelected] = useState<{ key: string; index: number }[]>(
    []
  );
  const keys: { key: string; index: number }[] = Object.getOwnPropertyNames(
    contacts[0]
  )
    .map((item, index) => ({
      key: item,
      index,
    }))
    .filter((item) => item.key !== '__rowNum__' && item.key !== 'id');
  // const { mutate, isSuccess } = useBulkInsertContact();

  // const handleSaveData = (contactData: CreateContactDto[]) => {
  //   const data = {
  //     bulk: contactData.map((item) => {
  //       // @ts-ignore
  //       const { id, ...rest } = item;
  //       return rest;
  //     }),
  //   };
  //   mutate(data);
  // };
  const getOriginalField = (list: [string, string][], item: string) => {
    try {
      const result = list.filter((pair) => pair[1] === item)[0][0] || '';
      return result;
    } catch (error) {
      return '';
    }
  };
  const handleSubmit = (value: any) => {
    const contactList: CreateContactDto[] = contacts.map((item) => ({
      companyName: '',
      address: item[getOriginalField(Object.entries(value), 'address')] || '',
      name: item[getOriginalField(Object.entries(value), 'name')] || '',
      birth: item[getOriginalField(Object.entries(value), 'birth')] || '',
      phone: item[getOriginalField(Object.entries(value), 'phone')] || '',
      photo: item[getOriginalField(Object.entries(value), 'photo')] || '',
      email: item[getOriginalField(Object.entries(value), 'email')] || '',
      jobPosition:
        item[getOriginalField(Object.entries(value), 'jobPosition')] || '',
      internalNotes:
        item[getOriginalField(Object.entries(value), 'description')] || '',
    }));
    setPreviewContacts(
      contactList.map((item) => ({
        ...item,
        id: nanoid(5),
      }))
    );
  };
  const [form] = Form.useForm();
  return (
    <>
      <Form form={form} onFinish={(value) => handleSubmit(value)}>
        <Table dataSource={keys} rowKey={(record) => record.index}>
          <Column
            title='Column header from your file'
            key='headerName'
            width={170}
            render={(_text: string, _record: IContact, index: number) => (
              <span>{keys[index].key}</span>
            )}
          />
          <Column
            title='Values'
            key='value'
            render={(_text: string, _: IContact, index: number) => (
              <>
                {contacts
                  .filter((_, index) => index < 3)
                  .map((contact) => (
                    <div key={contact.id}>{contact[keys[index].key]}</div>
                    // {key: 'name', index: 0}
                  ))}
                {contacts.length > 3 && <div>...</div>}
              </>
            )}
          />
          <Column
            title='Information'
            dataIndex='information'
            render={(_, record: { index: number; key: string }, index) => (
              <Form.Item
                name={record.key}
                rules={[
                  {
                    required: true,
                    message: 'check this',
                  },
                ]}
              >
                <Select
                  onSelect={(value: string) =>
                    setSelected((prev) => {
                      const item = prev.filter(
                        (prevItem) => prevItem.index === index
                      );
                      if (item.length > 0) {
                        return prev.map((item) =>
                          item.index === index ? { ...item, key: value } : item
                        );
                      }
                      return [
                        ...prev,
                        {
                          index: index,
                          key: value,
                        },
                      ];
                    })
                  }
                  style={{ width: 120 }}
                  allowClear
                  onDeselect={(e: string) =>
                    setSelected((prev) => prev.filter((item) => item.key !== e))
                  }
                >
                  {contactsKeys.map((key) => (
                    <Select.Option
                      key={key}
                      disabled={selected.some(
                        (item) => item.key === key && index !== item.index
                      )}
                      value={key}
                    >
                      {key}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          />
          <Column
            title='Ignore'
            key='ignore'
            render={() => <Checkbox></Checkbox>}
          />
        </Table>
      </Form>
      <Button onClick={() => form.submit()}>Next</Button>
    </>
  );
};

export default AssignDataTable;
