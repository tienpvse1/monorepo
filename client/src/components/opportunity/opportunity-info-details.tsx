import { MyForm } from '@components/form/my-form';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { Col, Row } from 'antd';

interface OpportunityInfoDetailsProps {
  opportunity: IPipelineItem;
}

export const OpportunityInfoDetails: React.FC<OpportunityInfoDetailsProps> = ({
  opportunity,
}) => {
  return (
    <>
      <Row>
        <Col span={12}>
          <MyForm label='Name'>{opportunity.name}</MyForm>
          <MyForm label='Organization / Contact'>
            {opportunity.contact.name}
          </MyForm>
          <MyForm label='Stage'>{opportunity.pipelineColumn.name}</MyForm>
          <MyForm label='Sale Team'>{opportunity.account?.team?.name}</MyForm>
          <MyForm label='Sale Person'>
            {!opportunity.account
              ? 'Unassigned'
              : `${opportunity.account?.username}`}
          </MyForm>

        </Col>
        <Col span={12}>

          <MyForm label='Expected Revenue'>
            {opportunity.expectedRevenue}
          </MyForm>
          <MyForm label='Course name'>
            {/* {opportunity.opportunityRevenue.product.name} */}
          </MyForm>
          <MyForm label='Expected sold quantity'>
            {/* {opportunity.opportunityRevenue.quantity} */}
          </MyForm>
          <MyForm label='Close Date'>{opportunity.expectedClosing}</MyForm>
        </Col>
      </Row>
    </>
  );
};
