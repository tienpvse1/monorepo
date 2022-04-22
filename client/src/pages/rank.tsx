import { PageHeader, Radio, Tabs } from "antd";
import { CompanyRankingRevenue } from "@components/company/company-ranking-revenue";
import { CompanyRankingCourse } from "@components/company/company-ranking-course";
import { ContactRankingRevenue } from "@components/contact/contact-ranking-revenue";
import { nanoid } from "nanoid";
import { useState } from "react";
import { Is } from "@common/is";
import { FileDoneOutlined, FireOutlined } from "@ant-design/icons";
import { ContactRankingCourse } from "@components/contact/contact-ranking-course";
const { TabPane } = Tabs;
const Rank = () => {
  const [view, setView] = useState<'revenue' | 'courseSold'>('revenue');
  return (
    <div className="container-page">
      <PageHeader
        className='site-page-header'
        onBack={() => window.history.back()}
        title='Ranking'
        subTitle='list of each company, contact by revenue and course'
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
                  <CompanyRankingRevenue />
                </TabPane>
                <TabPane tab="Contact" key="2" >
                  <ContactRankingRevenue />
                </TabPane>
              </Tabs>
            </Is>
            <Is condition={view === 'courseSold'}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Company" key="1" >
                  <CompanyRankingCourse />
                </TabPane>
                <TabPane tab="Contact" key="2" >
                  <ContactRankingCourse />
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