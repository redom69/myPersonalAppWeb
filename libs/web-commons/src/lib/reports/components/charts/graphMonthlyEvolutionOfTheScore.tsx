import { ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface GraphMonthlyEvolutionOfTheScoreProps {
  updateResize: boolean;
  data: ChartData;
  options: ChartOptions;
  languageChanged: boolean;
}

export function GraphMonthlyEvolutionOfTheScore(
  props: GraphMonthlyEvolutionOfTheScoreProps,
) {
  const [chartData, setChartData] = useState<ChartData>(props.data);
  const [chartOptions, setChartOptions] = useState<ChartOptions>(props.options);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setChartData(props.data);
    setChartOptions(props.options);
  }, [props.languageChanged, props.updateResize]);
  return (
    <div className="">
      <Chart
        type="line"
        data={chartData}
        options={chartOptions}
        style={{
          width: '100%',
          height: window.innerWidth < 768 ? '300px' : '100%',
        }}
      />
    </div>
  );
}

export default GraphMonthlyEvolutionOfTheScore;
