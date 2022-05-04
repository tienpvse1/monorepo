import { Button, Descriptions, PageHeader, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

interface DealHeaderProps {}

export const DealHeader: React.FC<DealHeaderProps> = ({}) => {
  const navigate = useNavigate();
  return (
    <div className='site-page-header-ghost-wrapper'>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title='Statistic'
        subTitle='Sales activity statistic'
        extra={[
          <Button key='3'>Operation</Button>,
          <Button key='2'>Operation</Button>,
          <Button key='1' type='primary'>
            Primary
          </Button>,
        ]}
      >
        <Descriptions size='small' column={3}>
          <Descriptions.Item label='Statistic type'>
            <Select
              style={{
                transform: 'translateY(-10px)',
              }}
              defaultValue='deal'
              onChange={(value) =>
                value === 'contact'
                  ? navigate('/sale-manager/statistic/')
                  : value === 'source'
                  ? navigate('/sale-manager/statistic/source')
                  : value === 'contact-and-company' &&
                    navigate(
                      '/sale-manager/statistic/total-contact-and-company'
                    )
              }
            >
              <Select.Option key='contact'>Contact</Select.Option>
              <Select.Option key='source'>Source</Select.Option>
              <Select.Option key='contact-and-company'>
                Contact and company
              </Select.Option>
            </Select>
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </div>
  );
};
