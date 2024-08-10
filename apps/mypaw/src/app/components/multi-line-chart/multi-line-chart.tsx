import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Brush,
} from 'recharts';

import { colors } from '@mypaw/commons';

const CustomTooltip = ({ active, payload, label, visibleLines }) => {
  if (active && payload?.length) {
    const filteredPayload = payload.filter((entry) => visibleLines[entry.name]);

    if (filteredPayload.length === 0) {
      return null;
    }

    const groupSize = 4;
    const groupedPayload = [];
    for (let i = 0; i < filteredPayload.length; i += groupSize) {
      groupedPayload.push(filteredPayload.slice(i, i + groupSize));
    }

    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          padding: '10px',
          fontSize: '14px',
          maxWidth: '300px',
        }}
      >
        <p
          className="label"
          style={{
            fontWeight: 'bold',
            marginBottom: '5px',
            textAlign: 'center',
          }}
        >{`${label}`}</p>
        {groupedPayload.map((group) => (
          <div key={group.id} style={{ marginBottom: '10px' }}>
            {group.map((entry) => (
              <p
                key={entry.id}
                style={{ color: entry.stroke, margin: '5px 0' }}
              >
                {`${entry.name} : ${entry.value}`}
              </p>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export interface MultiLineChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  title: string;
  setLoading: (loading: boolean) => void;
}

export function MultiLineChart(props: Readonly<MultiLineChartProps>) {
  const { data, title, setLoading } = props;

  const keys = useMemo(
    () =>
      data.length > 0
        ? Object.keys(data[0])
            .filter((key) => key !== 'timestamp')
            .slice(0, 12)
        : [],
    [data]
  );

  const [visibleLines, setVisibleLines] = useState(() =>
    Object.fromEntries(keys.map((key) => [key, true]))
  );

  useEffect(() => {
    setVisibleLines(Object.fromEntries(keys.map((key) => [key, true])));
  }, [keys, setLoading]);

  const handleLegendClick = useCallback((payload) => {
    const { dataKey } = payload;
    setVisibleLines((prevState) => ({
      ...prevState,
      [dataKey]: !prevState[dataKey],
    }));
  }, []);

  const renderLegend = useCallback(
    (value, entry) => {
      const { dataKey } = entry.payload;
      return (
        <span style={{ color: visibleLines[dataKey] ? null : 'gray' }}>
          {value}
        </span>
      );
    },
    [visibleLines]
  );

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500 text-lg">No data available</div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <div className="text-3xl font-bold mb-4 py-4">{title}</div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Legend onClick={handleLegendClick} formatter={renderLegend} />
          {Object.values(visibleLines).some((visible) => visible) && (
            <Tooltip
              content={
                <CustomTooltip
                  active={undefined}
                  payload={undefined}
                  label={undefined}
                  visibleLines={visibleLines}
                />
              }
              cursor={{
                stroke: 'black',
                strokeWidth: 2,
                strokeDasharray: '5 5',
              }}
            />
          )}
          {keys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
              name={key}
              strokeOpacity={visibleLines[key] ? 1 : 0}
              strokeWidth={2}
              dot={false}
            />
          ))}
          <Brush
            dataKey="timestamp"
            height={30}
            stroke="#C822FF"
            fill="#e0e0e0"
            travellerWidth={10}
            tickFormatter={(value) => value}
            startIndex={0}
            endIndex={Math.floor(data.length * 0.05)}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MultiLineChart;
