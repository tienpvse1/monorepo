import { MyForm } from '@components/form/my-form';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { Col, Row } from 'antd';

interface OpportunityInfoTeamProps {
  opportunity: IPipelineItem;
}

export const OpportunityInfoTeam: React.FC<OpportunityInfoTeamProps> = ({
  opportunity,
}) => {
  return (
    <>
      <Row>
        <Col span={12}>
          <MyForm label='Sale Team'>{opportunity.account?.team?.name}</MyForm>
        </Col>
        <Col span={12}>
          <MyForm label='Sale Person'>
            {!opportunity.account
              ? 'Unassigned'
              : `${opportunity.account?.firstName} ${opportunity.account?.lastName}`}
          </MyForm>
        </Col>
      </Row>
    </>
  );
};
