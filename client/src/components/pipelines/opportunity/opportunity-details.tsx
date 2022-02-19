import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";
import { Button, Col, Form, Input, Row, Space } from "antd";
import { DescriptionItem } from "./description-item";
import { TimeLineLog } from "../../timeline";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useToggle } from "@hooks/useToggle";
import { useUpdatePipelineItems } from "@modules/pipeline-items/mutation/pipeline-items.update";

interface OpportunityDetailsProps {
  dataCardPipeline: IPipelineItem;
}

export const OpportunityDetails: React.FC<OpportunityDetailsProps> = ({ dataCardPipeline }) => {

  const [showFormEdit, setShowFormEdit] = useToggle();

  const { updatePipelineItemsName } = useUpdatePipelineItems();

  const handleSavePipelineItemsName = (value: IPipelineItem) => {
    updatePipelineItemsName({...value, id: dataCardPipeline.id})
    setShowFormEdit();
  }

  return (
    <>
      <Space>
        {
          showFormEdit ?
            <Form
              initialValues={{ ["name"]: dataCardPipeline.name }}
              onFinish={(value) => handleSavePipelineItemsName(value)}
            >
              <Form.Item style={{ borderBottom: '1px solid' }} name="name">
                <Input
                  onBlur={setShowFormEdit}
                  autoFocus
                  suffix={
                    <Button onMouseDown={(e) => e.preventDefault()} type="text" htmlType="submit">
                      <SaveOutlined />
                    </Button>
                  }
                  className="opportunity-name"
                  bordered={false} />
              </Form.Item>
            </Form> :
            <>
              <h2>{dataCardPipeline.name}</h2>
              <EditOutlined onClick={setShowFormEdit} className="edit-title-opportunity-icon" />
            </>
        }
      </Space>
      <Row gutter={[8, 16]}>
        <Col span={12}>
          <>
            <DescriptionItem title="Customer" content={<p> Mirinda</p>} />
            <DescriptionItem title="Email" content={<p> nghuuchuong@gmail.com</p>} />
            <DescriptionItem title="Phone" content={<p> 0123456789</p>} />
            <DescriptionItem title="Salesperson" content={<p> Mirinda</p>} />
            <DescriptionItem title="Sales Team" content={<p> FPT team</p>} />
          </>
          <Row>
            <Col span={24}>
              {/* <div style={{ backgroundColor: '#0092ff' }}>
                123
              </div> */}
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <TimeLineLog />
        </Col>
      </Row>
    </>
  );
};
