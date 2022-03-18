import { envVars } from "@env/var.env"
import { IContact } from "@modules/contact/entity/contact.entity"
import { Button, Descriptions, PageHeader, Tag } from "antd"

interface PageDetailsTitleProps {
  contact: IContact;
}

export const PageDetailsTitle: React.FC<PageDetailsTitleProps> = ({ contact }) => {
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
                src={`${envVars.VITE_BE_DOMAIN}/files/contact.png`}
                width={47}
                height={47}
              />
              <span>
                {contact.name} <br />
                <Tag color={'purple'}>Contact</Tag>
              </span>
            </span>
          </>
        }
      >
        <Descriptions size='small' column={3}>
          <Descriptions.Item label='Contact Owner'>
            Tien Phan
          </Descriptions.Item>

          <Descriptions.Item label='Phone'>
            {/* {moment(new Date(contact.createdAt)).fromNow()} */}
            {contact.phone}
          </Descriptions.Item>
          <Descriptions.Item label='Email'>
            {contact.email}
          </Descriptions.Item>
          <Descriptions.Item label='Company'>
            AABC company
          </Descriptions.Item>

        </Descriptions>
      </PageHeader>
    </div>
  )
}
