import { Tabs } from "antd"
const { TabPane } = Tabs;

export const CompanyInfoTabs = () => {
  return (
    <>
      <Tabs size="large" defaultActiveKey="1" >
        <TabPane tab="Details" key="1">
          Details
        </TabPane>
        <TabPane tab="Tasks" key="2">
          Tasks
        </TabPane>
        <TabPane tab="Notes" key="3">
          Notes
        </TabPane>
      </Tabs>
    </>
  )
}
