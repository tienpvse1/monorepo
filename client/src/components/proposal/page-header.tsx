import { PageHeader, Tag } from "antd"

export const PageHeaderProposal = () => {
  return (
    <PageHeader
      className='site-page-header'
      subTitle='Suggested list of renew courses for those that are close to expiration'
      onBack={() => window.history.back()}
      title={
        <>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span>
              Customer<br />
              <Tag color={'red'}>Course</Tag>
            </span>
          </span>
        </>
      }
    >

    </PageHeader>
  )
}
