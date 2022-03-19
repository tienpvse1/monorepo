import {
  LayoutOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { PageHeader as RootHeader, Radio, Row, Statistic, Tag } from 'antd';
import { nanoid } from 'nanoid';
interface PageHeaderProps {
  setView: React.Dispatch<
    React.SetStateAction<'kanban' | 'lineChart' | 'pieChart'>
  >;
  view: 'kanban' | 'lineChart' | 'pieChart';
}

export const PageHeader: React.FC<PageHeaderProps> = ({ setView, view }) => {
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
