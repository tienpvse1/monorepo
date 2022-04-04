import { Col, Row, Skeleton } from "antd"

export const SkeletonPageDetails = () => {
  return (
    <>
      <div
        className="container-page"
        style={
          {
            height: '175px',
            padding: '25px',
            marginBottom: '25px'
          }
        }
      >
        <Skeleton active avatar paragraph={{ rows: 2 }} />
      </div>
      <Row gutter={[0, 0]}>
        <Col span={16}>
          <div className="container-content-details-page">
            <Skeleton active />
            <Skeleton active paragraph={{ rows: 4 }}/>
          </div>
        </Col>
        <Col span={8}>
          <div className="container-page">
            <div style={{ textAlign: 'center' }}>
              <Skeleton.Avatar
                shape="square"
                style={{ height: '200px', width: '200px' }}
                active
              />
              <Skeleton active paragraph={{ rows: 2, width: 270 }}/>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}
