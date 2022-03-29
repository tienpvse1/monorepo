import { PageDetailsTitle } from "@components/page-details/page-details-title"
import { useQueryContactsById } from "@modules/contact/query/contact.get";
import { Col, Row  } from "antd"
import { useParams } from 'react-router-dom'
import { ContactInfoTabs } from '@components/contact/contact-info-tabs';
import { CardImage } from "@components/opportunity/card-image";
const ViewContactDetails = () => {
  const params = useParams();
  const { data, isLoading } = useQueryContactsById(params.id);

  // TODO: this skeleton still hard code
  if (isLoading)
    return <div>this is skeleton....</div>;

  return (
    <>
      {data &&
        <>
          <PageDetailsTitle contact={data} />
          <Row gutter={[0, 0]}>
            <Col span={16}>
              <div className="container-content-details-page">
                <ContactInfoTabs data={data} />
              </div>
            </Col>
            <Col span={8}>
              <div className="container-page">
                <CardImage />
              </div>
            </Col>
          </Row>
        </>
      }
    </>
  )
}

export default ViewContactDetails