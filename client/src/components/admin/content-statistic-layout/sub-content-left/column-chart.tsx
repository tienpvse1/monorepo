import { ChartAnnotation } from "@components/chart/chart-annotation";
import { ChartColumn } from "@components/chart/chart-column";
import { WrapperRowTitle } from "@components/layout/title-pages/wrapper-row-title";

export const AdminColumnChart = () => {
  return (
    <>
      <WrapperRowTitle
        className="wrapper-title-page"
        title="Claims Over The Years"
        titleSize="21px"
        children={
          <ChartAnnotation
            titleDot1="Approved"
            titleDot2="Submitted"
            styleNameDot1="chart-dot-1"
            styleNameDot2="chart-dot-2"
            styleNameWrapperDot="graph-annotation"
          />}
      />
      <ChartColumn />
    </>
  )

};
