import {
  LayoutOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { PageHeader as RootHeader, Radio, Row, Statistic, Tag } from 'antd';
import { nanoid } from 'nanoid';
interface PageHeaderProps {
  setView: React.Dispatch<
    React.SetStateAction<'kanban' | 'lineChart' | 'pieChart'>
  >;
  view: 'kanban' | 'lineChart' | 'pieChart';
  data: IPipelineItem[][];
}

export const PageHeader: React.FC<PageHeaderProps> = ({ setView, view, data }) => {  
  const newArray = data.filter((_, index) => index >= 1);
  //@ts-ignore
  const rs = [].concat.apply([], newArray)
  const totalRevenue = rs.reduce((acc, value) => acc + value.expectedRevenue, 0)

  return (
    <>
      <RootHeader
        onBack={() => window.history.back()}
        title='Forecast'
        key={nanoid(6)}
        tags={<Tag color='blue'>Running</Tag>}
        subTitle='opportunities revenue forecast'
        extra={[
          <Radio.Group
            key={nanoid()}
            options={[
              {
                label: (
                  <span>
                    <LayoutOutlined />
                    Kanban
                  </span>
                ),
                value: 'kanban',
              },
              {
                label: (
                  <span>
                    <LineChartOutlined /> Line chart
                  </span>
                ),
                value: 'lineChart',
              },
              {
                label: (
                  <span>
                    <PieChartOutlined /> Pie chart
                  </span>
                ),
                value: 'pieChart',
              },
            ]}
            defaultValue={view}
            onChange={(event) => setView(event.target.value)}
            optionType='button'
          />,
        ]}
      >
        <Row>
          <Statistic title='Status' value='Up-to-date' />
          <Statistic
            title='Total'
            suffix='vnd'
            value={totalRevenue}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic
            title='Prorated Revenue'
            suffix='%'
            value={Math.round((totalRevenue - (totalRevenue * 0.06)) / (totalRevenue * 0.06) * 100) / 100}
          />
        </Row>
      </RootHeader>
    </>
  );
};
