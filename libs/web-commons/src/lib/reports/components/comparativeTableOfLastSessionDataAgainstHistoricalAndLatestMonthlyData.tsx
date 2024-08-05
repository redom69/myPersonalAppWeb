import { useTranslation } from 'react-i18next';
import { ComparativeTableOfLastSessionDataAgainstHistoricalAndLatestMonthlyDataInterface } from '@marsinet/commons';

export interface ComparativeTableOfLastSessionDataAgainstHistoricalAndLatestMonthlyDataProps {
  data: ComparativeTableOfLastSessionDataAgainstHistoricalAndLatestMonthlyDataInterface;
}

export function ComparativeTableOfLastSessionDataAgainstHistoricalAndLatestMonthlyData(
  props: ComparativeTableOfLastSessionDataAgainstHistoricalAndLatestMonthlyDataProps,
) {
  const { t } = useTranslation();
  if (!props.data) {
    return null;
  }

  return (
    <div className="mx-3 my-7">
      <div className="font-bold text-center text-2xl">
        {t('pages.reports.tables.tableComparativeOfLastSessionTitle')}
      </div>

      <div className="mt-5 grid grid-nogutter">
        {/* ENCABEZADO */}

        <div
          className="surface-border border-solid border-1 table-border-style-radius-left h-4rem"
          style={{ width: '20%' }}
        ></div>
        <div
          className="surface-border border-solid border-1 h-4rem"
          style={{ width: '15%' }}
        ></div>
        <div
          className="surface-border border-solid border-1 font-bold  h-4rem flex align-items-center justify-content-center text-center px-2"
          style={{ width: '21.6%' }}
        >
          {t('pages.reports.tables.history')}
        </div>
        <div
          className="surface-border border-solid border-1 font-bold  h-4rem flex align-items-center justify-content-center text-center px-2"
          style={{ width: '21.6%' }}
        >
          {t('pages.reports.tables.lastMonth')}
        </div>
        <div
          className="surface-border border-solid border-1 table-border-style-radius-right font-bold  h-4rem flex align-items-center justify-content-center text-center px-2"
          style={{ width: '21.8%' }}
        >
          {t('pages.reports.tables.lastSession')}
        </div>

        {/* ENCABEZADO 2 */}

        <div
          className="surface-border border-solid border-1 flex align-items-center justify-content-center text-center px-2"
          style={{ width: '20%' }}
        ></div>
        <div
          className="surface-border border-solid border-1 flex align-items-center justify-content-center text-center px-2"
          style={{ width: '15%' }}
        ></div>
        <div
          className="surface-border border-solid border-1 px-2"
          style={{ width: '21.6%' }}
        >
          <div className="flex">
            <div className="col-6 text-center surface-border border-solid border-right-1 border-y-none border-left-none">
              {t('pages.reports.tables.result')}
            </div>
            <div className="col-6 text-center">
              {t('pages.reports.tables.index')}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 px-2"
          style={{ width: '21.6%' }}
        >
          <div className="flex">
            <div className="col-6 text-center surface-border border-solid border-right-1 border-y-none border-left-none">
              {t('pages.reports.tables.result')}
            </div>
            <div className="col-6 text-center">
              {t('pages.reports.tables.index')}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 px-2"
          style={{ width: '21.8%' }}
        >
          <div className="flex">
            <div className="col-6 text-center surface-border border-solid border-right-1 border-y-none border-left-none">
              {t('pages.reports.tables.result')}
            </div>
            <div className="col-6 text-center">
              {t('pages.reports.tables.index')}
            </div>
          </div>
        </div>

        {/* FILA 1 : PASOS EN AUTOMÁTICO */}

        <div
          className="surface-border border-solid border-1 border-bottom-none flex align-items-center justify-content-start font-bold px-2"
          style={{ width: '20%' }}
        >
          {t('pages.reports.tables.stepsAutomatic')}
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '15%' }}
        >
          <div className="flex flex-column">
            <div className="col-12 pl-1 surface-border border-solid border-bottom-1 border-top-none border-right-none border-left-none">
              {t('pages.reports.tables.forward')}
            </div>
            <div className="col-12 pl-1">
              {t('pages.reports.tables.backward')}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '21.6%' }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none">
              {props.data.automaticSteps.historical.forward.result}
            </div>
            <div className="col-6 text-right ">
              {props.data.automaticSteps.historical.forward.index}
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none">
              {props.data.automaticSteps.historical.backward.result}
            </div>
            <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none">
              {props.data.automaticSteps.historical.backward.index}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '21.6%' }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none">
              {props.data.automaticSteps.lastMonth.forward.result}
            </div>
            <div className="col-6 text-right ">
              {props.data.automaticSteps.lastMonth.forward.index}
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none">
              {props.data.automaticSteps.lastMonth.backward.result}
            </div>
            <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none">
              {props.data.automaticSteps.lastMonth.backward.index}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '21.8%' }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none">
              {props.data.automaticSteps.lastSession.forward.result}
            </div>
            <div className="col-6 text-right ">
              {props.data.automaticSteps.lastSession.forward.index}
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none">
              {props.data.automaticSteps.lastSession.backward.result}
            </div>
            <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none ">
              {props.data.automaticSteps.lastSession.backward.index}
            </div>
          </div>
        </div>

        {/* FILA 2 : PASOS EN INTENCIÓN*/}

        <div
          className="surface-border border-solid border-1 border-bottom-none flex align-items-center justify-content-start font-bold px-2"
          style={{ width: '20%' }}
        >
          {t('pages.reports.tables.stepsIntention')}
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '15%' }}
        >
          <div className="flex flex-column">
            <div className="col-12 pl-1 surface-border border-solid border-bottom-1 border-top-none border-right-none border-left-none">
              {t('pages.reports.tables.forward')}
            </div>
            <div className="col-12 pl-1">
              {t('pages.reports.tables.backward')}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '21.6%' }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none">
              {props.data.intentionalSteps.historical.forward.result}
            </div>
            <div className="col-6 text-right ">
              {props.data.intentionalSteps.historical.forward.index}
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none">
              {props.data.intentionalSteps.historical.backward.result}
            </div>
            <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none">
              {props.data.intentionalSteps.historical.backward.index}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '21.8%' }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none">
              {props.data.intentionalSteps.lastMonth.forward.result}
            </div>
            <div className="col-6 text-right">
              {props.data.intentionalSteps.lastMonth.forward.index}
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none">
              {props.data.intentionalSteps.lastMonth.backward.result}
            </div>
            <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none">
              {props.data.intentionalSteps.lastMonth.backward.index}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '21.6%' }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none">
              {props.data.intentionalSteps.lastSession.forward.result}
            </div>
            <div className="col-6 text-right">
              {props.data.intentionalSteps.lastSession.forward.index}
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none">
              {props.data.intentionalSteps.lastSession.backward.result}
            </div>
            <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none">
              {props.data.intentionalSteps.lastSession.backward.index}
            </div>
          </div>
        </div>

        {/* FILA 3 : CADENCIA*/}

        <div
          className="surface-border border-solid border-1 border-bottom-none flex align-items-center justify-content-start font-bold px-2"
          style={{ width: '20%' }}
        >
          {t('pages.reports.tables.cadence')}
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '15%' }}
        >
          <div className="flex flex-column">
            <div className="col-12 pl-1 surface-border border-solid border-bottom-1 border-top-none border-right-none border-left-none">
              {t('pages.reports.tables.automatic')}
            </div>
            <div className="col-12 pl-1">
              {t('pages.reports.tables.intention')}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '21.6%' }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none">
              {props.data.cadence.historical.automatic.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.cadence.historical.automatic.result > 40
                      ? 'bg-green-300'
                      : props.data.cadence.historical.automatic.result > 20
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.cadence.historical.automatic.index}
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none">
              {props.data.cadence.historical.intentional.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.cadence.historical.intentional.result > 40
                      ? 'bg-green-300'
                      : props.data.cadence.historical.intentional.result > 20
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.cadence.historical.intentional.index}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '21.6%' }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none">
              {props.data.cadence.lastMonth.automatic.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.cadence.lastMonth.automatic.result > 40
                      ? 'bg-green-300'
                      : props.data.cadence.lastMonth.automatic.result > 20
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.cadence.lastMonth.automatic.index}
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none">
              {props.data.cadence.lastMonth.intentional.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.cadence.lastMonth.intentional.result > 40
                      ? 'bg-green-300'
                      : props.data.cadence.lastMonth.intentional.result > 20
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.cadence.lastMonth.intentional.index}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '21.8%' }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none">
              {props.data.cadence.lastSession.automatic.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.cadence.lastSession.automatic.result > 40
                      ? 'bg-green-300'
                      : props.data.cadence.lastSession.automatic.result > 20
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.cadence.lastSession.automatic.index}
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none">
              {props.data.cadence.lastSession.intentional.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.cadence.lastSession.intentional.result > 40
                      ? 'bg-green-300'
                      : props.data.cadence.lastSession.intentional.result > 20
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.cadence.lastSession.intentional.index}
            </div>
          </div>
        </div>

        {/* FILA 4 : FLEXOS */}

        <div
          className="surface-border border-solid border-1 border-bottom-none flex align-items-center justify-content-start font-bold px-2"
          style={{ width: '20%' }}
        >
          {t('pages.reports.tables.flexos')}**
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '15%' }}
        >
          <div className="flex flex-column">
            <div className="col-12 pl-1 surface-border border-solid border-bottom-1 border-top-none border-right-none border-left-none">
              {t('pages.reports.tables.hip')}
            </div>
            <div className="col-12 pl-1 surface-border border-solid border-bottom-1 border-top-none border-right-none border-left-none">
              {t('pages.reports.tables.knee')}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '21.6%' }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none">
              {props.data.flexos.historical.hip.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.flexos.historical.hip.result > 5
                      ? 'bg-green-300'
                      : props.data.flexos.historical.hip.result > 0
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.flexos.historical.hip.index}
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none">
              {props.data.flexos.historical.knee.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.flexos.historical.knee.result > 25
                      ? 'bg-green-300'
                      : props.data.flexos.historical.knee.result > 15
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.flexos.historical.knee.index}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '21.6%' }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none">
              {props.data.flexos.lastMonth.hip.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.flexos.lastMonth.hip.result > 5
                      ? 'bg-green-300'
                      : props.data.flexos.lastMonth.hip.result > 0
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.flexos.lastMonth.hip.index}
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none">
              {props.data.flexos.lastMonth.knee.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.flexos.lastMonth.knee.result > 25
                      ? 'bg-green-300'
                      : props.data.flexos.lastMonth.knee.result > 15
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.flexos.lastMonth.knee.index}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '21.8%' }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none">
              {props.data.flexos.lastSession.hip.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.flexos.lastSession.hip.result > 5
                      ? 'bg-green-300'
                      : props.data.flexos.lastSession.hip.result > 0
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.flexos.lastSession.hip.index}
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none">
              {props.data.flexos.lastSession.knee.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.flexos.lastSession.knee.result > 25
                      ? 'bg-green-300'
                      : props.data.flexos.lastSession.knee.result > 15
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.flexos.lastSession.knee.index}
            </div>
          </div>
        </div>

        {/* FILA 5 : UMBRAL*/}

        <div
          className="surface-border border-solid border-1 border-bottom-none flex align-items-center justify-content-start font-bold px-2"
          style={{ width: '20%' }}
        >
          {t('pages.reports.tables.threshold')}
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '15%' }}
        >
          <div className="flex flex-column">
            <div className="col-12 pl-1 surface-border border-solid border-bottom-1 border-top-none border-right-none border-left-none">
              {t('pages.reports.tables.hipl')}
            </div>
            <div className="col-12 pl-1">{t('pages.reports.tables.kneel')}</div>
          </div>
        </div>

        <div
          className=" surface-border border-solid border-1 border-bottom-none"
          style={{
            display: 'grid',
            gridTemplateRows: '1fr 1fr',
            width: '21.6%',
          }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none">
              {props.data.threshold.historical.hipl.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.threshold.historical.hipl.result > 7
                      ? 'bg-green-300'
                      : props.data.threshold.historical.hipl.result > 3
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.threshold.historical.hipl.index}
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none">
              {props.data.threshold.historical.kneel.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.threshold.historical.kneel.result > 7
                      ? 'bg-green-300'
                      : props.data.threshold.historical.kneel.result > 3
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.threshold.historical.kneel.index}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{
            display: 'grid',
            gridTemplateRows: '1fr 1fr',
            width: '21.6%',
          }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none">
              {props.data.threshold.lastMonth.hipr.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.threshold.lastMonth.hipr.result > 7
                      ? 'bg-green-300'
                      : props.data.threshold.lastMonth.hipr.result > 3
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.threshold.lastMonth.hipr.index}
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none">
              {props.data.threshold.lastMonth.kneer.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.threshold.lastMonth.kneer.result > 7
                      ? 'bg-green-300'
                      : props.data.threshold.lastMonth.kneer.result > 3
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.threshold.lastMonth.kneer.index}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{
            display: 'grid',
            gridTemplateRows: '1fr 1fr',
            width: '21.8%',
          }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none">
              {props.data.threshold.lastSession.hipl.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.threshold.lastSession.hipl.result > 7
                      ? 'bg-green-300'
                      : props.data.threshold.lastSession.hipl.result > 3
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.threshold.lastSession.hipl.index}
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none">
              {props.data.threshold.lastSession.kneer.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.threshold.lastSession.kneer.result > 7
                      ? 'bg-green-300'
                      : props.data.threshold.lastSession.kneer.result > 3
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.threshold.lastSession.kneer.index}
            </div>
          </div>
        </div>

        {/* FILA 6 : TERAPEUTA*/}

        <div
          className="surface-border border-solid border-1 border-bottom-none flex align-items-center justify-content-start font-bold px-2"
          style={{ width: '20%' }}
        >
          {t('pages.reports.tables.therapist')}*
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '15%' }}
        >
          <div className="flex flex-column">
            <div className="col-12 pl-1 surface-border border-solid border-bottom-1 border-top-none border-right-none border-left-none">
              {t('pages.reports.tables.dungarees')}***
            </div>
            <div className="col-12 pl-1">
              {t('pages.reports.tables.effort')}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '21.6%' }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none">
              {props.data.therapist.historical.dungarees.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.therapist.historical.dungarees.result === 0
                      ? 'bg-green-300'
                      : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.therapist.historical.dungarees.index}
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none">
              {props.data.therapist.historical.effort.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.therapist.historical.effort.result > 3
                      ? 'bg-green-300'
                      : props.data.therapist.historical.effort.result > 2
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.therapist.historical.effort.index}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '21.6%' }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none">
              {props.data.therapist.lastMonth.dungarees.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.therapist.lastMonth.dungarees.result === 0
                      ? 'bg-green-300'
                      : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.therapist.lastMonth.dungarees.index}
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none">
              {props.data.therapist.lastMonth.effort.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.therapist.lastMonth.effort.result > 3
                      ? 'bg-green-300'
                      : props.data.therapist.lastMonth.effort.result > 2
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.therapist.lastMonth.effort.index}
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 border-bottom-none"
          style={{ width: '21.8%' }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none">
              {props.data.therapist.lastSession.dungarees.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.therapist.lastSession.dungarees.result === 0
                      ? 'bg-green-300'
                      : 'bg-red-200'
                  }`}
            >
              {' '}
              {props.data.therapist.lastSession.dungarees.index}
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none">
              {props.data.therapist.lastSession.effort.result}
            </div>
            <div
              className={`col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none 
                  ${
                    props.data.therapist.lastSession.effort.result > 3
                      ? 'bg-green-300'
                      : props.data.therapist.lastSession.effort.result > 2
                        ? 'bg-orange-300'
                        : 'bg-red-200'
                  }`}
            >
              {props.data.therapist.lastSession.effort.index}
            </div>
          </div>
        </div>

        {/* FILA7 : TOTAL*/}

        <div
          className="surface-border border-solid border-1 border-right-none table-border-style-radius-bottom-left flex align-items-center justify-content-start font-bold pl-2 text-3xl"
          style={{ width: '20%' }}
        >
          {t('pages.reports.tables.total')}
        </div>
        <div
          className="surface-border border-solid border-1 border-left-none border-right-none"
          style={{ width: '15%' }}
        ></div>
        <div
          className="surface-border border-solid border-1 border-left-none"
          style={{ width: '21.6%' }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none"></div>
            <div
              className={`col-6 text-right bg-yellow-200 font-bold text-2xl ${
                props.data.totalHistorical > 70
                  ? 'bg-green-300'
                  : props.data.totalHistorical > 40
                    ? 'bg-orange-300'
                    : 'bg-red-200'
              }`}
            >
              {props.data.totalHistorical} %
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1"
          style={{ width: '21.6%' }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none"></div>
            <div
              className={`col-6 text-right bg-yellow-200 font-bold text-2xl ${
                props.data.totalLastMonth > 70
                  ? 'bg-green-300'
                  : props.data.totalLastMonth > 40
                    ? 'bg-orange-300'
                    : 'bg-red-200'
              }`}
            >
              {props.data.totalLastMonth} %
            </div>
          </div>
        </div>
        <div
          className="surface-border border-solid border-1 table-border-style-radius-bottom-right"
          style={{ width: '21.8%' }}
        >
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none"></div>

            <div
              className={`col-6 text-right font-bold text-2xl table-border-style-radius-bottom-right ${
                props.data.totalLastSession > 75
                  ? 'bg-green-300'
                  : props.data.totalLastSession > 40
                    ? 'bg-orange-300'
                    : 'bg-red-200'
              }`}
            >
              {props.data.totalLastSession} %
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComparativeTableOfLastSessionDataAgainstHistoricalAndLatestMonthlyData;
