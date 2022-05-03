import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

interface showDeleteConfirmProps {
  opportunityQty: number;
  expectedRevenue: string;
}

export const showDeleteConfirm = (callback: () => void, value?: showDeleteConfirmProps) => {
  confirm({
    title: 'Are you sure want to delete ?',
    icon: <ExclamationCircleOutlined />,
    content: value.expectedRevenue ? <>
      <h3>Stage Dependencies:</h3>
      Opportunity: {value.opportunityQty} <br />
      Expected Revenue: {value.expectedRevenue}đ
    </> : '',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() { callback() },
    onCancel() { },
  })
};
