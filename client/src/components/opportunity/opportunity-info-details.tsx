import { MyForm } from '@components/form/my-form';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { getCoursesById } from '@modules/product/query/products.get';
import { Badge, Col, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
const { Paragraph } = Typography;

interface OpportunityInfoDetailsProps {
  opportunity: IPipelineItem;
}

export const OpportunityInfoDetails: React.FC<OpportunityInfoDetailsProps> = ({
  opportunity,
}) => {

  const [courseName, setCourseName] = useState<string>();

  useEffect(() => {
    getCoursesById(opportunity.opportunityRevenue.courseId)
      .then((value) => setCourseName(value.data[0].name))
  }, [])

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
            {opportunity.expectedRevenue}
          </MyForm>
          <MyForm label='Course name' customStyle={{ height: '100%' }}>
            <Paragraph style={{ marginBottom: 0 }}>
              {courseName}
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
