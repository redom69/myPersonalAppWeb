import { useEffect, useState } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'primereact/chart';

/* eslint-disable-next-line */
export interface GraphTimeOfUseProps {
  updateResize: boolean;
  data: ChartData;
  options: ChartOptions;
  languageChanged: boolean;
}

export function GraphTimeOfUse(props: GraphTimeOfUseProps) {
  const [chartData, setChartData] = useState<ChartData>(props.data);
  const [chartOptions, setChartOptions] = useState<ChartOptions>(props.options);

  useEffect(() => {
    setChartData(props.data);
    setChartOptions(props.options);
  }, [props.languageChanged, props.updateResize]);
  return (
    <div>
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  );
}

export default GraphTimeOfUse;
