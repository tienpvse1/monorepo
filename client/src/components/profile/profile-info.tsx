import { Col, Row } from "antd"

interface ProfileInfoProps {
  label: string;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ label, children }) => {
  return (
    <>
      <Row style={{ fontSize: '18px', borderBottom: '1px solid #E0E0E0', paddingBottom: '15px', marginBottom: '15px' }}>
        <Col style={{fontWeight: '500'}} span={8}>
          {label}
        </Col>
        <Col span={16}>
          {children}
        </Col>
      </Row>
    </>
  )
}
