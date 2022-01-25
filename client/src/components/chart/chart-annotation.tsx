import { Col, Row } from "antd"
import { Gutter } from "antd/lib/grid/row"
import { CSSProperties } from "react"

interface GraphAnnotationProps {
  titleDot1: string;
  titleDot2: string;
  styleNameDot1: string;
  styleNameDot2: string;
  styleNameWrapperDot: string;
  gutter?: Gutter | [Gutter, Gutter] | undefined;
  styleWrapperDot1?: CSSProperties;
  styleWrapperDot2?: CSSProperties;
}

export const ChartAnnotation = ({
  titleDot1,
  titleDot2,
  styleNameDot1,
  styleNameDot2,
  styleNameWrapperDot,
  styleWrapperDot1,
  styleWrapperDot2,
  gutter }: GraphAnnotationProps) => {
  return (
    <>
      <Row style={{ width: '100%' }} gutter={gutter}>
        <Col style={styleWrapperDot1} className={styleNameWrapperDot} span={12} >
          <div className={styleNameDot1}></div>
          <span className='title'>{titleDot1} </span>
        </Col>
        <Col style={styleWrapperDot2} className={styleNameWrapperDot} span={12}>
          <div className={styleNameDot2}></div>
          <span className='title'>{titleDot2}</span>
        </Col>
      </Row>
    </>
  )
}
