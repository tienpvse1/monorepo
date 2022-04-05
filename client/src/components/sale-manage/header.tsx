import { PlusOutlined } from '@ant-design/icons';
import { CreateModal } from '@components/modal/create-modal';
import { useToggle } from '@hooks/useToggle';
import { useCreateTeam } from '@modules/team/mutate/team.post';
import { Button, Form, Input, message, PageHeader, Tag } from 'antd';
import { Dispatch, SetStateAction } from 'react';

interface SaleManageHeaderProps {
  setReload: Dispatch<SetStateAction<boolean>>;
}

export const SaleManageHeader: React.FC<SaleManageHeaderProps> = ({ setReload }) => {
  const [isVisible, toggleModal] = useToggle();
  const { mutate: createTeam } = useCreateTeam();

  const handleSubmit = (record: any) => {
    createTeam(record.name, {
      onSuccess: () => {
        message.success('Created team successfully !');
        setReload(true);
      }
    })
  }

  return (
    <>
      <PageHeader
        style={{ padding: '10px' }}
        className='site-page-header'
        onBack={() => window.history.back()}
        extra={
          <>
            <Button
              className='button-ant-custom-style'
              type='primary'
              icon={<PlusOutlined />}
              onClick={toggleModal}
            >
              New Team
            </Button>
          </>
        }
        title={
          <>
            <h2 style={{ fontSize: 23 }} >
              Sale Manage
            </h2>
            <Tag color={'volcano'}>Opportunity</Tag>
            <Tag color={'cyan'}>Sales</Tag>
            <Tag color={'volcano'}>Manage</Tag>
          </>
        }
      ></PageHeader>
      <CreateModal
        width={500}
        bodyStyle={{ height: '150px' }}
        title='New Team'
        isOpenModal={isVisible}
        toggleCreateModal={toggleModal}
        callback={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Name:"
          required
        >
          <Input />
        </Form.Item>
      </CreateModal>
    </>
  );
};
