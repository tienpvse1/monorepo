import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export const showDeleteConfirm = (callback: () => void) => {
  confirm({
    title: 'Are you sure want to delete ?',
    icon: <ExclamationCircleOutlined />,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() { callback() },
    onCancel() {},
  })
};
