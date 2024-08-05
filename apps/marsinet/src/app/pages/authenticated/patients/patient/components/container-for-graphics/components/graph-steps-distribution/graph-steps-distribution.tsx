import { useEffect, useState } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { useTranslation } from 'react-i18next';
import { Chart } from 'primereact/chart';

/* eslint-disable-next-line */
export interface GraphStepsDistributionProps {
  updateResize: boolean;
  data: ChartData;
  options: ChartOptions;
}

export function GraphStepsDistribution(props: GraphStepsDistributionProps) {
  const { i18n } = useTranslation();

  const [chartData, setChartData] = useState<ChartData>(props.data);
  const [chartOptions, setChartOptions] = useState<ChartOptions>(props.options);

  useEffect(() => {
    setChartData(props.data);
    setChartOptions(props.options);
  }, [i18n.language, props.updateResize]);

  return <Chart type="pie" data={chartData} options={chartOptions} />;
}

export default GraphStepsDistribution;
