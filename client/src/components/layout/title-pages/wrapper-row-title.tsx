import { Col, Row } from 'antd'
import { FC, ReactNode } from 'react'

interface WrapperRowTitleProps {
  title: string;
  children?: ReactNode;
  titleSize: string;
  className: string;
}

export const WrapperRowTitle: FC<WrapperRowTitleProps> = ({ children, title, titleSize, className }) => {
  return (
    <>
      <Row>
        <Col className={className} span={24} >
          <span style={{ fontSize: `${titleSize}` }} className="title-admin-page">{title}</span>
          {children}
        </Col>
      </Row>
    </>
  )
}
