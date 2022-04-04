import { CompanyTitleDetails } from "@components/company/company-title-details";
import { Col, Row } from "antd";
import { CompanyInfoTabs } from '@components/company/company-info-tabs';
import { useParams } from "react-router-dom";
import { useQueryCompanyById } from "@modules/company/query/company.get";
import { CardImage } from "@components/opportunity/card-image";
import { SkeletonPageDetails } from "@components/skeleton/page-details";
const ViewCompanyDetails = () => {
  const params = useParams();
  const { data, isLoading } = useQueryCompanyById(params.id);

  if (isLoading)
    return <SkeletonPageDetails />;

  return (
    <>
      {data &&
        <>
          <CompanyTitleDetails company={data} />
          <Row gutter={[0, 0]}>
            <Col span={16}>
              <div className="container-content-details-page">
                <CompanyInfoTabs company={data} />
              </div>
            </Col>
            <Col span={8}>
              <div className="container-page">
                <CardImage
                  title={data.name}
                  description1={data.type}
                  description2={data.mobile}
                  email={data.email}
                />
              </div>
            </Col>
          </Row>
        </>
      }
    </>
  )
}

export default ViewCompanyDetails;
