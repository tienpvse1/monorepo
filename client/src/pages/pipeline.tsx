import { PipelineSale } from '@components/sale/pipeline-sale';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useCookies } from 'react-cookie';
import PipelineAdmin from '@components/admin/pipeline-admin';

interface PipelineProps { }

const Pipeline: React.FC<PipelineProps> = ({ }) => {

  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);

  if(public_user_info.role.name === 'accountant')
    return <PipelineAdmin />;

  return (
    <PipelineSale />
  );
};

export default Pipeline;
