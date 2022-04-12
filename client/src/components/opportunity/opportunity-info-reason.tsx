import { MyForm } from '@components/form/my-form';
import { IReason } from '@modules/reason/entity/reason.entity'
import { Col, Image, Row, Typography } from 'antd'
const { Paragraph } = Typography;

interface OpportunityInfoReasonProps {
  data: IReason;
}

export const OpportunityInfoReason: React.FC<OpportunityInfoReasonProps> = ({ data }) => {
  return (
    <>
      <Row gutter={[24, 0]}>
        {data?.reasonType == 'win' ? <>
          <Col span={10}>
            <Image
              src={data?.photo}
              width={'100%'}
            />
          </Col>
          <Col span={14} style={{ height: '100%' }}>
            <MyForm fontSizeLabel={'16px'} label='Invoice ID'>
              {data.invoiceId}
            </MyForm>
            <MyForm
              fontSizeLabel={'16px'}
              label='Description'
              customStyle={{ height: '100%' }}
            >
              <Paragraph style={{ marginBottom: 0 }}>
                {data.description}
              </Paragraph>
            </MyForm>
          </Col>
        </> : <>
          <Col span={24} style={{height: '100%'}}>
            <MyForm fontSizeLabel={'16px'} label='Reason Lost'>
              {data?.reason}
            </MyForm>
            <MyForm
              fontSizeLabel={'16px'}
              label='Description'
              customStyle={{ height: '100%' }}
            >
              <Paragraph style={{ marginBottom: 0 }}>
                {data?.description}
              </Paragraph>
            </MyForm>
          </Col>
        </>}
      </Row>
    </>
  )
}
