import { MyForm } from "@components/form/my-form";
import { EditButtonHover } from "@components/page-details/edit-button-hover";
import { useToggle } from "@hooks/useToggle";
import { Button, Col, Form, Row, Space } from "antd"
import { CompanyInfoForm } from "./company-info-form";
import { CompanyInfoDetails } from "./company-info-details";
import { CompanyAddressForm } from "./company-address-form";
import { CompanyAddressDetails } from "./company-address-details";
import { CompanyAdditionalForm } from "./company-additional-form";
import { ICompany } from "@modules/company/entity/company.entity";
import { useState } from "react";
import { useUpdateCompany } from "@modules/company/mutation/company.patch";
import { useQueryClient } from "react-query";
import { QUERY_COMPANY_DETAILS } from "@modules/company/query/company.get";
import { message } from "antd";
import moment from "moment";
import { dateFormat } from "@constance/date-format";
const { CRUD_AT } = dateFormat;

interface CompanyDetailsProps {
  company: ICompany;
}

export const CompanyDetails: React.FC<CompanyDetailsProps> = ({
  company
}) => {
  const { mutate: updateCompany } = useUpdateCompany();
  const queryClient = useQueryClient();

  const [isEditingForm1, toggleEditForm1] = useToggle();
  const [isEditingForm2, toggleEditForm2] = useToggle();
  const [isEditingForm3, toggleEditForm3] = useToggle();

  const [regionOther, setRegionOther] = useState(true);

  const [form] = Form.useForm<any>();

  const handleToggleEditForm1 = () => {
    toggleEditForm1();
    form.setFieldsValue({
      name: company.name,
      mobile: company.mobile,
      type: company.type,
      email: company.email
    })
  };

  const handleToggleEditForm2 = () => {
    if (company.country === 'Other') {
      setRegionOther(false);
      form.setFieldsValue({
        region: 'Other',
        city: company.city,
        postalCode: company.postalCode,
        country: company.country,
        website: company.website,
        taxId: company.taxId,
        address: company.address
      })
      toggleEditForm2();
      return;
    }

    form.setFieldsValue({
      cityName: company.city.admin_name,
      cityId: company.city.id,
      postalCode: company.postalCode,
      website: company.website,
      taxId: company.taxId,
      address: company.address
    })
    toggleEditForm2();
  };

  const handleToggleEditForm3 = () => {
    toggleEditForm3();

  };

  const handleSubmitForm1 = async () => {
    try {
      const value = await form.validateFields();
      updateCompany({
        id: company.id,
        ...value
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries(QUERY_COMPANY_DETAILS);
          toggleEditForm1();
          message.success('Saved successfully!');
        }
      })
    } catch (error) {
      return;
    }
  };

  const handleSubmitForm2 = async () => {
    try {
      const value = await form.validateFields();
      const { region, address, cityId, country, city, state, cityName, ...rest } = value;
      updateCompany({
        ...rest,
        id: company.id,
        state: region === 'VN' ? state : address,
        cityId: region === 'VN' ? cityId : city,
        country: region === 'VN' ? region : country,
        address
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries(QUERY_COMPANY_DETAILS);
          toggleEditForm2();
          message.success('Saved successfully!');
        }
      })
    } catch (error) {
      return;
    }
  };
  const handleSubmitForm3 = async () => {
    try {
      const value = await form.validateFields();
      console.log("record:", value);


      toggleEditForm3();
    } catch (error) {
      return;
    }
  };

  return (
    <>
      <Form form={form} layout='vertical'>
        {isEditingForm1 ? (
          <Row gutter={[24, 0]}>
            <CompanyInfoForm />
            <Col style={{ textAlign: 'right' }} span={24}>
              <Space>
                <Button onClick={() => handleSubmitForm1()} type='primary'>
                  Save
                </Button>
                <Button onClick={toggleEditForm1}>Cancel</Button>
              </Space>
            </Col>
          </Row>
        ) : (
          <EditButtonHover toggleEditForm={handleToggleEditForm1}>
            <CompanyInfoDetails company={company} />
          </EditButtonHover>
        )}

        <Row className='title-form-content'>Address Information</Row>
        {isEditingForm2 ? (
          <Row gutter={[24, 0]}>
            <CompanyAddressForm
              form={form}
              cityName={company.city.admin_name}
              defaultToggle={regionOther}
            />
            <Col style={{ textAlign: 'right' }} span={24}>
              <Space>
                <Button onClick={() => handleSubmitForm2()} type='primary'>
                  Save
                </Button>
                <Button onClick={toggleEditForm2}>Cancel</Button>
              </Space>
            </Col>
          </Row>
        ) : (
          <EditButtonHover toggleEditForm={handleToggleEditForm2}>
            <CompanyAddressDetails company={company} />
          </EditButtonHover>
        )}

        <Row className='title-form-content'>Addition Information</Row>
        {isEditingForm3 ? (
          <Row gutter={[24, 0]}>
            <CompanyAdditionalForm />
            <Col style={{ textAlign: 'right' }} span={24}>
              <Space>
                <Button onClick={() => handleSubmitForm3()} type='primary'>
                  Save
                </Button>
                <Button onClick={toggleEditForm3}>Cancel</Button>
              </Space>
            </Col>
          </Row>) : (
          <EditButtonHover toggleEditForm={handleToggleEditForm3}>
            <Row>
              <Col span={24}>
                <MyForm label='Description'>
                  This is description company
                </MyForm>
              </Col>
            </Row>
          </EditButtonHover>
        )}

        <Row className='title-form-content'>System Information</Row>
        <Row>
          <Col span={12}>
            <MyForm label='Created At'>
              {moment(company.createdAt).format(CRUD_AT)}
            </MyForm>
          </Col>
          <Col span={12}>
            <MyForm label='Last Modified At'>
              {moment(company.updatedAt).format(CRUD_AT)}
            </MyForm>
          </Col>
        </Row>
      </Form>
    </>
  )
}
