import { showDeleteConfirm } from "@components/modal/delete-confirm";
import { envVars } from "@env/var.env"
import { useHandleNavigate } from "@hooks/useHandleNavigate";
import { IContact } from "@modules/contact/entity/contact.entity"
import { useDeleteContact } from "@modules/contact/mutation/contact.delete";
import { Button, Descriptions, PageHeader, Tag } from "antd"
import { useNavigate } from "react-router-dom";

interface PageDetailsTitleProps {
  contact: IContact;
}

export const PageDetailsTitle: React.FC<PageDetailsTitleProps> = ({ contact }) => {

  const navigate = useNavigate();
  const { navigateRole } = useHandleNavigate();

  const { mutate: deleteContact } = useDeleteContact(() => {
    navigate(`${navigateRole}contact`);
  });

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
              onClick={() => showDeleteConfirm(() => deleteContact(contact.id))}
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
          <Descriptions.Item label='Created by'>
            {contact.account?.firstName} {contact.account?.lastName}
          </Descriptions.Item>
          <Descriptions.Item label='Email'>
            {contact.email}
          </Descriptions.Item>
          <Descriptions.Item label='Phone'>
            {contact.phone}
          </Descriptions.Item>
          <Descriptions.Item label='Company'>
            {contact.company.name}
          </Descriptions.Item>

        </Descriptions>
      </PageHeader>
    </div>
  )
}
