import { ChartData } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';

/* eslint-disable-next-line */
export interface GraphNumbersOfStepsProps {
  updateResize: boolean;
  data: ChartData;
  options: ChartOptions;
  languageChanged: boolean;
}

export function GraphNumbersOfSteps(props: GraphNumbersOfStepsProps) {
  const [chartData, setChartData] = useState<ChartData>(props.data);
  const [chartOptions, setChartOptions] = useState<ChartOptions>(props.options);

  useEffect(() => {
    setChartData(props.data);
    setChartOptions(props.options);
  }, [props.languageChanged, props.updateResize]);
  return <Chart type="bar" data={chartData} options={chartOptions} />;
}

export default GraphNumbersOfSteps;
