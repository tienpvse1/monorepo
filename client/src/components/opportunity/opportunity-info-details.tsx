import { MyForm } from '@components/form/my-form';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { Badge, Col, Row, Tag, Typography } from 'antd';
import numberSeparator from "number-separator";

const { Paragraph } = Typography;

interface OpportunityInfoDetailsProps {
  opportunity: IPipelineItem;
}

export const COURSE_NAME = 'course-name';

export const OpportunityInfoDetails: React.FC<OpportunityInfoDetailsProps> = ({
  opportunity,
}) => {
  const handlePriority = (value: number) => {
    let node = <Badge color={'blue'} text='Low' />;
    switch (value) {
      case 1:
        node = <Badge color={'yellow'} text='Medium' />;
        break;
      case 2:
        node = <Badge color={'red'} text='Important' />;
        break;
    }
    return node;
  }

  return (
    <>
      <Row>
        <Col span={12}>
          <MyForm label='Name'>{opportunity.name}</MyForm>
          <MyForm label='Company Name'>{opportunity.contact?.company?.name}</MyForm>
          <MyForm label='Organization / Contact'>
            {opportunity.contact?.name}
          </MyForm>
          <MyForm label='Close Date'>{opportunity.expectedClosing}</MyForm>
        </Col>
        <Col style={{ height: '100%' }} span={12}>
          <MyForm label='Priority'>
            {handlePriority(opportunity.priority)}
          </MyForm>

          <MyForm label='Expected Revenue'>
            {numberSeparator(opportunity.expectedRevenue, '.')}đ
            {opportunity.discountCode &&
              <Tag
                color={'red'}
                style={{ marginLeft: '5px' }}
              >
                -{`${opportunity.discountCode.discountAmount * 100}`}%
              </Tag>
            }
          </MyForm>
          <MyForm label='Course name' customStyle={{ height: '100%' }}>
            <Paragraph style={{ marginBottom: 0 }}>
              {opportunity.opportunityRevenue.course?.name}
            </Paragraph>
          </MyForm>
          <MyForm label='Expected sold quantity'>
            {opportunity.opportunityRevenue.quantity}
          </MyForm>
        </Col>
      </Row>
    </>
  );
};
