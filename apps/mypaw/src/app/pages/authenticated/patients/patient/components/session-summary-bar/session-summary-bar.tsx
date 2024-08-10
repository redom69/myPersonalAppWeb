import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface SessionSummaryBarProps {
  total_sessions: number;
  total_steps: number;
  total_time: number;
  average_steps_session: number;
  average_time_session: number;
  total_time_walking: number;
  total_time_standing: number;
}

export function SessionSummaryBar(props: SessionSummaryBarProps) {
  const { t } = useTranslation();

  function formatTime(minutes) {
    const mins = parseFloat(minutes);
    if (isNaN(mins)) return 'Invalid time';

    const totalSeconds = mins * 60;
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    let result = '';
    if (days > 0) {
      result += `${days} d `;
    }
    if (hours > 0) {
      result += `${hours} h `;
    }
    if (remainingMinutes > 0) {
      result += `${remainingMinutes} m `;
    }
    result += `${seconds} s`;

    return result.trim();
  }

  return (
    <div className="surface-0 surface-border border-2 p-2 shadow-custom border-round-2xl grid mt-3 mb-3">
      <div className="col-12 lg:col-6 flex align-items-center justify-content-center xxl:justify-content-end mb-4 lg:mb-0">
        <div className="p-2 flex flex-column md:flex-row justify-content-center align-items-center gap-3">
          <div className=" text-center">
            <div className="text-center">
              {t('pages.patients.viewPatient.sessions.totalSessions')}
            </div>
            <div className="font-bold text-2xl text-center">
              {props.total_sessions}
            </div>
          </div>
          <img
            className="w-3rem text-center md:mr-2"
            src="assets/icons8-footprint-80.png"
            alt="steps marsinet"
          />
          <div className=" text-center">
            <div className="text-center ">
              {t('pages.patients.viewPatient.sessions.totalSteps')}
            </div>
            <div className="font-bold text-2xl text-center">
              {props.total_steps}
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs">
              {t('pages.patients.viewPatient.sessions.averageStepsSession')}
            </div>
            <div className="font-bold text-2xl">
              {props.average_steps_session.toFixed(0)}
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 lg:col-5 flex justify-content-center  xxl:justify-content-start align-items-center">
        <div className="p-2 flex flex-column md:flex-row justify-content-center align-items-center gap-3">
          <img
            className="w-3rem mr-2"
            src="assets/icons8-clock-100.png"
            alt="clock marsinet"
          />
          <div className="t ">
            <div className="text-center ">
              {t('pages.patients.viewPatient.sessions.totalTime')}
            </div>
            <div className="font-bold text-xl text-center  ">
              {formatTime(props.total_time)}
            </div>
          </div>

          <div className="t ">
            <div className="text-center ">
              {t('pages.patients.viewPatient.sessions.totalTimeWalking')}
            </div>
            <div className="font-bold text-xl text-center  ">
              {formatTime(props.total_time_walking)}
            </div>
          </div>

          <div className="">
            <div className="text-center text-xs">
              {t('pages.patients.viewPatient.sessions.averageTimeSession')}
            </div>
            <div className="font-bold text-xl text-center  ">
              {formatTime(props.average_time_session)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionSummaryBar;
