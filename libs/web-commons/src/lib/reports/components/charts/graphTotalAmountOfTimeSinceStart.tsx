import { ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface GraphTotalAmountOfTimeSinceStartProps {
  updateResize: boolean;
  data: ChartData;
  options: ChartOptions;
  languageChanged: boolean;
}

export function GraphTotalAmountOfTimesSinceStart(
  props: GraphTotalAmountOfTimeSinceStartProps,
) {
  const [chartData, setChartData] = useState<ChartData>(props.data);
  const [chartOptions, setChartOptions] = useState<ChartOptions>(props.options);

  useEffect(() => {
    setChartData(props.data);
    setChartOptions(props.options);
  }, [props.languageChanged, props.updateResize]);
  return (
    <div className="">
      <Chart
        type="bar"
        data={chartData}
        options={chartOptions}
        className="w-full"
      />
    </div>
  );
}

export default GraphTotalAmountOfTimesSinceStart;
