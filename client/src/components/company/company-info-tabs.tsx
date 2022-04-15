import { ICompany } from "@modules/company/entity/company.entity";
import { Tabs } from "antd"
const { TabPane } = Tabs;
import { CompanyDetails } from "./company-details";
import { ListContactsOfCompany } from "@components/company/list-contacts-of-company";
interface CompanyInfoTabsProps {
  company: ICompany;
}

export const CompanyInfoTabs: React.FC<CompanyInfoTabsProps> = ({
  company
}) => {
  return (
    <>
      <Tabs size="large" defaultActiveKey="1" >
        <TabPane tab="Details" key="1">
          <CompanyDetails company={company} />
        </TabPane>
        <TabPane tab="Contacts" key="2">
          <ListContactsOfCompany dataSource={company.contacts}/>
        </TabPane>
        {/* <TabPane tab="Notes" key="3">
          Notes
        </TabPane> */}
      </Tabs>
    </>
  )
}
