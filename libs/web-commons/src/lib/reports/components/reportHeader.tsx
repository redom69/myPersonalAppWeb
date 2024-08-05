import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface ReportHeaderProps {}

export function ReportHeader(props: any) {
  const { t, i18n } = useTranslation();
  const [actualDate, setActualDate] = useState(Date);

  useEffect(() => {
    const date = new Date();
    const options: any = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    setActualDate(date.toLocaleDateString(i18n.language, options));
  }, [i18n.language]);

  return (
    <div
      className="flex align-items-center flex-column md:flex-row md:justify-content-between p-3 my-4"
      style={{ pageBreakBefore: 'always' }}
    >
      <img
        src="/assets/marsi-azul-degradado-fondo-blanco.png"
        alt="logo marsinet"
        style={{ width: '380px' }}
      />
      <div className="surface-ground p-3 border-round-3xl text-600 text-center md:text-right">
        {t('pages.reports.createAt')} :{' '}
        <span className="font-bold text-xl">{actualDate}</span>
      </div>
    </div>
  );
}

export default ReportHeader;

export interface DataLastSessionReceived {
  steps: number;
  time: number;
  score: number;
  walking: number;
  standing: number;
}

export interface DataSessionsLastMonth {
  steps: number;
  last_date: string;
  time: number;
  num_sessions: number;
  score: number;
}

export interface DataSessionsMadeFromTheStart {
  steps: number;
  last_date: string;
  time: number;
  num_sessions: number;
  score: number;
}
