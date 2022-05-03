import { FacebookFilled, YoutubeFilled, CoffeeOutlined, PhoneOutlined, UsergroupAddOutlined, NotificationOutlined, TwitterOutlined, InstagramOutlined } from "@ant-design/icons";

interface TypeOfSourceProps {
  type: string;
}

export const TypeOfSource: React.FC<TypeOfSourceProps> = ({ type }) => {
  if (type === 'Facebook')
    return <><FacebookFilled /> Facebook</>;
  if (type === 'DirectMeeting')
    return <><CoffeeOutlined /> Direct Meeting</>
  if (type === 'Phone')
    return <><PhoneOutlined /> Phone</>
  if (type === 'Presenter')
    return <><UsergroupAddOutlined /> Presenter</>
  if (type === 'Advertisement')
    return <><NotificationOutlined /> Advertisement</>
  if (type === 'Twitter')
    return <><TwitterOutlined /> Twitter</>
  if (type === 'Instagram')
    return <><InstagramOutlined /> Instagram</>
  if (type === 'Youtube')
    return <><YoutubeFilled /> Youtube</>

  return (
    <>Other</>
  )
}
