import { ClockCircleOutlined, InfoCircleOutlined, InfoCircleTwoTone } from '@ant-design/icons';
import { Timeline } from 'antd';

export const TimeLineLog = () => {
  return (
    <>
      <Timeline>
        <Timeline.Item dot={<InfoCircleTwoTone className="timeline-icon" />} color="green">
          Create a services site 2015-09-01
        </Timeline.Item>
        <Timeline.Item dot={<InfoCircleOutlined className="timeline-icon" />} color="green">
          Create a services site 2015-09-01
        </Timeline.Item>
        <Timeline.Item dot={<ClockCircleOutlined className="timeline-icon" />}>
          <p>Solve initial network problems 1</p>
          <p>Solve initial network problems 2</p>
          <p>Solve initial network problems 3 2015-09-01</p>
        </Timeline.Item>
        <Timeline.Item dot={<ClockCircleOutlined className="timeline-icon" />}>
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2015-09-01</p>
        </Timeline.Item>
        <Timeline.Item dot={<InfoCircleTwoTone className="timeline-icon" />} >
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2015-09-01</p>
        </Timeline.Item>
        <Timeline.Item dot={<InfoCircleTwoTone className="timeline-icon" />}>
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2015-09-01</p>
        </Timeline.Item>
      </Timeline>
    </>
  );
};
