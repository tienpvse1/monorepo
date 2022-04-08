import { PageDetailsTitle } from '@components/page-details/page-details-title';
import { useQueryContactsById } from '@modules/contact/query/contact.get';
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { ContactInfoTabs } from '@components/contact/contact-info-tabs';
import { CardImage } from '@components/opportunity/card-image';
import { SkeletonPageDetails } from '@components/skeleton/page-details';
const ViewContactDetails = () => {
  const params = useParams();
  const { data, isLoading } = useQueryContactsById(params.id);

  if (isLoading) return <SkeletonPageDetails />;

  return (
    <>
      {data && (
        <>
          <PageDetailsTitle contact={data} />
          <Row gutter={[0, 0]}>
            <Col span={16}>
              <div className='container-content-details-page'>
                <ContactInfoTabs data={data} />
              </div>
            </Col>
            <Col span={8}>
              <div className='container-page'>
                <CardImage
                  title={data.name}
                  description1={data.jobPosition}
                  description2={data.phone}
                  email={data.email}
                  photo={data.photo}
                />
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ViewContactDetails;
