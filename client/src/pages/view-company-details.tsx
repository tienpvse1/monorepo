import { CompanyTitleDetails } from "@components/company/company-title-details";
import { Col, Row } from "antd";
import { CompanyInfoTabs } from '@components/company/company-info-tabs';
import { useParams } from "react-router-dom";
import { useQueryCompanyById } from "@modules/company/query/company.get";
import { CardImage } from "@components/opportunity/card-image";

const ViewCompanyDetails = () => {
  const params = useParams();
  const { data, isLoading } = useQueryCompanyById(params.id);

  // TODO: this skeleton still hard code
  if (isLoading)
    return <div>this is skeleton</div>

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
                <CardImage />
              </div>
            </Col>
          </Row>
        </>
      }
    </>
  )
}

export default ViewCompanyDetails;
