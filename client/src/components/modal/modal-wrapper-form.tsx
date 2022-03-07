import { Col, Row } from 'antd'

interface WrapperModalFormProps {
  titleName: string;
}

export const WrapperModalForm: React.FC<WrapperModalFormProps> = ({ titleName, children }) => {
  return (
    <>
      <Row>
        <Col className="title-modal-create-content" span={24}>
          <span>{titleName}</span>
        </Col>
        <Col className="modal-create-content" span={24}>
          {children}
        </Col>
      </Row>
    </>
  )
}
