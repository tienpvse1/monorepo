import { MainPipeline } from "@components/pipelines/main-pipeline";
import { ScheduleContextProvider } from "@context/schedule.context";

interface PipelineProps {

}

const Pipeline: React.FC<PipelineProps> = ({ }) => {

  return (
    <ScheduleContextProvider>
      <MainPipeline />
    </ScheduleContextProvider>
  )
};

export default Pipeline;
