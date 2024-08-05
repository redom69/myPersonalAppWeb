import { ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';

export interface GraphDistributionOfTheStepsPerformedOnTheLastDayProps {
  updateResize: boolean;
  data: ChartData;
  options: ChartOptions;
  languageChanged: boolean;
}

export function GraphDistributionOfTheStepsPerformedOnTheLastDay(
  props: GraphDistributionOfTheStepsPerformedOnTheLastDayProps,
) {
  const [chartData, setChartData] = useState<ChartData>(props.data);
  const [chartOptions, setChartOptions] = useState<ChartOptions>(props.options);

  useEffect(() => {
    setChartData(props.data);
    setChartOptions(props.options);
  }, [props.languageChanged, props.updateResize]);

  return (
    <div className="flex justify-content-center">
      <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        className="w-30rem text-2xl"
      />
    </div>
  );
}

export default GraphDistributionOfTheStepsPerformedOnTheLastDay;
