import { DeleteOutlined, FilterOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { envVars } from '@env/var.env';
import { useDebouncedValue } from '@mantine/hooks';
import { useCompaniesById } from '@modules/company/query/company.get';
import { IContact } from '@modules/contact/entity/contact.entity';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import { Button, Descriptions, Form, Input, PageHeader, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
const { Option } = Select;
import { useNavigate } from 'react-router-dom';

interface PageTitlePipelineProps {
  setModalCreateStage: () => void;
  isRoleAdmin: boolean;
  pipeline: IPipeline;
  accountId: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export const PageTitlePipeline: React.FC<PageTitlePipelineProps> = ({
  setModalCreateStage,
  isRoleAdmin,
  pipeline,
  accountId,
  setSearchText

}) => {
  const navigate = useNavigate();
  const { data } = useCompaniesById(accountId);
  const [dataContact, setDataContact] = useState<IContact[]>([]);
  const [valueContact, setValueContact] = useState(null);
  const isMounted = useRef(false);
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 400);

  const [form] = Form.useForm();

  useEffect(() => {
    if (isMounted.current) {
      setSearchText(debounced)
    } else {
      isMounted.current = true;
    }
  }, [debounced])


  var totalOpportunity = pipeline?.pipelineColumns?.reduce((acc, value) => {
    return acc + value.pipelineItems.length
  }, 0)

  const handleSelectedCompany = (companyName: string) => {
    const dataFind = data?.find((value) => companyName === value.name);
    setDataContact(dataFind?.contacts);
    setSearchText(companyName);
    if (companyName === '') {
      setValueContact(null)
      // form.setFieldsValue({ inputSearchPi: '' })
    }
      
  }

  const handleSelectedContact = (contactName: string) => {
    setValueContact(contactName);
    setSearchText(contactName);
    form.setFieldsValue({ inputSearchPi: '' })
  }

  return (
    <Form form={form}>
      <PageHeader
        className='site-page-header'
        extra={
          <div>
            <Button
              onClick={() => navigate('opportunities-lost')}
              danger
              icon={<DeleteOutlined />}
              className='button-more-pipeline'
            >
              Lost Opportunities
            </Button>

            {isRoleAdmin &&
              <Button
                onClick={setModalCreateStage}
                className='button-create-task-pipeline'
                icon={<PlusOutlined />}
                type='primary'
              >
                Create Stage
              </Button>}
          </div>
        }
        title={
          <>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <img
                src={`${envVars.VITE_BE_DOMAIN}/files/branch.png`}
                width={47}
                height={47}
              />
              <span style={{ fontSize: '27px' }}>
                Pipeline
              </span>
            </span>
          </>
        }
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '65%' }}>
            <Descriptions size='middle' labelStyle={{ fontSize: '16px' }} column={3}>
              <Descriptions.Item label='Total opportunity'>
                {totalOpportunity}
              </Descriptions.Item>
              <Descriptions.Item label='Won Opportunity'>
                {(pipeline?.pipelineColumns?.find((item) => item.isWon)?.pipelineItems?.length) || 0}
              </Descriptions.Item>
              <Descriptions.Item label='Stages'>
                {pipeline?.pipelineColumns?.length}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <Form.Item name='inputSearchPi' style={{ margin: 0 }}>
                <Input
                  className='input-search-pipeline'
                  onChange={(event) => setValue(event.currentTarget.value)}
                  value={value}
                  placeholder='Search for name opportunity'
                  size="small"
                  style={{ borderRadius: '10px', width: '270px', height: '40px', float: 'right' }}
                  suffix={
                    <Button
                      shape="circle"
                      icon={<SearchOutlined />}
                      style={{ borderStyle: 'none' }} />
                  }
                  allowClear
                />
              </Form.Item>
            </div>
            <div style={{ marginTop: '10px' }}>
              <FilterOutlined style={{ fontSize: '18px' }} />: {'  '}
              <Select
                style={{ width: '150px' }}
                placeholder='by company'
                showSearch
                onChange={handleSelectedCompany}
              >
                <Option value='' key=''>None</Option>
                {data?.map((company) => (
                  <Option value={company.name} key={company.name}>{company.name}</Option>
                ))}
              </Select>
              <Select
                style={{ width: '150px', marginLeft: '5px' }}
                placeholder='by contact'
                showSearch
                value={valueContact}
                onChange={handleSelectedContact}
              >
                {dataContact?.map((contact) => (
                  <Option value={contact.name} key={contact.name}>{contact.name}</Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </PageHeader>
    </Form>
  );
};
