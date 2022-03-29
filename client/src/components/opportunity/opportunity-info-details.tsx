import { MyForm } from '@components/form/my-form';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { Badge, Col, Row } from 'antd';

interface OpportunityInfoDetailsProps {
  opportunity: IPipelineItem;
}

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
            {opportunity.contact.name}
          </MyForm>
          <MyForm label='Close Date'>{opportunity.expectedClosing}</MyForm>
        </Col>
        <Col span={12}>
          <MyForm label='Priority'>
            {handlePriority(opportunity.priority)}
          </MyForm>

          <MyForm label='Expected Revenue'>
            {opportunity.expectedRevenue}
          </MyForm>
          <MyForm label='Course name'>
            {/* {opportunity.opportunityRevenue.product.name} */}
          </MyForm>
          <MyForm label='Expected sold quantity'>
            {/* {opportunity.opportunityRevenue.quantity} */}
          </MyForm>
        </Col>
      </Row>
    </>
  );
};
