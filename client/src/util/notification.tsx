import { notification } from 'antd';

export const openNotification = (title = 'Notification', description = '') => {
  notification.open({
    type: 'success',
    message: title,
    description,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};
