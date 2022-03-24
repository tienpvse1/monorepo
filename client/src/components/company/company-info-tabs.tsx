import { ICompany } from "@modules/company/entity/company.entity";
import { Tabs } from "antd"
const { TabPane } = Tabs;
import {CompanyDetails} from "./company-details";

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
        <TabPane tab="Notes" key="2">
          Notes
        </TabPane>
      </Tabs>
    </>
  )
}
