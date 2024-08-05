import { ChartData, ChartOptions } from 'chart.js';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Chart } from 'primereact/chart';

/* eslint-disable-next-line */
export interface GraphStepsProps {
  updateResize: boolean;
  data: ChartData;
  options: ChartOptions;
}

export function GraphSteps(props: GraphStepsProps) {
  const [chartData, setChartData] = useState<ChartData>(props.data);
  const [chartOptions, setChartOptions] = useState<ChartOptions>(props.options);
  const { i18n } = useTranslation();
  useEffect(() => {
    setChartData(props.data);
    setChartOptions(props.options);
  }, [i18n.language, props.updateResize]);
  return (
    <div>
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  );
}

export default GraphSteps;
