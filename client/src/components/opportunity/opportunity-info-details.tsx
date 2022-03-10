import { MyForm } from '@components/form/my-form'
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { Col, Row } from 'antd'

interface OpportunityInfoDetailsProps {
  opportunity: IPipelineItem;
}

export const OpportunityInfoDetails: React.FC<OpportunityInfoDetailsProps> = ({ opportunity }) => {
  return (
    <>
      <Row>
        <Col span={12}>
          <MyForm label="Name">
            {opportunity.name}
          </MyForm>
          <MyForm label="Opportunity Owner">
            {/* //TODO this Opportunity Owner still hard code */}
            Chuong Nguyen (Sample)
          </MyForm>
          <MyForm label="Organization / Contact">
            MyMy
          </MyForm>
          <MyForm label="Close Date">
            {opportunity.expectedClosing}
          </MyForm>

        </Col>
        <Col span={12}>
          <MyForm label="Stage">
            {opportunity.pipelineColumn.name}
          </MyForm>
          <MyForm label="Expected Revenue">
            {opportunity.expectedRevenue}
          </MyForm>
          <MyForm label="Product name">
            Khoa hoc 1
          </MyForm>
          <MyForm label="Expected sold quantity">
            1
          </MyForm>
        </Col>
      </Row>
    </>
  )
}
