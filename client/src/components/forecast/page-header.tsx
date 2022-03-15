import {
  LayoutOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { PageHeader as RootHeader, Radio, Row, Statistic, Tag } from 'antd';
interface PageHeaderProps {
  setView: React.Dispatch<
    React.SetStateAction<'kanban' | 'lineChart' | 'pieChart'>
  >;
  view: 'kanban' | 'lineChart' | 'pieChart';
  data: IPipelineItem[][];
}

export const PageHeader: React.FC<PageHeaderProps> = ({ setView, view }) => {
  return (
    <>
      <RootHeader
        onBack={() => window.history.back()}
        title='Forecast'
        tags={<Tag color='blue'>Running</Tag>}
        subTitle='opportunities revenue forecast'
        extra={[
          <Radio.Group
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
            prefix='$'
            value={10568.08}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic title='Prorated Revenue' prefix='$' value={3345.08} />
        </Row>
      </RootHeader>
    </>
  );
};
