import { ISchedule } from '@modules/schedule/entity/schedule.entity';
import { INotification } from '@modules/notification/entity/notification.entity';
import { useTimer } from 'react-timer-hook';
import { CRM_BOT } from '@constance/crm-bot';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useCookies } from 'react-cookie';
import { IAccount } from '@interfaces/account';
import { nanoid } from 'nanoid';
import moment from 'moment';
interface NotificationTimeProps {
  data: ISchedule;
  pushNotification: (data: INotification) => void;
}

export const NotificationTime: React.FC<NotificationTimeProps> = ({
  data,
  pushNotification,
}) => {
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);
  useTimer({
    expiryTimestamp: moment(new Date(data.dueDate))
      .subtract(1, 'minute')
      .toDate(),
    onExpire: () =>
      pushNotification({
        sender: CRM_BOT as IAccount,
        receiver: public_user_info,
        createdAt: new Date(),
        deletedAt: null,
        description: 'You have an event need to take action',
        id: nanoid(5),
        name: 'Remind',
        seen: false,
        updatedAt: new Date(),
      }),
  });
  return <></>;
};
