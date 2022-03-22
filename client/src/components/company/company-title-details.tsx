import { envVars } from '@env/var.env'
import { ICompany } from '@modules/company/entity/company.entity'
import { Button, Descriptions, PageHeader, Tag } from 'antd'

interface CompanyTitleDetailsProps {
  company: ICompany;
}

export const CompanyTitleDetails: React.FC<CompanyTitleDetailsProps> = ({
  company
}) => {
  return (
    <div className="container-title-details">
      <PageHeader
        className='site-page-header'
        onBack={() => window.history.back()}
        extra={
          <>
            <Button
              className='button-ant-custom-style'
              type='primary'
              size='middle'
            >
              Delete
            </Button>
          </>
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
                src={`${envVars.VITE_BE_DOMAIN}/files/enterprise.png`}
                width={47}
                height={47}
              />
              <span>
                {company.name} <br />
                <Tag color={'volcano'}>Company</Tag>
              </span>
            </span>
          </>
        }
      >
        <Descriptions size='small' column={3}>
          <Descriptions.Item label='Type'>
            {company.type}
          </Descriptions.Item>
          <Descriptions.Item label='Phone'>
            {company.mobile}
          </Descriptions.Item>
          <Descriptions.Item label='Email'>
            company@gmail.com
          </Descriptions.Item>
          <Descriptions.Item label='Company name'>
            {company.name}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </div>

  )
}
