import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";
import { Col, Row } from "antd";
import { DescriptionItem } from "./description-item";
import { TimeLineLog } from "../../timeline";

interface OpportunityDetailsProps {
  dataCardPipeline: IPipelineItem;
}

export const OpportunityDetails: React.FC<OpportunityDetailsProps> = ({ dataCardPipeline }) => {
  return (
    <>
      <h2>{dataCardPipeline.name}</h2>
      <Row gutter={[8, 16]}>
        <Col span={12}>
          <div>
            <DescriptionItem title="Customer" content={<p> Mirinda</p>} />
            <DescriptionItem title="Email" content={<p> nghuuchuong@gmail.com</p>} />
            <DescriptionItem title="Phone" content={<p> 0123456789</p>} />
            <DescriptionItem title="Salesperson" content={<p> Mirinda</p>} />
            <DescriptionItem title="Sales Team" content={<p> FPT team</p>} />
          </div>
          <Row>
            <Col span={24}>
              <div style={{ backgroundColor: '#0092ff' }}>
                123
              </div>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <TimeLineLog />
        </Col>
      </Row>
    </>
  );
};
