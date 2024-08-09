import { useTranslation } from 'react-i18next';
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export interface CustomCalendarProps {
  highlightedDates: string[];
  startDate: Date;
  setStartDate: (date: Date) => void;
}

function CustomCalendar(props: Readonly<CustomCalendarProps>) {
  const { t } = useTranslation();
  const { highlightedDates, startDate, setStartDate } = props;

  const dateTemplate = (date) => {
    const jsDate = new Date(date.year, date.month, date.day + 1);

    const dateStr = jsDate.toISOString().split('T')[0];

    const isHighlighted = highlightedDates.includes(dateStr);

    const isDayGreaterThanTen = (date) => date.day > 9;

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
              backgroundColor: '#C822FF',
              marginBottom: '10px',
              marginLeft: isDayGreaterThanTen(date) ? '5px' : '2px',
            }}
          ></span>
        )}
      </div>
    );
  };

  return (
    <div className="p-fluid w-full text-center">
      <label className="font-bold block mb-2">{t('selectDate')}:</label>

      <Calendar
        showIcon
        style={{ width: '100%' }}
        dateFormat="dd-mm-yy"
        minDate={new Date('1900-01-01')}
        maxDate={new Date()}
        showButtonBar
        value={startDate}
        onChange={(e) => {
          setStartDate(new Date(e.value));
        }}
        dateTemplate={dateTemplate}
      />
    </div>
  );
}

export default CustomCalendar;
