import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Brush,
} from 'recharts';

import { colors } from '@mypaw/commons';

export interface AreaChartCustomProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  title: string;
  setLoading: (loading: boolean) => void;
}

const CustomTooltip = ({ active, payload, label, visibleLines }) => {
  if (active && payload?.length) {
    const filteredPayload = payload.filter((entry) => visibleLines[entry.name]);

    if (filteredPayload.length === 0) {
      return null;
    }

    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          padding: '10px',
        }}
      >
        <p
          className="label"
          style={{
            fontWeight: 'bold',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >{`${label}`}</p>
        {filteredPayload.map((entry) => (
          <p key={entry.id} style={{ color: entry.stroke }}>
            {`${entry.name} : ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export function AreaChartCustom(props: Readonly<AreaChartCustomProps>) {
  const { data, title, setLoading } = props;

  const keys = useMemo(
    () =>
      data.length > 0
        ? Object.keys(data[0])
            .filter((key) => key !== 'timestamp')
            .slice(0, 5)
        : [],
    [data]
  );

  const [visibleLines, setVisibleLines] = useState(() =>
    Object.fromEntries(keys.map((key) => [key, true]))
  );

  useEffect(() => {
    setVisibleLines(Object.fromEntries(keys.map((key) => [key, true])));
    setLoading(false);
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

  const generateGradients = useCallback((keys) => {
    return keys.map((key, index) => (
      <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
        <stop
          offset="5%"
          stopColor={colors[index % colors.length]}
          stopOpacity={0.8}
        />
        <stop
          offset="95%"
          stopColor={colors[index % colors.length]}
          stopOpacity={0}
        />
      </linearGradient>
    ));
  }, []);

  const generateAreas = useCallback(
    (keys, visibleLines) => {
      return keys.map((key, index) => (
        <Area
          key={key}
          type="monotone"
          dataKey={key}
          stroke={colors[index % colors.length]}
          strokeOpacity={visibleLines[key] ? 1 : 0}
          fill={visibleLines[key] ? `url(#color${key})` : 'none'}
          strokeWidth={2}
        />
      ));
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

  const anyVisibleLines = Object.values(visibleLines).some(
    (visible) => visible
  );

  return (
    <div>
      <div className="text-3xl font-bold mb-4 py-3">{title}</div>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 50,
          }}
        >
          <defs>{generateGradients(keys)}</defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Legend onClick={handleLegendClick} formatter={renderLegend} />

          {anyVisibleLines && (
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
          {generateAreas(keys, visibleLines)}
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
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChartCustom;
