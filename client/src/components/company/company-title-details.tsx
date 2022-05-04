import { showDeleteConfirm } from '@components/modal/delete-confirm';
import { envVars } from '@env/var.env'
import { useHandleNavigate } from '@hooks/useHandleNavigate';
import { ICompany } from '@modules/company/entity/company.entity'
import { useDeleteCompany } from '@modules/company/mutation/company.delete';
import { Button, Descriptions, PageHeader, Tag } from 'antd'
import { useNavigate } from 'react-router-dom';
import { TypeOfSource } from './type-of-source';

interface CompanyTitleDetailsProps {
  company: ICompany;
}

export const CompanyTitleDetails: React.FC<CompanyTitleDetailsProps> = ({
  company
}) => {
  const { mutate: deleteCompany } = useDeleteCompany();
  const { navigateRole } = useHandleNavigate();
  const navigate = useNavigate();

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
              onClick={() => showDeleteConfirm(() => deleteCompany(company.id, {
                onSuccess: () => {
                  navigate(`${navigateRole}company`)
                }
              }))}
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
          <Descriptions.Item label='Source Info'>
            {company.source}
          </Descriptions.Item>
          <Descriptions.Item label='Phone'>
            {company.mobile}
          </Descriptions.Item>
          <Descriptions.Item label='Email'>
            {company.email}
          </Descriptions.Item>
          <Descriptions.Item label='Company name'>
            {company.name}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </div>

  )
}
