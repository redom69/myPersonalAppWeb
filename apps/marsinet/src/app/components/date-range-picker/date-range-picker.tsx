import React, { useState, useCallback } from 'react';
import { Calendar } from 'primereact/calendar';
import { useTranslation } from 'react-i18next';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export interface DateRangePickerProps {
  highlightedDates: string[];
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

const isDayGreaterThanTen = (day: number) => day > 9;

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  highlightedDates,
  startDate,
  setStartDate,
  setEndDate,
  endDate,
}) => {
  const { t } = useTranslation();
  const [dates, setDates] = useState<Date[] | null>(null);

  const handleDateChange = useCallback(
    (e) => {
      setDates(e.value);

      if (e.value) {
        setStartDate(e.value[0]);

        if (e.value[1]) {
          const endDate = new Date(e.value[1]);
          endDate.setHours(23, 59, 59, 999);
          setEndDate(endDate);
        } else {
          const startDate = new Date(e.value[0]);
          startDate.setHours(23, 59, 59, 999);
          setEndDate(startDate);
        }
      } else {
        setStartDate(new Date('1900-01-01'));
        setEndDate(new Date());
      }
    },
    [setStartDate, setEndDate]
  );

  const dateTemplate = useCallback(
    (date) => {
      const jsDate = new Date(date.year, date.month, date.day + 1);
      const dateStr = jsDate.toISOString().split('T')[0];
      const isHighlighted = highlightedDates.includes(dateStr);

      return (
        <div
          style={{ textAlign: 'center', padding: '10px', position: 'relative' }}
        >
          <div>{date.day}</div>
          {isHighlighted && (
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#004e78',
                marginBottom: '10px',
                marginLeft: isDayGreaterThanTen(date.day) ? '5px' : '2px',
              }}
            ></span>
          )}
        </div>
      );
    },
    [highlightedDates]
  );

  const handleClear = () => {
    const startDate = new Date('1900-01-01');
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    setDates(null);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <div className="p-fluid w-full text-center">
      <label className="font-bold block mb-2">{t('dateRange')}:</label>

      <Calendar
        showIcon
        style={{ width: '100%' }}
        dateFormat="dd-mm-yy"
        minDate={new Date('1900-01-01')}
        maxDate={new Date()}
        showButtonBar
        selectionMode="range"
        value={dates || [startDate, endDate]}
        onChange={handleDateChange}
        dateTemplate={dateTemplate}
        onClearButtonClick={handleClear}
      />
    </div>
  );
};

export default DateRangePicker;
