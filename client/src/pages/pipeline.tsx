import { Outlet } from 'react-router-dom';

interface PipelineProps { }

const Pipeline: React.FC<PipelineProps> = ({ }) => {

  return (
    <Outlet />
  );
};

export default Pipeline;
