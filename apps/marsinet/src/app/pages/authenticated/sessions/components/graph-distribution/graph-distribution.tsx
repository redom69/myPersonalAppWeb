import { ChartData, ChartOptions } from 'chart.js';
import { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';

/* eslint-disable-next-line */
export interface GraphDistributionProps {
  updateResize: boolean;
  data: ChartData;
  options: ChartOptions;
  languageChanged: boolean;
}

export function GraphDistribution(props: GraphDistributionProps) {
  const [chartData, setChartData] = useState<ChartData>(props.data);
  const [chartOptions, setChartOptions] = useState<ChartOptions>(props.options);

  useEffect(() => {
    setChartData(props.data);
    setChartOptions(props.options);
  }, [props.languageChanged, props.updateResize]);
  return (
    <Chart
      type="pie"
      data={chartData}
      options={chartOptions}
      width="100%"
      height="100%"
    />
  );
}

export default GraphDistribution;
