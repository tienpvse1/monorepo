import { IContact } from '@modules/contact/entity/contact.entity';
import { Tabs } from 'antd'
import { ContactDetails } from './contact-details';
import { ContactNotes } from './contact-notes';
const { TabPane } = Tabs;
interface ContactInfoTabsProps {
  data: IContact;
}

export const ContactInfoTabs: React.FC<ContactInfoTabsProps> = ({ data }) => {

  return (
    <>
      <Tabs size="large" defaultActiveKey="1" >
        <TabPane tab="Details" key="1">
          <ContactDetails contact={data} />
        </TabPane>
        <TabPane tab="Opportunities" key="2">
          This is opportunities of contact will be show in table
        </TabPane>
        <TabPane tab="Notes" key="3">
          <ContactNotes data={data} />
        </TabPane>
      </Tabs>
    </>
  )
}
