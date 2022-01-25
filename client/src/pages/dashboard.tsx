import { CardBoard } from '@components/dashboard';
import { DashBoardProgressChart } from '@components/dashboard/progress-chart';
import { DashBoardLineChart } from '@components/dashboard/line-chart';
export const DashBoard = () => {
  return (
    <>
      <div className='dash-board'>
        <div className='container'>
          <CardBoard />
          <h1>{import.meta.env.VITE_APP_NAME}</h1>
          <div className='statistic'>
            <DashBoardLineChart />
            <DashBoardProgressChart />
          </div>
        </div>
      </div>
    </>
  );
};
