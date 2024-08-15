import { useNavigate, useParams } from 'react-router-dom';

import {
  PatientsApiFactory,
  PatientView,
  Session,
} from '../../../../typescript-axios';
import { useContext, useEffect, useState, useRef } from 'react';

import './p.module.scss';
import { Toast } from 'primereact/toast';
import EditPatient from '../../../../components/p/p';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import SessionSummaryBar from '../../../../components/ssb/session-summary-bar';
import { ChartData, ChartOptions } from 'chart.js';
import ContainerForGraphics from '../../../../components/g/g';
import { Context } from 'apps/mypaw/src/app/context/provider';
import axios from 'axios';
import {
  getDataCadenceDirectionGraph,
  getDataCadenceModeGraph,
  getDataStepsMode,
  getDataTimeDirectionGraphq,
  getDataTimeMode,
  getEarlyAndLastSession,
  getScoreGraph,
  getStepGraph,
  getStepsDirectionGraph,
  getTotalsOfSessions,
  SessionData,
  getStepGraphTime,
} from '@mypaw/commons';
import DateRangePicker from 'apps/mypaw/src/app/components/date-range-picker/date-range-picker';

/* eslint-disable-next-line */
export interface PatientProps {}

export function Patient(props: PatientProps) {
  const toast = useRef(null);
  const { access_token } = useContext(Context);
  const [activeIndex, setActiveIndex] = useState(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [highlightedDates, setHighlightedDates] = useState<string[]>([]);
  const [totalSession, setTotalSession] = useState<SessionData>({
    total_steps_automatic_forward: 0,
    total_steps_automatic_backward: 0,
    total_steps_intention_forward: 0,
    total_steps_intention_backward: 0,
    total_steps_automatic: 0,
    total_steps_intention: 0,
    total_steps_forward: 0,
    total_steps_backward: 0,
    total_time_automatic_forward: 0,
    total_time_automatic_backward: 0,
    total_time_intentiton_forward: 0,
    total_time_intention_backward: 0,
    total_time_automatic: 0,
    total_time_intention: 0,
    total_time_forward: 0,
    total_time_backward: 0,
    total_steps_total: 0,
    total_time_total: 0,
    total_time_standing: 0,
    total_time_use: 0,
    total_time_walking: 0,
    median_total_steps: 0,
    median_total_steps_automatic_forward: 0,
    median_total_steps_automatic_backward: 0,
    median_total_steps_intention_forward: 0,
    median_total_steps_intention_backward: 0,
    median_total_steps_automatic: 0,
    median_total_steps_intention: 0,
    median_total_steps_forward: 0,
    median_total_steps_backward: 0,
    median_total_time: 0,
    median_total_time_automatic_forward: 0,
    median_total_time_automatic_backward: 0,
    median_total_time_intentiton_forward: 0,
    median_total_time_intention_backward: 0,
    median_total_time_automatic: 0,
    median_total_time_intention: 0,
    median_total_time_forward: 0,
    median_total_time_backward: 0,
    median_evaluation: 0,
    evaluation: 0,
    cadence_automatic_backward: 0,
    cadence_automatic_forward: 0,
    cadence_intention_backward: 0,
    cadence_intention_forward: 0,
    flexos_hip: 0,
    flexos_knee: 0,
    flexos_ankle: 0,
    threshold_hipl: 0,
    threshold_hipr: 0,
    threshold_kneel: 0,
    threshold_kneer: 0,
    threshold_anklel: 0,
    threshold_ankler: 0,
    chest: 0,
    effort: 0,
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { patient_id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<PatientView>(null);
  const { t } = useTranslation();

  const [updateResize, setUpdateResize] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('resize', updateResizeGraph);
    return () => window.removeEventListener('resize', updateResizeGraph);
  });

  const updateResizeGraph = () => {
    setUpdateResize(!updateResize);
  };

  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue(
    '--text-color-secondary'
  );
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  // Gráfica Distribución de pasos, datos y opciones (círculo)
  const [stepGraph, setStepGraph] = useState<{
    dataStepsDistribution: ChartData;
    optionsStepsDistribution: ChartOptions;
  }>({
    dataStepsDistribution: {
      labels: [],
      datasets: [],
    },
    optionsStepsDistribution: {},
  });

  // Gráfica Puntuacion
  const [scoreGraph, setScoreGraph] = useState<{
    dataScore: ChartData;
    optionsScore: ChartOptions;
  }>({
    dataScore: {
      labels: [],
      datasets: [],
    },
    optionsScore: {},
  });

  // Gráfica Pasos = Direccion
  const [stepsDirection, setStepsDirection] = useState<{
    dataStepsDirection: ChartData;
    optionsStepsDirection: ChartOptions;
  }>({
    dataStepsDirection: {
      labels: [],
      datasets: [],
    },
    optionsStepsDirection: {},
  });
  const [dataStepMode, setDataStepMode] = useState<{
    dataStepsMode: ChartData;
    optionsStepsMode: ChartOptions;
  }>({
    dataStepsMode: {
      labels: [],
      datasets: [],
    },
    optionsStepsMode: {},
  });

  // Gráfica Tiempo = Direccion
  const [dataTimeDirection, setDataTimeDirection] = useState<{
    dataTimeDirection: ChartData;
    optionsTimeDirection: ChartOptions;
  }>({
    dataTimeDirection: {
      labels: [],
      datasets: [],
    },
    optionsTimeDirection: {},
  });

  // Grafica Tiempo = Distribucion
  const [stepsDistributionTime, setStepsDistributionTime] = useState<{
    data: ChartData;
    options: ChartOptions;
  }>({
    data: {
      labels: [],
      datasets: [],
    },
    options: {},
  });

  // Gráfica Tiempo = Modo
  const [dataTimeMode, setDataTimeMode] = useState<{
    dataTimeMode: ChartData;
    optionsTimeMode: ChartOptions;
  }>({
    dataTimeMode: {
      labels: [],
      datasets: [],
    },
    optionsTimeMode: {},
  });

  // Gráfica Cadencia = Direccion
  const [dataCadenceDirection, setDataCadenceDirection] = useState<{
    dataCadenceDirection: ChartData;
    optionsCadenceDirection: ChartOptions;
  }>({
    dataCadenceDirection: {
      labels: [],
      datasets: [],
    },
    optionsCadenceDirection: {},
  });

  // Gráfica Cadencia = Modo
  const [dataCadenceMode, setDataCadenceMode] = useState<{
    dataCadenceMode: ChartData;
    optionsCadenceMode: ChartOptions;
  }>({
    dataCadenceMode: {
      labels: [],
      datasets: [],
    },
    optionsCadenceMode: {},
  });

  const viewSession = () => {
    const start_date_formated = startDate
      ? startDate.toISOString().split('T')[0]
      : null;
    const end_date_formated = endDate
      ? endDate.toISOString().split('T')[0]
      : null;
    navigate(
      `/authenticated/patients/${patient_id}/${start_date_formated}/${end_date_formated}`
    );
  };

  useEffect(() => {
    if (!access_token) return;
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

    const apiService = PatientsApiFactory();

    try {
      apiService
        .patientControllerFindOne(patient_id)
        .then((response) => {
          const _patient = response.data;

          const _sessions = _patient.sessions;

          const dates = _sessions.map((session) => {
            const sessionDate = new Date(session.date);
            return sessionDate.toISOString().split('T')[0];
          });

          setHighlightedDates(dates.sort());

          const { earlySession, lastSession } =
            getEarlyAndLastSession(_sessions);

          setPatient(_patient);

          setSessions(_sessions);

          setStartDate(earlySession ? new Date(earlySession.date) : null);
          setEndDate(lastSession ? new Date(lastSession.date) : null);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, [access_token, patient_id]);

  useEffect(() => {
    if (patient && patient.sessions) {
      if (startDate && endDate) {
        const filteredSessions = patient.sessions.filter((session) => {
          const sessionDate = new Date(session.date);
          return sessionDate >= startDate && sessionDate <= endDate;
        });
        setSessions(filteredSessions);
      }
    }
  }, [patient, startDate, endDate, t]);

  useEffect(() => {
    const sessionData = getTotalsOfSessions(sessions);

    const { dataStepsDistribution, optionsStepsDistribution } = getStepGraph(
      sessionData,
      documentStyle,
      t,
      window,
      true
    );
    const circularGraphTime = getStepGraphTime(
      sessionData,
      documentStyle,
      t,
      window
    );

    const { dataScore, optionsScore } = getScoreGraph(
      sessions,
      documentStyle,
      t,
      window
    );
    const { dataStepsDirection, optionsStepsDirection } =
      getStepsDirectionGraph(
        sessions,
        documentStyle,
        t,
        textColorSecondary,
        textColor,
        surfaceBorder
      );

    const { dataStepsMode, optionsStepsMode } = getDataStepsMode(
      sessions,
      documentStyle,
      t,
      textColorSecondary,
      textColor,
      surfaceBorder
    );
    const { dataTimeDirection, optionsTimeDirection } =
      getDataTimeDirectionGraphq(
        sessions,
        documentStyle,
        t,
        textColorSecondary,
        textColor,
        surfaceBorder
      );

    const { dataTimeMode, optionsTimeMode } = getDataTimeMode(
      sessions,
      documentStyle,
      t,
      textColorSecondary,
      textColor,
      surfaceBorder
    );

    const { dataCadenceDirection, optionsCadenceDirection } =
      getDataCadenceDirectionGraph(
        sessions,
        documentStyle,
        t,
        textColorSecondary,
        textColor,
        surfaceBorder
      );
    const { dataCadenceMode, optionsCadenceMode } = getDataCadenceModeGraph(
      sessions,
      documentStyle,
      t,
      textColorSecondary,
      textColor,
      surfaceBorder
    );

    // TODO: Usar funciones danfo
    setTotalSession(sessionData);
    setStepGraph({
      dataStepsDistribution,
      optionsStepsDistribution,
    });
    setStepsDistributionTime({
      data: circularGraphTime.dataStepsDistribution,
      options: circularGraphTime.optionsStepsDistribution,
    });

    setScoreGraph({
      dataScore,
      optionsScore,
    });
    setStepsDirection({
      dataStepsDirection,
      optionsStepsDirection,
    });
    setDataStepMode({
      dataStepsMode,
      optionsStepsMode,
    });
    setDataTimeDirection({
      dataTimeDirection,
      optionsTimeDirection,
    });
    setDataTimeMode({
      dataTimeMode,
      optionsTimeMode,
    });
    setDataCadenceDirection({ dataCadenceDirection, optionsCadenceDirection });
    setDataCadenceMode({
      dataCadenceMode,
      optionsCadenceMode,
    });
    setIsLoaded(true);
  }, [sessions]);

  const hasSessions = sessions.length > 0;
  return (
    <div className="col-12 xl:pl-7 xl:pr-7">
      <Toast ref={toast} />
      <div className="col-12">
        <div className="col-12 shadow-3 md:p-3 surface-card border-round-xl lg:h-full">
          <div className="p-3 flex align-items-center">
            <Button
              icon="pi pi-angle-left"
              rounded
              onClick={() => navigate('/authenticated/patients')}
              severity="secondary"
              className="mr-4"
              aria-label="Bookmark"
            />
            <div className="mr-2">
              <i className="pi pi-user text-3xl text-900"></i>
            </div>

            <div className="font-medium text-2xl text-700 ">
              {patient?.name} {patient?.surnames}
            </div>
          </div>

          <TabView
            className="lg:h-full"
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            {/* EDITAR PACIENTE */}
            <TabPanel header={t('pages.patients.viewPatient.editPatient')}>
              {patient && <EditPatient patient={patient} />}
            </TabPanel>
            {/* SESIONES */}
            <TabPanel
              className="px-0"
              header={t('pages.patients.viewPatient.sessions.title')}
            >
              <div className="col-12 text-center text-right">
                <Button
                  icon="pi pi-file-pdf"
                  onClick={() => viewSession()}
                  label={t('pages.patients.viewPatient.sessions.generate')}
                  className="p-button-secondary "
                  visible={hasSessions}
                />
              </div>

              <div className="text-center col-12 md:flex ">
                <div className="col-12 md:col-2 " />
                <div className="col-12 md:col-8">
                  <DateRangePicker
                    highlightedDates={highlightedDates}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    endDate={endDate}
                  />
                </div>
                <div className="col-12 md:col-2 " />
              </div>
              {hasSessions && (
                <div>
                  <div className="col-12 px-0">
                    {isLoaded && (
                      <SessionSummaryBar
                        total_sessions={sessions.length}
                        total_steps={totalSession.total_steps_total}
                        total_time={totalSession.total_time_use}
                        total_time_walking={totalSession.total_time_walking}
                        total_time_standing={totalSession.total_time_standing}
                        average_steps_session={totalSession.median_total_steps}
                        average_time_session={totalSession.median_total_time}
                      />
                    )}
                  </div>
                  <div className="col-12 px-0">
                    <ContainerForGraphics
                      updateResize={updateResize}
                      dataStepsDistribution={stepGraph.dataStepsDistribution}
                      optionsStepsDistribution={
                        stepGraph.optionsStepsDistribution
                      }
                      dataTimeDistribution={stepsDistributionTime.data}
                      optionsTimeDistribution={stepsDistributionTime.options}
                      dataScore={scoreGraph.dataScore}
                      optionsScore={scoreGraph.optionsScore}
                      dataStepsDirection={stepsDirection.dataStepsDirection}
                      optionsStepsDirection={
                        stepsDirection.optionsStepsDirection
                      }
                      dataStepsMode={dataStepMode.dataStepsMode}
                      optionsStepsMode={dataStepMode.optionsStepsMode}
                      dataTimeDirection={dataTimeDirection.dataTimeDirection}
                      optionsTimeDirection={
                        dataTimeDirection.optionsTimeDirection
                      }
                      dataTimeMode={dataTimeMode.dataTimeMode}
                      optionsTimeMode={dataTimeMode.optionsTimeMode}
                      dataCadenceDirection={
                        dataCadenceDirection.dataCadenceDirection
                      }
                      optionsCadenceDirection={
                        dataCadenceDirection.optionsCadenceDirection
                      }
                      dataCadenceMode={dataCadenceMode.dataCadenceMode}
                      optionsCadenceMode={dataCadenceMode.optionsCadenceMode}
                    />
                  </div>
                </div>
              )}
              {!hasSessions && (
                <div className="text-center font-bold py-5">
                  <i className="pi pi-exclamation-triangle pr-2"></i>
                  {t('pages.patients.viewPatient.noSessions')}...
                </div>
              )}
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
}

export function showDisplayDataLabels(width: number) {
  if (width >= 450 && width < 1199) {
    return true;
  } else if (width <= 449) {
    return false;
  } else {
    return true;
  }
}

export default Patient;
