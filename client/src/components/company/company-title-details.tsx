import { envVars } from '@env/var.env'
import { Button, Descriptions, PageHeader, Tag } from 'antd'

export const CompanyTitleDetails = () => {
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
                Company AABC (Sample) <br />
                <Tag color={'volcano'}>Company</Tag>
              </span>
            </span>
          </>
        }
      >
        <Descriptions size='small' column={3}>
          <Descriptions.Item label='Type'>
            Type 1
          </Descriptions.Item>
          <Descriptions.Item label='Phone'>
            0909070655
          </Descriptions.Item>
          <Descriptions.Item label='Email'>
            company@gmail.com
          </Descriptions.Item>
          <Descriptions.Item label='Company name'>
            AABC company
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </div>

  )
}
