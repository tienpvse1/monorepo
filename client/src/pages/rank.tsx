import { PageHeader, Radio, Tabs } from "antd";
import { CompanyRankingTable } from "@components/company/company-ranking-table";
import { CompanyRankingCourse } from "@components/company/company-ranking-course";
import { ContactRankingTable } from "@components/contact/contact-ranking-table";
import { nanoid } from "nanoid";
import { useState } from "react";
import { Is } from "@common/is";
import { FileDoneOutlined, FireOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;
const Rank = () => {
  const [view, setView] = useState<'revenue' | 'courseSold'>('revenue');
  return (
    <div className="container-page">
      <PageHeader
        className='site-page-header'
        onBack={() => window.history.back()}
        title='Rank'
        subTitle='an overview of your work'
        extra={[
          <Radio.Group
            key={nanoid()}
            options={[
              {
                label: (
                  <span>
                   <FireOutlined /> Revenue
                  </span>
                ),
                value: 'revenue'
              },
              {
                label: (
                  <span>
                   <FileDoneOutlined /> Purchased Course
                  </span>
                ),
                value: 'courseSold',
                style: {
                  marginLeft: '10px'
                }
              }
            ]}
            defaultValue={view}
            onChange={(event) => setView(event.target.value)}
            optionType='button'
          />,
        ]}
        footer={
          <>
            <Is condition={view === 'revenue'}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Company" key="1" >
                  <CompanyRankingTable />
                </TabPane>
                <TabPane tab="Contact" key="2" >
                  <ContactRankingTable />
                </TabPane>
              </Tabs>
            </Is>
            <Is condition={view === 'courseSold'}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Company" key="1" >
                  <CompanyRankingCourse />
                </TabPane>
                <TabPane tab="Contact" key="2" >
                  <h1>Contact course </h1>
                </TabPane>
              </Tabs>
            </Is>
          </>
        }
      >
      </PageHeader>
    </div>
  )
}

export default Rank