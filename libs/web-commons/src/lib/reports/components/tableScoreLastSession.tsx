import { useTranslation } from 'react-i18next';
import { TableScoreLastSessionDataInterface } from '@mypaw/commons';

export interface TableScoreLastSessionsProps {
  data: TableScoreLastSessionDataInterface;
}

export function TableScoreLastSessions(props: TableScoreLastSessionsProps) {
  const { t } = useTranslation();

  return (
    <>
      {props.data && (
        <>
          {/* TABLA PUNTUACIÓN DE LA ÚLTIMA SESIÓN */}
          <div className="my-3 text-2xl">
            <div className="font-bold text-center text-3xl mb-4">
              {t('pages.reports.tables.titleLastSessions')}
            </div>
            <div className="grid grid-nogutter">
              {/* ENCABEZADO */}
              <div className="col-3 surface-border border-solid border-1 h-3rem	table-border-style-radius-left"></div>
              <div className="col-3 surface-border border-solid border-1 h-3rem	"></div>
              <div className="col-3 surface-border border-solid border-1 font-bold text-right h-3rem flex align-items-center justify-content-end px-2">
                {t('pages.reports.tables.result')}
              </div>
              <div className="col-3 surface-border border-solid border-1 table-border-style-radius-right font-bold text-right h-3rem flex align-items-center justify-content-end px-2">
                {t('pages.reports.tables.index')}
              </div>

              {/* PASOS EN AUTOMÁTICO */}
              <div className="col-3 font-bold surface-border border-solid border-x-1 border-top-none border-bottom-1 flex align-items-center justify-content-start px-2">
                {t('pages.reports.tables.stepsAutomatic')}
              </div>
              <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
                <div className="flex flex-column">
                  <div className="col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none">
                    {t('pages.reports.tables.forward')}
                  </div>
                  <div className="col-12">
                    {t('pages.reports.tables.backward')}
                  </div>
                </div>
              </div>
              <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
                <div className="flex flex-column text-right">
                  <div className="col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none">
                    {props.data.automaticSteps.forward.result}
                  </div>
                  <div className="col-12">
                    {props.data.automaticSteps.backward.result}
                  </div>
                </div>
              </div>
              <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
                <div className="flex flex-column text-right">
                  <div className="col-12  ">
                    <div className="">
                      {props.data.automaticSteps.forward.index}
                    </div>
                  </div>
                  <div className="col-12 ">
                    <div className="">
                      {props.data.automaticSteps.backward.index}
                    </div>
                  </div>
                </div>
              </div>
              {/* PASOS con intención hacia */}
              <div className="col-3 font-bold surface-border border-solid border-x-1 border-top-none border-bottom-1 flex align-items-center justify-content-start px-2">
                {t('pages.reports.tables.stepsIntention')}
              </div>
              <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
                <div className="flex flex-column">
                  <div className="col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none">
                    {t('pages.reports.tables.forward')}
                  </div>
                  <div className="col-12">
                    {t('pages.reports.tables.backward')}
                  </div>
                </div>
              </div>
              <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
                <div className="flex flex-column text-right">
                  <div className="col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none">
                    {props.data.intentionalSteps.forward.result}
                  </div>
                  <div className="col-12">
                    {props.data.intentionalSteps.backward.result}
                  </div>
                </div>
              </div>
              <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
                <div className="flex flex-column text-right">
                  <div className="col-12  ">
                    <div className="">
                      {props.data.intentionalSteps.forward.index}
                    </div>
                  </div>
                  <div className="col-12  ">
                    <div className="">
                      {props.data.intentionalSteps.backward.index}
                    </div>
                  </div>
                </div>
              </div>
              {/* CADENCIA */}
              <div className="col-3 font-bold surface-border border-solid border-x-1 border-top-none border-bottom-1 flex align-items-center justify-content-start px-2">
                {t('pages.reports.tables.cadence')}
              </div>
              <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
                <div className="flex flex-column">
                  <div className="col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none">
                    {t('pages.reports.tables.automatic')}
                  </div>
                  <div className="col-12">
                    {t('pages.reports.tables.intention')}
                  </div>
                </div>
              </div>
              <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
                <div className="flex flex-column text-right">
                  <div className="col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none">
                    {props.data.cadence.automatic_forward.result}
                  </div>
                  <div className="col-12">
                    {props.data.cadence.automatic_backward.result}
                  </div>
                </div>
              </div>
              <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
                <div className="flex flex-column text-right">
                  <div
                    className={`col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none ${
                      props.data.cadence.automatic_forward.result > 40
                        ? 'bg-green-300'
                        : props.data.cadence.automatic_forward.result > 20
                          ? 'bg-orange-300'
                          : 'bg-red-200'
                    }`}
                  >
                    {' '}
                    <div className="">
                      {props.data.cadence.automatic_forward.index}
                    </div>
                  </div>
                  <div
                    className={`col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none ${
                      props.data.cadence.automatic_backward.result > 40
                        ? 'bg-green-300'
                        : props.data.cadence.automatic_backward.result > 20
                          ? 'bg-orange-300'
                          : 'bg-red-200'
                    }`}
                  >
                    {' '}
                    <div className="">
                      {props.data.cadence.automatic_backward.index}
                    </div>
                  </div>
                </div>
              </div>
              {/* FLEXOS */}
              <div className="col-3 font-bold surface-border border-solid border-x-1 border-top-none border-bottom-1 flex align-items-center justify-content-start px-2">
                {t('pages.reports.tables.flexos')}**
              </div>
              <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
                <div className="flex flex-column">
                  <div className="col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none">
                    {t('pages.reports.tables.hip')}
                  </div>
                  <div className="col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none">
                    {t('pages.reports.tables.knee')}
                  </div>
                </div>
              </div>
              <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
                <div className="flex flex-column text-right">
                  <div className="col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none">
                    {props.data.flexos.hip.result}
                  </div>
                  <div className="col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none">
                    {props.data.flexos.knee.result}
                  </div>
                </div>
              </div>
              <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
                <div className="flex flex-column text-right">
                  <div
                    className={`col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none ${
                      props.data.flexos.hip.result < 5
                        ? 'bg-green-300'
                        : props.data.flexos.hip.result < 20
                          ? 'bg-orange-300'
                          : 'bg-red-200'
                    }`}
                  >
                    {' '}
                    <div className="">{props.data.flexos.hip.index}</div>
                  </div>
                  <div
                    className={`col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none ${
                      props.data.flexos.knee.result < 5
                        ? 'bg-green-300'
                        : props.data.flexos.knee.result < 20
                          ? 'bg-orange-300'
                          : 'bg-red-200'
                    }`}
                  >
                    <div className="">{props.data.flexos.knee.index}</div>
                  </div>
                </div>
              </div>
              {/* UMBRAL */}
              <div className="col-3 font-bold surface-border border-solid border-x-1 border-top-none border-bottom-1 flex align-items-center justify-content-start px-2">
                {t('pages.reports.tables.threshold')}
              </div>
              <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
                <div className="flex flex-column">
                  <div className="col-12">{t('pages.reports.tables.hipl')}</div>
                  <div className="col-12">
                    {t('pages.reports.tables.kneel')}
                  </div>
                  <div className="col-12">{t('pages.reports.tables.hipr')}</div>
                  <div className="col-12">
                    {t('pages.reports.tables.kneer')}
                  </div>
                </div>
              </div>
              <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
                <div className="flex flex-column text-right">
                  <div className="col-12">
                    {props.data.threshold.hipL.result}
                  </div>
                  <div className="col-12">
                    {props.data.threshold.kneeL.result}
                  </div>
                  <div className="col-12">
                    {props.data.threshold.hipR.result}
                  </div>
                  <div className="col-12">
                    {props.data.threshold.kneeR.result}
                  </div>
                </div>
              </div>
              <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
                <div className="flex flex-column text-right">
                  <div
                    className={`col-12 ${
                      props.data.threshold.hipL.result > 7
                        ? 'bg-green-300'
                        : props.data.threshold.hipL.result > 3
                          ? 'bg-orange-300'
                          : 'bg-red-200'
                    }`}
                  >
                    {' '}
                    <div className="">{props.data.threshold.hipL.index}</div>
                  </div>
                  <div
                    className={`col-12 ${
                      props.data.threshold.kneeL.result > 7
                        ? 'bg-green-300'
                        : props.data.threshold.kneeL.result > 3
                          ? 'bg-orange-300'
                          : 'bg-red-200'
                    }`}
                  >
                    {' '}
                    <div className="">{props.data.threshold.kneeL.index}</div>
                  </div>
                  <div
                    className={`col-12 ${
                      props.data.threshold.hipR.result > 7
                        ? 'bg-green-300'
                        : props.data.threshold.hipR.result > 3
                          ? 'bg-orange-300'
                          : 'bg-red-200'
                    }`}
                  >
                    {' '}
                    <div className="">{props.data.threshold.hipR.index}</div>
                  </div>
                  <div
                    className={`col-12 ${
                      props.data.threshold.kneeR.result > 7
                        ? 'bg-green-300'
                        : props.data.threshold.kneeR.result > 3
                          ? 'bg-orange-300'
                          : 'bg-red-200'
                    }`}
                  >
                    {' '}
                    <div className="">{props.data.threshold.kneeR.index}</div>
                  </div>
                </div>
              </div>
              {/* TERAPEUTA */}
              <div className="col-3 font-bold surface-border border-solid border-x-1 border-top-none border-bottom-1 flex align-items-center justify-content-start px-2">
                {t('pages.reports.tables.therapist')}*
              </div>
              <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
                <div className="flex flex-column">
                  <div className="col-12">
                    {t('pages.reports.tables.dungarees')}**
                  </div>
                  <div className="col-12">
                    {t('pages.reports.tables.effort')}
                  </div>
                </div>
              </div>
              <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
                <div className="flex flex-column text-right">
                  <div className="col-12">
                    {props.data.therapist.dungarees.result}
                  </div>
                  <div className="col-12">
                    {props.data.therapist.effort.result}
                  </div>
                </div>
              </div>
              <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
                <div className="flex flex-column text-right">
                  <div
                    className={` col-12 ${
                      props.data.therapist.dungarees.result === 0
                        ? 'bg-green-300'
                        : 'bg-red-200'
                    }`}
                  >
                    <div className="">
                      {props.data.therapist.dungarees.index}
                    </div>
                  </div>
                  <div
                    className={`col-12 ${
                      props.data.therapist.effort.result > 3
                        ? 'bg-green-300'
                        : props.data.therapist.effort.result > 2
                          ? 'bg-orange-300'
                          : 'bg-red-200'
                    }`}
                  >
                    <div className="">
                      {props.data.therapist.effort.index.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
              {/* TOTAL */}
              <div className="col-9 surface-border border-solid border-x-1 border-top-none border-bottom-1 table-border-style-radius-bottom-left px-2 py-2 font-bold text-3xl">
                {t('pages.reports.tables.total')}
              </div>
              <div
                className={`col-3 flex align-items-center justify-content-end px-2 surface-border border-solid border-x-1  table-border-style-radius-bottom-right border-top-none border-bottom-1 font-bold font-bold text-3xl ${
                  props.data.total > 75
                    ? 'bg-green-300'
                    : props.data.total > 40
                      ? 'bg-orange-300'
                      : 'bg-red-200'
                }`}
              >
                {props.data.total} %
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TableScoreLastSessions;
