import { Chart } from 'primereact/chart';
import { ChartOptions, ChartData } from 'chart.js';
import { useEffect, useState } from 'react';

export interface GraphTotalStepsProps {
  updateResize: boolean;
  data: ChartData;
  options: ChartOptions;
  languageChanged: boolean;
}

export function GraphTotalSteps(props: GraphTotalStepsProps) {
  const [chartData, setChartData] = useState<ChartData>(props.data);
  const [chartOptions, setChartOptions] = useState<ChartOptions>(props.options);

  useEffect(() => {
    setChartData(props.data);
    setChartOptions(props.options);
  }, [props.languageChanged, props.updateResize]);

  return <Chart type="bar" data={chartData} options={chartOptions} />;
}

export default GraphTotalSteps;
