import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { envVars } from '@env/var.env';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import { Button, Descriptions, PageHeader } from 'antd';
import { useNavigate } from 'react-router-dom';

interface PageTitlePipelineProps {
  setModalCreateStage: () => void;
  isRoleAdmin: boolean;
  pipeline: IPipeline;
}

export const PageTitlePipeline: React.FC<PageTitlePipelineProps> = ({
  setModalCreateStage,
  isRoleAdmin,
  pipeline
}) => {
  const navigate = useNavigate();

  var totalOpportunity = pipeline?.pipelineColumns?.reduce((acc, value) => {
    return acc + value.pipelineItems.length
  }, 0)

  return (
    <>
      <PageHeader
        className='site-page-header'
        extra={
          <>
            <Button
              onClick={() => navigate('opportunities-lost')}
              danger
              icon={<DeleteOutlined />}
              className='button-more-pipeline'
            >
              Lost Opportunities
            </Button>
            {isRoleAdmin &&
              <Button
                onClick={setModalCreateStage}
                className='button-create-task-pipeline'
                icon={<PlusOutlined />}
                type='primary'
              >
                Create Stage
              </Button>}
          </>
        }
        title={
          <>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <img
                src={`${envVars.VITE_BE_DOMAIN}/files/branch.png`}
                width={47}
                height={47}
              />
              <span style={{ fontSize: '27px' }}>
                Pipeline
              </span>
            </span>
          </>
        }
      >
        <Descriptions size='small' column={3}>
          <Descriptions.Item label='Total opportunity'>
            {totalOpportunity}
          </Descriptions.Item>

          <Descriptions.Item label='Stages'>
            {pipeline?.pipelineColumns?.length}
          </Descriptions.Item>
          <Descriptions.Item label='Won Opportunity'>
            {pipeline?.pipelineColumns.find((item) => item.isWon).pipelineItems.length}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </>
  );
};
