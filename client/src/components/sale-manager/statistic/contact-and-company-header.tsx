import { Descriptions, PageHeader, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

interface ContactAndCompanyHeaderProps {}

export const ContactAndCompanyHeader: React.FC<
  ContactAndCompanyHeaderProps
> = ({}) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='site-page-header-ghost-wrapper'>
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title='Statistic'
          subTitle='Sales activity statistic'
        >
          <Descriptions size='small' column={3}>
            <Descriptions.Item label='Statistic type'>
              <Select
                style={{
                  transform: 'translateY(-10px)',
                }}
                defaultValue='contacts'
                onChange={(value) =>
                  value === 'deal'
                    ? navigate('/sale-manager/statistic/deal')
                    : value === 'source'
                    ? navigate('/sale-manager/statistic/source')
                    : value === 'contact' && navigate('/sale-manager/statistic')
                }
              >
                <Select.Option key='contact'>Contact</Select.Option>
                <Select.Option key='deal'>Deals</Select.Option>
                <Select.Option key='source'>Source</Select.Option>
              </Select>
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </div>
    </div>
  );
};
