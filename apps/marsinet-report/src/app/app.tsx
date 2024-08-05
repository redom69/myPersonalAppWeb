/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChartData, ChartOptions } from 'chart.js';
import { BrowserRouter } from 'react-router-dom';

// IMPORTACIONES DE LAS GRÁFICAS
import {
  DataLastSessionReceived,
  DataSessionsLastMonth,
  DataSessionsMadeFromTheStart,
} from '@marsinet/web-commons';

import {
  ComparativeTableOfLastSessionDataAgainstHistoricalAndLatestMonthlyDataInterface,
  TableScoreLastSessionDataInterface,
  getEarlyAndLastSession,
  getTotalsOfSessions,
} from '@marsinet/commons';

// TRADUCCIONES i18n
import { useTranslation } from 'react-i18next';

import { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { DateTime } from 'luxon';
import axios from 'axios';
/* eslint-disable-next-line */
export interface InformeProps {}

export function Informe(props: InformeProps) {
  // Get query parmas from url with react router
  const query = new URLSearchParams(window.location.search);
  const patient_id = query.get('patient_id');
  const start_date = query.get('start');
  const end_date = query.get('end');

  const { t, i18n } = useTranslation();

  const [updateResize, setUpdateResize] = useState<boolean>(false);
  const createAt = DateTime.now().toLocaleString(DateTime.DATE_FULL);

  const updateResizeGraph = () => {
    setUpdateResize(!updateResize);
  };

  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue(
    '--text-color-secondary'
  );
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  // DATA AND OPTIONS GRAPH TOTAL STEPS
  const dataGraphTotalSteps: ChartData = {
    labels: [
      'S1',
      'S2',
      'S3',
      'S4',
      'S5',
      'S6',
      'S7',
      'S8',
      'S9',
      'S10',
      'S11',
      'S12',
      'S13',
      'S14',
      'S15',
      'S16',
      'S17',
      'S18',
      'S19',
    ],
    datasets: [
      {
        label: t('pages.reports.totalSteps'),
        data: [
          10, 20, 15, 30, 10, 20, 15, 30, 10, 20, 15, 30, 10, 20, 15, 30, 20,
          15, 30,
        ],
        borderWidth: 1,
      },
    ],
  };
  const optionsGraphTotalSteps: ChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 35,
        title: {
          display: true,
          text: t('pages.reports.steps'),
          color: textColor,
        },
      },
    },
  };

  // DATA AND OPTIONS GRAPH DISTRIBUTION OF THE STEPS PERFORMED ON THE LAST DAY
  const dataGraphDistributionOfTheStepsPerformedOnTheLastDayProps: ChartData = {
    labels: [
      t('pages.reports.graphs.forwardIntention'),
      t('pages.reports.graphs.automaticForward'),
      t('pages.reports.graphs.backwardIntention'),
      t('pages.reports.graphs.automaticBackward'),
    ],
    datasets: [
      {
        data: [15, 38, 6, 41],
        backgroundColor: ['#004E78', '#13DFB6', '#DF8F13', '#DF1351'],
        hoverBackgroundColor: ['#005A94', '#17E8CC', '#F1A830', '#F14567'],
      },
    ],
  };
  const optionsGraphDistributionOfTheStepsPerformedOnTheLastDayProps: ChartOptions =
    {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            pointStyle: 'circle',
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const value =
                dataGraphDistributionOfTheStepsPerformedOnTheLastDayProps
                  .datasets[0].data[context.dataIndex];

              return `${value}%`;
            },
          },
        },
        datalabels: { display: false },
      },
    };

  // DATA AND OPTIONS GRAPH STEPS PER DAY AND MODE
  const dataGraphStepsPerDayAndModeProps: ChartData = {
    labels: [
      '15/05/2023',
      '16/05/2023',
      '17/05/2023',
      '18/05/2023',
      '19/05/2023',
    ],
    datasets: [
      {
        label: t('pages.reports.graphs.forwardIntention'),
        data: [57, 23, 81, 10, 42],
        fill: false,
        borderColor: '#004E78',
        tension: 0,
      },
      {
        label: t('pages.reports.graphs.automaticForward'),
        data: [16, 33, 75, 9, 64],
        fill: false,
        borderColor: '#13DFB6',
        tension: 0,
      },
      {
        label: t('pages.reports.graphs.backwardIntention'),
        data: [86, 52, 37, 11, 29],
        fill: false,
        borderColor: '#DF8F13',
        tension: 0,
      },
      {
        label: t('pages.reports.graphs.automaticBackward'),
        data: [68, 5, 39, 88, 17],
        fill: false,
        borderColor: '#DF1351',
        tension: 0,
      },
    ],
  };
  const optionsGraphStepsPerDayAndModeProps: ChartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
        },
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
        title: {
          display: true,
          text: t('pages.reports.steps'),
          color: textColor,
        },
      },
    },
  };

  // DATA AND OPTIONS GRAPH DAILY EVOLUTION OF THE SCORE
  const dataGraphDailyEvolutionOfTheScoreProps: ChartData = {
    labels: [
      '15/05/2023',
      '16/05/2023',
      '17/05/2023',
      '18/05/2023',
      '19/05/2023',
    ],
    datasets: [
      {
        label: t('pages.reports.graphs.automaticForward'),
        data: [32, 25, 35, 38, 41],
        fill: false,
        borderColor: '#004E78',
        tension: 0,
        datalabels: {
          align: 'end',
          anchor: 'end',
        },
      },
    ],
  };
  const optionsGraphDailyEvolutionOfTheScoreProps: ChartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        top: 32,
        right: 16,
        bottom: 16,
        left: 8,
      },
    },
    scales: {
      y: {
        stacked: true,
        display: true,
        max: 90,
        min: 0,
        title: {
          display: true,
          text: t('pages.reports.steps'),
          color: textColor,
        },
      },
    },
  };

  // DATA AND OPTIONS GRAPH TOTAL NUMBER OF STEPS FROM START
  const dataGraphTotalNumberOfStepsFromStart: ChartData = {
    labels: [t('july'), t('june')],
    datasets: [
      {
        label: t('pages.reports.graphs.forwardIntention'),
        data: [300, 600],
        backgroundColor: ['#004E78'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.automaticForward'),
        data: [1500, 860],
        backgroundColor: ['#13DFB6'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.backwardIntention'),
        data: [500, 500],
        backgroundColor: ['#DF8F13'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.automaticBackward'),
        data: [350, 550],
        backgroundColor: ['#DF1351'],
        borderWidth: 1,
      },
    ],
  };
  const optionsGraphTotalNumberOfStepsFromStart: ChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      datalabels: {
        display: false,
      },
    },

    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 3000,
        stacked: true,
        title: {
          display: true,
          text: t('pages.reports.steps'),
          color: textColor,
        },
      },
      x: {
        stacked: true,
      },
    },
  };

  // DATA AND OPTIONS GRAPH TOTAL AMOUNT OF TIMES SINCE START
  const dataGraphTotalAmountOfTimesSinceStart: ChartData = {
    labels: [t('july'), t('june')],
    datasets: [
      {
        label: t('pages.reports.graphs.forwardIntention'),
        data: [300, 600],
        backgroundColor: ['#004E78'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.automaticForward'),
        data: [1500, 860],
        backgroundColor: ['#13DFB6'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.backwardIntention'),
        data: [500, 500],
        backgroundColor: ['#DF8F13'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.automaticBackward'),
        data: [350, 550],
        backgroundColor: ['#DF1351'],
        borderWidth: 1,
      },
    ],
  };
  const optionsGraphTotalAmountOfTimesSinceStart: ChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      datalabels: {
        display: false,
      },
    },

    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 3000,
        stacked: true,
        title: {
          display: true,
          text: t('pages.reports.time'),
          color: textColor,
        },
      },
      x: {
        stacked: true,
      },
    },
  };

  // DATA AND OPTIONS GRAPH MONTHLY EVOLUTION OF THE SCORE
  const dataGraphMonthlyEvolutionOfTheScore: ChartData = {
    labels: [t('JANUARY'), t('FEBRUARY'), t('MARCH'), t('JUNE'), t('JULY')],
    datasets: [
      {
        label: t('pages.reports.graphs.automaticForward'),
        data: [28, 29, 27.3, 30, 31],
        fill: false,
        borderColor: '#004E78',
        tension: 0,
        datalabels: {
          align: 'end',
          anchor: 'end',
        },
      },
    ],
  };
  const optionsGraphMonthlyEvolutionOfTheScore: ChartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        top: 32,
        right: 16,
        bottom: 16,
        left: 8,
      },
    },
    scales: {
      y: {
        stacked: true,
        display: true,
        max: 40,
        beginAtZero: true,
        min: 0,
        title: {
          display: true,
          text: t('pages.reports.score'),
          color: textColor,
        },
      },
    },
  };

  const [patient, setPatient] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [earlySession, setEarlySession] = useState<any>(null);
  const [lastSession, setLastSession] = useState<any>(null);

  const [percentageScore, setPercentageScore] = useState<number>(0);

  const optionsDate: any = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // DATOS ULTIMA SESION RECIBIDA
  const [lastSessionReceived, setLastSessionReceived] =
    useState<DataLastSessionReceived>({ steps: 0, time: 0, score: 0 });

  // DATOS SESIONES REALIZADAS EN EL ULTIMO MES
  const [lastSessionsMonth, setLastSessionsMonth] =
    useState<DataSessionsLastMonth>({
      steps: 0,
      last_date: '',
      time: 0,
      num_sessions: 0,
      score: 0,
    });

  // DATOS SESIONES REALIZADAS DESDE EL INICIO
  const [sessionsMadeFromTheStart, setSessionsMadeFromTheStart] =
    useState<DataSessionsMadeFromTheStart>({
      steps: 0,
      last_date: '',
      time: 0,
      num_sessions: 0,
      score: 0,
    });

  // REPORTE SEGUIMIENTO DIAGNOSTICO
  const [diagnostic, setDiagnostic] = useState<string>('');

  // OBJETIVOS
  const [targets, setTargets] = useState<string>('');

  // DESCRIPCION
  const [description, setDescription] = useState<string>('');

  // COMENTARIOS // HALLAZGOS
  const [commentsAndFindings, setCommentsAndFinding] = useState<string>('');

  // TABLA ULTIMA SESION RECIBIDA
  const [dataTableScoreLastSessions, setDataTableScoreLastSessions] =
    useState<TableScoreLastSessionDataInterface>();

  // TABLA COMPARATIVA DE LOS DATOS DE LA ÚLTIMA SESIÓN CON RESPECTO A LOS HISTÓRICOS Y ÚLTIMOS MENSUALES
  const [
    dataTableOfLastSessionDataAgainstHistorical,
    setDataTableOfLastSessionDataAgainstHistorical,
  ] =
    useState<ComparativeTableOfLastSessionDataAgainstHistoricalAndLatestMonthlyDataInterface>();

  // --------------------------------------

  const [languageChanged, setLanguageChanged] = useState<boolean>(false);

  const getDateToString = (date: any) => {
    if (!date) return t('noData');
    return String(date).split('T')[0];
  };

  useEffect(() => {
    window.addEventListener('resize', updateResizeGraph);
    return () => window.removeEventListener('resize', updateResizeGraph);
  });

  useEffect(() => {
    if (!patient_id) return;

    axios
      .get(
        `b348fd12-8f4c-11ee-9946-dbaaaabbe5b9/b46e56a6-8f4c-11ee-959c-034b050d71b2/b4c5c5da-8f4c-11ee-aeae-07d4f942d6e1/b51819ca-8f4c-11ee-8cd3-3302d0c50040/${patient_id}`
      )
      .then(({ data }) => {
        const _patient = data;
        setPatient(_patient);

        const _sessions = _patient.sessions;
        // Primer y ultimo uso del dispositivo
        const { earlySession, lastSession } = getEarlyAndLastSession(_sessions);
        setEarlySession(earlySession);
        setLastSession(lastSession);

        // SETEO PORCENTAJE PUNTUACION
        setPercentageScore(100);

        // SETEO DATOS ULTIMA SESION RECIBIDA
        setLastSessionReceived({
          steps: lastSession?.steps_total,
          time: lastSession?.time_total,
          score: 0,
        });
      })
      .catch(console.error);
  }, [patient_id]);

  useEffect(() => {
    if (!start_date || !end_date) return;

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    if (patient && patient.sessions) {
      setSessions(
        patient.sessions.filter((session: any) => {
          const sessionDate = new Date(session.date);
          if (startDate && endDate) {
            return sessionDate >= startDate && sessionDate <= endDate;
          } else if (startDate && !endDate) {
            return sessionDate >= startDate;
          } else if (!startDate && endDate) {
            return sessionDate <= endDate;
          } else {
            return true;
          }
        })
      );
    }
  }, [patient, start_date, end_date]);

  useEffect(() => {
    setLanguageChanged(!languageChanged);

    const sessionData = getTotalsOfSessions(sessions);

    // const { dataScore, optionsScore } = getScoreGraph(
    //   sessions,
    //   documentStyle,
    //   t
    // );
    // const { dataStepsDirection, optionsStepsDirection } =
    //   getStepsDirectionGraph(
    //     sessions,
    //     documentStyle,
    //     t,
    //     textColorSecondary,
    //     textColor,
    //     surfaceBorder
    //   );

    // const { dataStepsMode, optionsStepsMode } = getDataStepsMode(
    //   sessions,
    //   documentStyle,

    // SETEO DATOS SESION ULTIMO MES
    // TODO: hacer un filtro
    setLastSessionsMonth({
      steps: 22,
      last_date: new Date(lastSession?.date).toLocaleDateString(
        i18n.language,
        optionsDate
      ),
      time: 0,
      num_sessions: 0,
      score: 0,
    });

    // SETEO DATOS SESIONES REALIZADAS DESDE EL INICIO

    setSessionsMadeFromTheStart({
      steps: sessionData.total_steps_total,
      last_date: new Date(earlySession?.date).toLocaleDateString(
        i18n.language,
        optionsDate
      ),
      time: sessionData.total_time_total,
      num_sessions: sessions.length,
      score: 0,
    });

    // SETEO de Tabla de puntuación con los datos de la última sesión
    setDataTableScoreLastSessions({
      automaticSteps: {
        forward: {
          result: 277,
          index: 13.85,
        },
        backward: {
          result: 155,
          index: 7.75,
        },
      },
      intentionalSteps: {
        forward: {
          result: 60,
          index: 9,
        },
        backward: {
          result: 89,
          index: 13.35,
        },
      },
      cadence: {
        automatic_backward: {
          result: 12,
          index: 0.6,
        },
        intentional_backward: {
          result: 12.6,
          index: 1.89,
        },
        automatic_forward: {
          result: 12,
          index: 0.6,
        },
        intentional_forward: {
          result: 12.6,
          index: 1.89,
        },
      },
      flexos: {
        hip: {
          result: 0,
          index: 0,
        },
        knee: {
          result: 0,
          index: 0,
        },
      },
      threshold: {
        hipL: {
          result: 3,
          index: 0.15,
        },
        kneeL: {
          result: 3,
          index: 0.15,
        },
        hipR: {
          result: 3,
          index: 0.15,
        },
        kneeR: {
          result: 3,
          index: 0.15,
        },
      },
      therapist: {
        dungarees: {
          result: 5,
          index: 0.25,
        },
        effort: {
          result: 5,
          index: 0.5,
        },
      },
      total: 0,
    });
    // SETEO Tabla comparativa de los datos de la última sesión con respecto a los históricos y últimos mensuales
    setDataTableOfLastSessionDataAgainstHistorical({
      automaticSteps: {
        historical: {
          forward: {
            result: 0,
            index: 0,
          },
          backward: {
            result: 0,
            index: 0,
          },
        },
        lastMonth: {
          forward: {
            result: 0,
            index: 0,
          },
          backward: {
            result: 0,
            index: 0,
          },
        },
        lastSession: {
          forward: {
            result: 0,
            index: 0,
          },
          backward: {
            result: 0,
            index: 0,
          },
        },
      },
      intentionalSteps: {
        historical: {
          forward: {
            result: 0,
            index: 0,
          },
          backward: {
            result: 0,
            index: 0,
          },
        },
        lastMonth: {
          forward: {
            result: 0,
            index: 0,
          },
          backward: {
            result: 0,
            index: 0,
          },
        },
        lastSession: {
          forward: {
            result: 0,
            index: 0,
          },
          backward: {
            result: 0,
            index: 0,
          },
        },
      },
      cadence: {
        historical: {
          automatic: {
            result: 0,
            index: 0,
          },
          intentional: {
            result: 0,
            index: 0,
          },
        },
        lastMonth: {
          automatic: {
            result: 0,
            index: 0,
          },
          intentional: {
            result: 0,
            index: 0,
          },
        },
        lastSession: {
          automatic: {
            result: 0,
            index: 0,
          },
          intentional: {
            result: 0,
            index: 0,
          },
        },
      },
      flexos: {
        historical: {
          hip: {
            result: 0,
            index: 0,
          },
          knee: {
            result: 0,
            index: 0,
          },
        },
        lastMonth: {
          hip: {
            result: 0,
            index: 0,
          },
          knee: {
            result: 0,
            index: 0,
          },
        },
        lastSession: {
          hip: {
            result: 0,
            index: 0,
          },
          knee: {
            result: 0,
            index: 0,
          },
        },
      },
      threshold: {
        historical: {
          hipl: {
            result: 0,
            index: 0,
          },
          kneel: {
            result: 0,
            index: 0,
          },
          hipr: {
            result: 0,
            index: 0,
          },
          kneer: {
            result: 0,
            index: 0,
          },
        },
        lastMonth: {
          hipl: {
            result: 0,
            index: 0,
          },
          kneel: {
            result: 0,
            index: 0,
          },
          hipr: {
            result: 0,
            index: 0,
          },
          kneer: {
            result: 0,
            index: 0,
          },
        },
        lastSession: {
          hipl: {
            result: 0,
            index: 0,
          },
          kneel: {
            result: 0,
            index: 0,
          },
          hipr: {
            result: 0,
            index: 0,
          },
          kneer: {
            result: 0,
            index: 0,
          },
        },
      },
      therapist: {
        historical: {
          dungarees: {
            result: 0,
            index: 0,
          },
          effort: {
            result: 0,
            index: 0,
          },
        },
        lastMonth: {
          dungarees: {
            result: 0,
            index: 0,
          },
          effort: {
            result: 0,
            index: 0,
          },
        },
        lastSession: {
          dungarees: {
            result: 0,
            index: 0,
          },
          effort: {
            result: 0,
            index: 0,
          },
        },
      },
      totalHistorical: 0,
      totalLastMonth: 0,
      totalLastSession: 0,
    });

    // SETEO REPORTE SEGUIMIENTO DIAGNOSTICO
    setDiagnostic('Diagnóstico...');

    // SETEO OBJETIVOS
    setTargets('Objetivos...');

    // SETO DESCRIPCION
    setDescription('Descripción...');

    // SETEO COMENTARIOS Y HALLAZGOS
    setCommentsAndFinding('Comentarios y Hallazgos');

    //   t,
    //   textColorSecondary,
    //   textColor,
    //   surfaceBorder
    // );
    // const { dataTimeDirection, optionsTimeDirection } =
    //   getDataTimeDirectionGraphq(
    //     sessions,
    //     documentStyle,
    //     t,
    //     textColorSecondary,
    //     textColor,
    //     surfaceBorder
    //   );

    // const { dataTimeMode, optionsTimeMode } = getDataTimeMode(
    //   sessions,
    //   documentStyle,
    //   t,
    //   textColorSecondary,
    //   textColor,
    //   surfaceBorder
    // );

    // const { dataCadenceDirection, optionsCadenceDirection } =
    //   getDataCadenceDirectionGraph(
    //     sessions,
    //     documentStyle,
    //     t,
    //     textColorSecondary,
    //     textColor,
    //     surfaceBorder
    //   );
    // const { dataCadenceMode, optionsCadenceMode } = getDataCadenceModeGraph(
    //   sessions,
    //   documentStyle,
    //   t,
    //   textColorSecondary,
    //   textColor,
    //   surfaceBorder
    // );

    // setTotalSession(sessionData);
    // setStepGraph({
    //   dataStepsDistribution,
    //   optionsStepsDistribution,
    // });
    // setScoreGraph({
    //   dataScore,
    //   optionsScore,
    // });
    // setStepsDirection({
    //   dataStepsDirection,
    //   optionsStepsDirection,
    // });
    // setDataStepMode({
    //   dataStepsMode,
    //   optionsStepsMode,
    // });
    // setDataTimeDirection({
    //   dataTimeDirection,
    //   optionsTimeDirection,
    // });
    // setDataTimeMode({
    //   dataTimeMode,
    //   optionsTimeMode,
    // });
    // setDataCadenceDirection({ dataCadenceDirection, optionsCadenceDirection });
    // setDataCadenceMode({
    //   dataCadenceMode,
    //   optionsCadenceMode,
    // });
    // setIsLoaded(true);
  }, [sessions, updateResize, i18n.language]);
  return (
    <BrowserRouter>
      <div className="">
        {/* -------------------------------------------------PAGINA 1 ------------------------------------------------- */}

        {/* CABECERA INFORME - PÁGINA 1*/}
        <div className="flex align-items-center justify-content-between break-page">
          <img
            src="/assets/marsi-azul-degradado-fondo-blanco.png"
            alt="logo marsinet"
            style={{ width: '110px' }}
          />
          <div className="surface-ground p-2 border-round-3xl text-xs text-600">
            {t('pages.reports.createAt')}:{' '}
            <span className="font-bold">{createAt}</span>
          </div>
        </div>

        {/* RESUMEN DE SESIÓN */}
        <div className="text-center">
          <div className="text-md font-bold">
            {t('pages.reports.sessionSummary')}
          </div>
        </div>

        {/* DATOS DEL PACIENTE */}
        <div className="my-4 border-1 surface-border border-solid border-round-2xl">
          <div className="font-bold text-700 text-md p-3">
            {t('pages.reports.patientData')}
          </div>
          <div className="surface-border border-top border-solid"></div>
          <div className="grid grid-nogutter">
            <div className="col-6 p-3">
              <div className="text-500 font-medium mb-2">
                {t('pages.reports.nameSurname')}
              </div>
              <div className="text-900">
                {patient?.name} {patient?.surnames}
              </div>
            </div>
            <div className="col-6 p-3">
              <div className="text-500 font-medium mb-2">
                {t('pages.reports.birthDate')}
              </div>
              <div className="text-900">
                {getDateToString(patient?.birth_date)}
              </div>
            </div>
            <div className="col-6 p-3">
              <div className="text-500 font-medium mb-2">
                {t('pages.reports.lastUseDevice')}
              </div>
              <div className="text-900">
                {getDateToString(lastSession?.date)}
              </div>
            </div>
            <div className="col-6 p-3">
              <div className="text-500 font-medium mb-2">
                {t('pages.reports.firstUseDevice')}
              </div>
              <div className="text-900">
                {getDateToString(earlySession?.date)}
              </div>
            </div>
            <div className="col-6 p-3">
              <div className="text-500 font-medium mb-2">
                {t('pages.reports.identificationNumber')}
              </div>
              <div className="text-900 line-height-3">{patient?.nif}</div>
            </div>
            <div className="col-6 p-3">
              <div className="text-500 font-medium mb-2">
                {t('pages.reports.totalNumberofSessionsWithDevice')}
              </div>
              <div className="text-900">{sessions.length}</div>
            </div>
          </div>
        </div>

        {/* RESULTADOS */}
        <div className="my-4">
          <div className="text-center text-md mb-3 my-2">
            <span className="font-italic">
              {t('pages.reports.yourResults')}
            </span>
            <div className="grid grid-nogutter align-items-end	justify-content-center gap-2 mt-4">
              <div className="col-3 h-7rem surface-ground p-3 border-round-2xl border-solid border-1 surface-border flex flex-column justify-content-center align-items-center">
                <span className="text-4xl font-bold">
                  {patient?.total_steps}
                </span>
                <span className="text-500 font-italic	">
                  {t('pages.reports.totalSteps')}
                </span>
              </div>
              <div className="col-3 h-10rem surface-ground p-3 border-round-2xl border-solid border-1 surface-border bg-primary-reverse flex flex-column justify-content-center align-items-center">
                <span className="text-5xl font-bold">{percentageScore}%</span>
                <span className="text-500 font-italic	">
                  {t('pages.reports.score')}
                </span>
              </div>
              <div className="col-3 h-7rem surface-ground p-3 border-round-2xl border-solid border-1 surface-border flex flex-column justify-content-center align-items-center">
                <span className="text-4xl font-bold">
                  {patient?.total_session}
                </span>
                <span className="text-500 font-italic	">
                  {t('pages.reports.totalTime')}
                </span>
              </div>
            </div>
            <div className="mt-3 text-700 font-italic	">
              {t('pages.reports.performed')}{' '}
              <strong>
                {patient?.total_steps} {t('pages.reports.steps')}
              </strong>
            </div>
          </div>
        </div>

        {/* GRÁFICA 1: PASOS */}
        <div className="flex alignt-items-center justify-content-center">
          <div className="graph-and-container-width">
            <Chart
              key={Math.random()}
              type="bar"
              data={dataGraphTotalSteps}
              options={optionsGraphTotalSteps}
            />
          </div>
        </div>

        {/* ----------------------------------------------------------------------------------------------------------- */}

        {/* -------------------------------------------------PAGINA 2 ------------------------------------------------- */}

        {/* CABECERA PAGINA 2 */}
        <div className="flex align-items-center justify-content-between break-page">
          <img
            src="/assets/marsi-azul-degradado-fondo-blanco.png"
            alt="logo marsinet"
            style={{ width: '110px' }}
          />
          <div className="surface-ground p-2 border-round-3xl text-xs text-600">
            {t('pages.reports.createAt')}:{' '}
            <span className="font-bold">{createAt}</span>
          </div>
        </div>

        {/* REPORTE SEGUIMIENTO*/}
        <div className=" border-1 surface-border border-solid my-3 border-round-2xl">
          <div className="font-bold text-700 text-md p-3">
            {t('pages.reports.followUpReport')}
          </div>
          <div className="surface-border border-top border-solid"></div>
          <div className="grid grid-nogutter">
            <div className="col-6 p-3">
              <div className="text-500 font-medium mb-2">
                {t('pages.reports.nameSurname')}
              </div>
              <div className="text-900">
                {patient?.name} {patient?.surnames}
              </div>
            </div>
            <div className="col-6 p-3">
              <div className="text-500 font-medium mb-2">
                {t('pages.reports.lastUseDevice')}
              </div>
              <div className="text-900">
                {getDateToString(lastSession?.date)}
              </div>
            </div>
            <div className="col-6 p-3">
              <div className="text-500 font-medium mb-2">
                {t('pages.reports.birthDate')}
              </div>
              <div className="text-900">
                {getDateToString(patient?.birth_date)}
              </div>
            </div>
            <div className="col-6 p-3">
              <div className="text-500 font-medium mb-2">
                {t('pages.reports.firstUseDevice')}
              </div>
              <div className="text-900">
                {getDateToString(earlySession?.date)}
              </div>
            </div>
            <div className="col-6 p-3">
              <div className="text-500 font-medium mb-2">
                {t('pages.reports.identificationNumber')}
              </div>
              <div className="text-900 line-height-3">{patient?.nif}</div>
            </div>
            <div className="col-6 p-3">
              <div className="text-500 font-medium mb-2">
                {t('pages.reports.totalNumberofSessionsWithDevice')}
              </div>
              <div className="text-900">{sessions.length}</div>
            </div>
            <div className="col-12 p-3">
              <div className="text-500 font-medium mb-2">
                {t('pages.reports.diagnostic')}
              </div>
              <div className="text-900 text-justify">{diagnostic}</div>
            </div>
          </div>
        </div>

        {/* OBJETIVOS Y DESCRIPCION */}
        <div className=" border-1 surface-border border-solid my-3 border-round-2xl">
          <div className="font-bold text-700 text-md p-3">
            {t('pages.reports.targets')}
          </div>
          <div className="surface-border border-top border-solid"></div>
          <div className="text-justify text-sm p-3">{targets}</div>
        </div>

        <div className=" border-1 surface-border border-solid my-3 border-round-2xl">
          <div className="font-bold text-700 text-md p-3">
            {t('pages.reports.description')}
          </div>
          <div className="surface-border border-top border-solid"></div>
          <div className="text-justify text-sm p-3">{description}</div>
        </div>

        {/* ----------------------------------------------------------------------------------------------------------- */}

        {/* -------------------------------------------------PAGINA 3 ------------------------------------------------- */}

        {/* CABECERA PAGINA 3 */}
        <div className="flex align-items-center justify-content-between break-page">
          <img
            src="/assets/marsi-azul-degradado-fondo-blanco.png"
            alt="logo marsinet"
            style={{ width: '110px' }}
          />
          <div className="surface-ground p-2 border-round-3xl text-xs text-600">
            {t('pages.reports.createAt')}:{' '}
            <span className="font-bold">{createAt}</span>
          </div>
        </div>

        {/* ÚLTIMA SESIÓN RECIBIDA*/}
        <div className="surface-card">
          <div className="text-center mb-5">
            <div className="text-md font-bold">
              {t('pages.reports.lastSessionReceived.title')}
            </div>
          </div>
          <div className="text-large mb-3">
            {t('pages.reports.lastSessionReceived.totalSteps')}{' '}
            <strong>
              {lastSessionReceived.steps}{' '}
              {t('pages.reports.lastSessionReceived.steps')}
            </strong>
            . <br />
            <strong>
              102 {t('pages.reports.lastSessionReceived.timeMeasurement')}
            </strong>{' '}
            {t('pages.reports.lastSessionReceived.time')}
            . <br />
            <strong>{lastSessionReceived.score}</strong>{' '}
            {t('pages.reports.lastSessionReceived.score')}
          </div>
        </div>

        {/* GRÁFICA DISTRIBUCIÓN DE LOS PASOS REALIZADOS EN EL ÚLTIMO DÍA */}
        <div className="flex alignt-items-center justify-content-center">
          <div className="graph-and-container-width-2">
            <Chart
              key={Math.random()}
              type="doughnut"
              data={dataGraphDistributionOfTheStepsPerformedOnTheLastDayProps}
              options={
                optionsGraphDistributionOfTheStepsPerformedOnTheLastDayProps
              }
            />
          </div>
        </div>

        {/* CABECERA PAGINA 3 */}
        <div className="flex align-items-center justify-content-between break-page">
          <img
            src="/assets/marsi-azul-degradado-fondo-blanco.png"
            alt="logo marsinet"
            style={{ width: '110px' }}
          />
          <div className="surface-ground p-2 border-round-3xl text-xs text-600">
            {t('pages.reports.createAt')}:{' '}
            <span className="font-bold">{createAt}</span>
          </div>
        </div>

        {/* TABLA PUNTUACIÓN ÚLTIMA SESIÓN */}
        <div className="my-3">
          <div className="font-bold text-center text-md mb-4">
            {t('pages.reports.tables.titleLastSessions')}
          </div>
          <div className="grid grid-nogutter">
            {/* ENCABEZADO */}
            <div className="col-3 surface-border border-solid border-1 h-1cm	table-border-style-radius-left"></div>
            <div className="col-3 surface-border border-solid border-1 h-1cm	"></div>
            <div className="col-3 surface-border border-solid border-1 font-bold text-right h-1cm flex align-items-center justify-content-end px-2 text-xs">
              {t('pages.reports.tables.result')}
            </div>
            <div className="col-3 surface-border border-solid border-1 table-border-style-radius-right font-bold text-right h-1cm flex align-items-center justify-content-end px-2 text-xs">
              {t('pages.reports.tables.index')}
            </div>

            {/* PASOS EN AUTOMÁTICO */}
            <div className="col-3 font-bold surface-border border-solid border-x-1 border-top-none border-bottom-1 flex align-items-center justify-content-start px-2 text-xs">
              {t('pages.reports.tables.stepsAutomatic')}
            </div>
            <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
              <div className="flex flex-column">
                <div className="col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none text-xs">
                  {t('pages.reports.tables.forward')}
                </div>
                <div className="col-12 text-xs">
                  {t('pages.reports.tables.backward')}
                </div>
              </div>
            </div>
            <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
              <div className="flex flex-column text-right">
                <div className="col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none text-xs">
                  {dataTableScoreLastSessions?.automaticSteps.forward.result}
                </div>
                <div className="col-12 text-xs">
                  {dataTableScoreLastSessions?.automaticSteps.backward.result}
                </div>
              </div>
            </div>
            <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
              <div className="flex flex-column text-right">
                <div className="col-12 bg-green-200 ">
                  <div className="text-xs">
                    {' '}
                    {dataTableScoreLastSessions?.automaticSteps.forward.index}
                  </div>
                </div>
                <div className="col-12 bg-red-200">
                  <div className="text-xs">
                    {dataTableScoreLastSessions?.automaticSteps.backward.index}
                  </div>
                </div>
              </div>
            </div>
            {/* PASOS con intención hacia */}
            <div className="col-3 font-bold surface-border border-solid border-x-1 border-top-none border-bottom-1 flex align-items-center justify-content-start px-2 text-xs">
              {t('pages.reports.tables.stepsIntention')}
            </div>
            <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
              <div className="flex flex-column">
                <div className="col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none text-xs">
                  {t('pages.reports.tables.forward')}
                </div>
                <div className="col-12 text-xs">
                  {t('pages.reports.tables.backward')}
                </div>
              </div>
            </div>
            <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
              <div className="flex flex-column text-right">
                <div className="col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none text-xs">
                  {dataTableScoreLastSessions?.intentionalSteps.forward.result}
                </div>
                <div className="col-12 text-xs">
                  {dataTableScoreLastSessions?.intentionalSteps.backward.result}
                </div>
              </div>
            </div>
            <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
              <div className="flex flex-column text-right">
                <div className="col-12 bg-orange-200 ">
                  <div className="text-xs">
                    {dataTableScoreLastSessions?.intentionalSteps.forward.index}
                  </div>
                </div>
                <div className="col-12 bg-green-200 ">
                  <div className="text-xs">
                    {
                      dataTableScoreLastSessions?.intentionalSteps.backward
                        .index
                    }
                  </div>
                </div>
              </div>
            </div>
            {/* CADENCIA */}
            <div className="col-3 font-bold surface-border border-solid border-x-1 border-top-none border-bottom-1 flex align-items-center justify-content-start px-2 text-xs">
              {t('pages.reports.tables.cadence')}
            </div>
            <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
              <div className="flex flex-column">
                <div className="col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none text-xs">
                  {t('pages.reports.tables.automatic')}
                </div>
                <div className="col-12 text-xs">
                  {t('pages.reports.tables.intention')}
                </div>
              </div>
            </div>
            <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
              <div className="flex flex-column text-right">
                <div className="col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none text-xs">
                  {dataTableScoreLastSessions?.cadence.automatic_forward.result}
                </div>
                <div className="col-12 text-xs">
                  {
                    dataTableScoreLastSessions?.cadence.automatic_backward
                      .result
                  }
                </div>
              </div>
            </div>
            <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
              <div className="flex flex-column text-right">
                <div className="col-12 bg-red-200 ">
                  <div className="text-xs">
                    {
                      dataTableScoreLastSessions?.cadence.automatic_forward
                        .index
                    }
                  </div>
                </div>
                <div className="col-12 bg-green-200 ">
                  <div className="text-xs">
                    {
                      dataTableScoreLastSessions?.cadence.automatic_backward
                        .index
                    }
                    9
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
                  {dataTableScoreLastSessions?.flexos.hip.result}
                </div>
                <div className="col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none">
                  {dataTableScoreLastSessions?.flexos.knee.result}
                </div>
              </div>
            </div>
            <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
              <div className="flex flex-column text-right">
                <div
                  className={`col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none `}
                >
                  {' '}
                  <div className="">
                    {dataTableScoreLastSessions?.flexos.hip.index}
                  </div>
                </div>
                <div
                  className={`col-12 border-solid surface-border border-bottom-1 border-x-none border-top-none `}
                >
                  <div className="">
                    {dataTableScoreLastSessions?.flexos.knee.index}
                  </div>
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
                <div className="col-12">{t('pages.reports.tables.kneel')}</div>
                <div className="col-12">{t('pages.reports.tables.hipr')}</div>
                <div className="col-12">{t('pages.reports.tables.kneer')}</div>
              </div>
            </div>
            <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
              <div className="flex flex-column text-right">
                <div className="col-12">
                  {dataTableScoreLastSessions?.threshold.hipL.result}
                </div>
                <div className="col-12">
                  {dataTableScoreLastSessions?.threshold.kneeL.result}
                </div>
                <div className="col-12">
                  {dataTableScoreLastSessions?.threshold.hipR.result}
                </div>
                <div className="col-12">
                  {dataTableScoreLastSessions?.threshold.kneeR.result}
                </div>
              </div>
            </div>
            <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
              <div className="flex flex-column text-right">
                <div className={`col-12 `}>
                  {' '}
                  <div className="">
                    {dataTableScoreLastSessions?.threshold.hipL.index}
                  </div>
                </div>
                <div className={`col-12 `}>
                  {' '}
                  <div className="">
                    {dataTableScoreLastSessions?.threshold.kneeL.index}
                  </div>
                </div>
                <div className={`col-12 `}>
                  {' '}
                  <div className="">
                    {dataTableScoreLastSessions?.threshold.hipR.index}
                  </div>
                </div>
                <div className={`col-12 `}>
                  {' '}
                  <div className="">
                    {dataTableScoreLastSessions?.threshold.kneeR.index}
                  </div>
                </div>
              </div>
            </div>
            {/* TERAPEUTA */}
            <div className="col-3 font-bold surface-border border-solid border-x-1 border-top-none border-bottom-1 flex align-items-center justify-content-start px-2 text-xs">
              {t('pages.reports.tables.therapist')}*
            </div>
            <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
              <div className="flex flex-column">
                <div className="col-12 text-xs">
                  {t('pages.reports.tables.dungarees')}**
                </div>
                <div className="col-12 text-xs">
                  {t('pages.reports.tables.effort')}
                </div>
              </div>
            </div>
            <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
              <div className="flex flex-column text-right">
                <div className="col-12 text-xs">
                  {dataTableScoreLastSessions?.therapist.dungarees.result}
                </div>
                <div className="col-12 text-xs">
                  {dataTableScoreLastSessions?.therapist.effort.result}
                </div>
              </div>
            </div>
            <div className="col-3 surface-border border-solid border-x-1 border-top-none border-bottom-1">
              <div className="flex flex-column text-right">
                <div className="col-12 bg-orange-200 ">
                  <div className="text-xs">
                    {dataTableScoreLastSessions?.therapist.dungarees.index}
                  </div>
                </div>
                <div className="col-12 bg-green-200 ">
                  <div className="text-xs">
                    {dataTableScoreLastSessions?.therapist.effort.index}
                  </div>
                </div>
              </div>
            </div>
            {/* TOTAL */}
            <div className="col-9 surface-border border-solid border-x-1 border-top-none border-bottom-1 table-border-style-radius-bottom-left px-2 py-2 font-bold text-md">
              {t('pages.reports.tables.total')}
            </div>
            <div className="col-3 flex align-items-center justify-content-end px-2 surface-border border-solid border-x-1  table-border-style-radius-bottom-right border-top-none border-bottom-1 font-bold font-bold text-md bg-green-200">
              {dataTableScoreLastSessions?.total}
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------------------------------------------- */}

        {/* -------------------------------------------------PAGINA 4 ------------------------------------------------- */}

        {/* CABECERA PAGINA 4 */}
        <div className="flex align-items-center justify-content-between break-page">
          <img
            src="/assets/marsi-azul-degradado-fondo-blanco.png"
            alt="logo marsinet"
            style={{ width: '110px' }}
          />
          <div className="surface-ground p-2 border-round-3xl text-xs text-600">
            {t('pages.reports.createAt')}:{' '}
            <span className="font-bold">{createAt}</span>
          </div>
        </div>

        {/* SESIONES REALIZADAS EN EL ÚLTIMO MES*/}
        <div className="surface-card ">
          <div className="text-center mb-5">
            <div className="text-md font-bold">
              {t('pages.reports.sessionsLastMonth.title')}
            </div>
          </div>
          <div className="text-large mb-3">
            <strong>{lastSessionsMonth?.steps}</strong>{' '}
            {t('pages.reports.sessionsLastMonth.steps')}{' '}
            <strong>{getDateToString(lastSessionsMonth?.last_date)}</strong>
            <br />
            <strong>{lastSessionsMonth?.time} </strong>
            {t('pages.reports.sessionsLastMonth.timeMeasurement')}{' '}
            {t('pages.reports.sessionsLastMonth.time')}{' '}
            <strong>{lastSessionsMonth?.num_sessions}</strong>{' '}
            {t('pages.reports.sessionsLastMonth.sessions')}{' '}
            {t('pages.reports.sessionsLastMonth.theLastMonth')} <br />
            <strong>{lastSessionsMonth?.score} </strong>
            {t('pages.reports.sessionsLastMonth.score')}
          </div>
        </div>

        {/* GRÁFICA PASOS POR DÍA Y MODO */}
        <div className="flex alignt-items-center justify-content-center my-4">
          <div className="graph-and-container-width">
            <Chart
              key={Math.random()}
              type="line"
              data={dataGraphStepsPerDayAndModeProps}
              options={optionsGraphStepsPerDayAndModeProps}
              style={{ width: '15cm', height: '8cm' }}
            />
          </div>
        </div>

        {/* GRÁFICA EVOLUCIÓN DIARIA DE LA PUNTUACIÓN */}
        <div className="flex alignt-items-center justify-content-center">
          <div className="graph-and-container-width-3">
            <Chart
              key={Math.random()}
              type="line"
              data={dataGraphDailyEvolutionOfTheScoreProps}
              options={optionsGraphDailyEvolutionOfTheScoreProps}
              style={{ width: '15cm', height: '8cm' }}
            />
          </div>
        </div>

        {/* ----------------------------------------------------------------------------------------------------------- */}

        {/* -------------------------------------------------PAGINA 5 ------------------------------------------------- */}

        {/* CABECERA PAGINA 5 */}
        <div className="flex align-items-center justify-content-between break-page">
          <img
            src="/assets/marsi-azul-degradado-fondo-blanco.png"
            alt="logo marsinet"
            style={{ width: '110px' }}
          />
          <div className="surface-ground p-2 border-round-3xl text-xs text-600">
            {t('pages.reports.createAt')}:{' '}
            <span className="font-bold">{createAt}</span>
          </div>
        </div>

        {/* SESIONES REALIZADAS DESDE SU INICIO*/}
        <div className="surface-card mb-5">
          <div className="text-center mb-5">
            <div className="text-md font-bold">
              {t('pages.reports.sessionsHeldInception.title')}
            </div>
          </div>
          <div className="text-large mb-3">
            <strong>{sessionsMadeFromTheStart.steps}</strong>{' '}
            {t('pages.reports.sessionsHeldInception.steps')}{' '}
            <strong>
              {getDateToString(sessionsMadeFromTheStart.last_date)}
            </strong>
            <br />
            <strong>{sessionsMadeFromTheStart.time} </strong>
            {t('pages.reports.sessionsHeldInception.timeMeasurement')}{' '}
            {t('pages.reports.sessionsHeldInception.time')}{' '}
            <strong>{sessionsMadeFromTheStart.num_sessions}</strong>{' '}
            {t('pages.reports.sessionsHeldInception.sessions')}
            <br />
            <strong>{sessionsMadeFromTheStart.score}</strong>{' '}
            {t('pages.reports.sessionsHeldInception.score')}
          </div>
        </div>

        <div className="text-center text-md font-bold my-3">
          {t('pages.reports.graphs.totalSteps')}
        </div>
        {/* GRÁFICA CANTIDAD TOTAL DE PASOS DESDE INICIO*/}
        <div className="flex alignt-items-center justify-content-center">
          <div className="graph-and-container-width">
            <Chart
              key={Math.random()}
              type="bar"
              data={dataGraphTotalNumberOfStepsFromStart}
              options={optionsGraphTotalNumberOfStepsFromStart}
              style={{ width: '15cm' }}
            />
          </div>
        </div>
        <div className="text-center text-md font-bold my-3">
          {t('pages.reports.graphs.totalTime')}
        </div>

        {/* GRÁFICA CANTIDAD TOTAL DE TIEMPO DESDE INICIO*/}
        <div className="flex alignt-items-center justify-content-center my-5">
          <div className="graph-and-container-width">
            <Chart
              key={Math.random()}
              type="bar"
              data={dataGraphTotalAmountOfTimesSinceStart}
              options={optionsGraphTotalAmountOfTimesSinceStart}
              style={{ width: '15cm' }}
            />
          </div>
        </div>

        <div className="flex align-items-center justify-content-between break-page">
          <img
            src="/assets/marsi-azul-degradado-fondo-blanco.png"
            alt="logo marsinet"
            style={{ width: '110px' }}
          />
          <div className="surface-ground p-2 border-round-3xl text-xs text-600">
            {t('pages.reports.createAt')}:{' '}
            <span className="font-bold">{createAt}</span>
          </div>
        </div>

        <div className="text-center text-md font-bold my-3">
          {t('pages.reports.graphs.evolutionOfTheScore')}
        </div>
        {/* GRÁFICA EVOLUCION MENSUAL DE LA PUNTUACIÓN */}
        <div className="flex alignt-items-center justify-content-center">
          <div className="graph-and-container-width">
            <Chart
              key={Math.random()}
              type="line"
              data={dataGraphMonthlyEvolutionOfTheScore}
              options={optionsGraphMonthlyEvolutionOfTheScore}
              style={{ width: '15cm', height: '8cm' }}
            />
          </div>
        </div>

        {/* ----------------------------------------------------------------------------------------------------------- */}

        {/* -------------------------------------------------PAGINA 6 ------------------------------------------------- */}

        {/* CABECERA PAGINA 6 */}
        <div className="flex align-items-center justify-content-between break-page">
          <img
            src="/assets/marsi-azul-degradado-fondo-blanco.png"
            alt="logo marsinet"
            style={{ width: '110px' }}
          />
          <div className="surface-ground p-2 border-round-3xl text-xs text-600">
            {t('pages.reports.createAt')}:{' '}
            <span className="font-bold">{createAt}</span>
          </div>
        </div>

        {/* COMENTARIOS / HALLAZGOS */}
        <div className=" border-1 surface-border border-solid my-3 border-round-2xl">
          <div className="font-bold text-700 text-md p-3">
            {t('pages.reports.comments')}
          </div>
          <div className="surface-border border-top border-solid"></div>
          <div className="text-justify text-sm p-3">{commentsAndFindings}</div>
        </div>

        {/* TABLA COMPARATIVA DE LOS DATOS DE LA ÚLTIMA SESIÓN CON RESPECTO A LOS HISTÓRICOS Y ÚLTIMOS MENSUALES */}
        <div className="font-bold text-center text-md mb-3">
          {t('pages.reports.tables.tableComparativeOfLastSessionTitle')}
        </div>

        <div className=" grid grid-nogutter">
          {/* ENCABEZADO */}

          <div className="col-2 surface-border border-solid border-1 table-border-style-radius-left h-1cm"></div>
          <div className="col-1 surface-border border-solid border-1 h-1cm"></div>
          <div className="col-3 surface-border border-solid border-1 font-bold  h-1cm flex align-items-center justify-content-center text-center px-2 text-xs">
            {t('pages.reports.tables.history')}
          </div>
          <div className="col-3 surface-border border-solid border-1 font-bold  h-1cm flex align-items-center justify-content-center text-center px-2 text-xs">
            {t('pages.reports.tables.lastMonth')}
          </div>
          <div className="col-3 surface-border border-solid border-1 table-border-style-radius-right font-bold  h-1cm flex align-items-center justify-content-center text-center px-2 text-xs">
            {t('pages.reports.tables.lastSession')}
          </div>

          {/* ENCABEZADO 2 */}

          <div className="col-2 surface-border border-solid border-1 flex align-items-center justify-content-center text-center px-2"></div>
          <div className="col-1 surface-border border-solid border-1 flex align-items-center justify-content-center text-center px-2"></div>
          <div className="col-3 surface-border border-solid border-1 px-2">
            <div className="flex">
              <div className="col-6 text-center surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
                {t('pages.reports.tables.result')}
              </div>
              <div className="col-6 text-center text-xs">
                {t('pages.reports.tables.index')}
              </div>
            </div>
          </div>
          <div className="col-3 surface-border border-solid border-1 px-2">
            <div className="flex">
              <div className="col-6 text-center surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
                {t('pages.reports.tables.result')}
              </div>
              <div className="col-6 text-center text-xs">
                {t('pages.reports.tables.index')}
              </div>
            </div>
          </div>
          <div className="col-3 surface-border border-solid border-1 px-2">
            <div className="flex">
              <div className="col-6 text-center surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
                {t('pages.reports.tables.result')}
              </div>
              <div className="col-6 text-center text-xs">
                {t('pages.reports.tables.index')}
              </div>
            </div>
          </div>

          {/* FILA 1 : PASOS EN AUTOMÁTICO */}

          <div className="col-2 surface-border border-solid border-1 border-bottom-none flex align-items-center justify-content-start font-bold px-2 text-xs">
            {t('pages.reports.tables.stepsAutomatic')}
          </div>
          <div className="col-1 surface-border border-solid border-1 border-bottom-none">
            <div className="flex flex-column">
              <div className="col-12 pl-1 surface-border border-solid border-bottom-1 border-top-none border-right-none border-left-none text-xs">
                {t('pages.reports.tables.forward')}
              </div>
              <div className="col-12 pl-1 text-xs">
                {t('pages.reports.tables.backward')}
              </div>
            </div>
          </div>
          <div className="col-3 surface-border border-solid border-1 border-bottom-none">
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.automaticSteps
                    .historical.forward.result
                }
              </div>
              <div className="col-6 text-right bg-green-100 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.automaticSteps
                    .historical.forward.index
                }
              </div>
            </div>
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.automaticSteps
                    .historical.backward.result
                }
              </div>
              <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none bg-red-200 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.automaticSteps
                    .historical.backward.index
                }
              </div>
            </div>
          </div>
          <div className="col-3 surface-border border-solid border-1 border-bottom-none">
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.automaticSteps
                    .lastMonth.forward.result
                }
              </div>
              <div className="col-6 text-right bg-green-200 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.automaticSteps
                    .lastMonth.forward.index
                }
              </div>
            </div>
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.automaticSteps
                    .lastMonth.backward.result
                }
              </div>
              <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none bg-orange-200 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.automaticSteps
                    .lastMonth.backward.index
                }
              </div>
            </div>
          </div>
          <div className="col-3 surface-border border-solid border-1 border-bottom-none">
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.automaticSteps
                    .lastSession.forward.result
                }
              </div>
              <div className="col-6 text-right bg-green-400 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.automaticSteps
                    .lastSession.forward.index
                }
              </div>
            </div>
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.automaticSteps
                    .lastSession.backward.result
                }
              </div>
              <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none bg-red-200 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.automaticSteps
                    .lastSession.backward.index
                }
              </div>
            </div>
          </div>

          {/* FILA 2 : PASOS EN INTENCIÓN*/}

          <div className="col-2 surface-border border-solid border-1 border-bottom-none flex align-items-center justify-content-start font-bold px-2 text-xs">
            {t('pages.reports.tables.stepsIntention')}
          </div>
          <div className="col-1 surface-border border-solid border-1 border-bottom-none">
            <div className="flex flex-column">
              <div className="col-12 pl-1 surface-border border-solid border-bottom-1 border-top-none border-right-none border-left-none text-xs">
                {t('pages.reports.tables.forward')}
              </div>
              <div className="col-12 pl-1 text-xs">
                {t('pages.reports.tables.backward')}
              </div>
            </div>
          </div>
          <div className="col-3 surface-border border-solid border-1 border-bottom-none">
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.intentionalSteps
                    .historical.forward.result
                }
              </div>
              <div className="col-6 text-right bg-red-200 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.intentionalSteps
                    .historical.forward.index
                }
              </div>
            </div>
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.intentionalSteps
                    .historical.backward.result
                }
              </div>
              <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none bg-green-100 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.intentionalSteps
                    .historical.backward.index
                }
              </div>
            </div>
          </div>
          <div className="col-3 surface-border border-solid border-1 border-bottom-none">
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.intentionalSteps
                    .lastMonth.forward.result
                }
              </div>
              <div className="col-6 text-right bg-red-200 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.intentionalSteps
                    .lastMonth.forward.index
                }
              </div>
            </div>
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.intentionalSteps
                    .lastMonth.backward.result
                }
              </div>
              <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none bg-green-300 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.intentionalSteps
                    .lastMonth.backward.index
                }
              </div>
            </div>
          </div>
          <div className="col-3 surface-border border-solid border-1 border-bottom-none">
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.intentionalSteps
                    .lastSession.forward.result
                }
              </div>
              <div className="col-6 text-right bg-orange-300 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.intentionalSteps
                    .lastSession.forward.index
                }
              </div>
            </div>
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.intentionalSteps
                    .lastSession.backward.result
                }
              </div>
              <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none bg-green-400 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.intentionalSteps
                    .lastSession.backward.index
                }
              </div>
            </div>
          </div>

          {/* FILA 3 : CADENCIA AUTOMATICO*/}

          <div className="col-2 surface-border border-solid border-1 border-bottom-none flex align-items-center justify-content-start font-bold px-2 text-xs">
            {t('pages.reports.tables.cadenceAutomatic')}
          </div>
          <div className="col-1 surface-border border-solid border-1 border-bottom-none">
            <div className="flex flex-column">
              <div className="col-12 pl-1 surface-border border-solid border-bottom-1 border-top-none border-right-none border-left-none text-xs">
                {t('pages.reports.tables.forward')}
              </div>
              <div className="col-12 pl-1 text-xs">
                {t('pages.reports.tables.backward')}
              </div>
            </div>
          </div>
          <div className="col-3 surface-border border-solid border-1 border-bottom-none">
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence
                    .historical.automatic.result
                }
              </div>
              <div className="col-6 text-right bg-red-200 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence
                    .historical.automatic.index
                }
              </div>
            </div>
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence
                    .historical.automatic.result
                }
              </div>
              <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none bg-green-100 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence
                    .historical.automatic.index
                }
              </div>
            </div>
          </div>
          <div className="col-3 surface-border border-solid border-1 border-bottom-none">
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence.lastMonth
                    .automatic.result
                }
              </div>
              <div className="col-6 text-right bg-red-200 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence.lastMonth
                    .automatic.index
                }
              </div>
            </div>
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence.lastMonth
                    .automatic.result
                }
              </div>
              <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none bg-green-300 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence.lastMonth
                    .automatic.index
                }
              </div>
            </div>
          </div>
          <div className="col-3 surface-border border-solid border-1 border-bottom-none">
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence
                    .lastSession.automatic.result
                }
              </div>
              <div className="col-6 text-right bg-orange-300 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence
                    .lastSession.automatic.index
                }
              </div>
            </div>
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence
                    .lastSession.automatic.result
                }
              </div>
              <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none bg-green-400 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence
                    .lastSession.automatic.index
                }
              </div>
            </div>
          </div>

          {/* FILA 3.1: CADENCIA INTENCION */}
          <div className="col-2 surface-border border-solid border-1 border-bottom-none flex align-items-center justify-content-start font-bold px-2 text-xs">
            {t('pages.reports.tables.cadenceIntention')}
          </div>
          <div className="col-1 surface-border border-solid border-1 border-bottom-none">
            <div className="flex flex-column">
              <div className="col-12 pl-1 surface-border border-solid border-bottom-1 border-top-none border-right-none border-left-none text-xs">
                {t('pages.reports.tables.forward')}
              </div>
              <div className="col-12 pl-1 text-xs">
                {t('pages.reports.tables.backward')}
              </div>
            </div>
          </div>
          <div className="col-3 surface-border border-solid border-1 border-bottom-none">
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence
                    .historical.intentional.result
                }
              </div>
              <div className="col-6 text-right bg-red-200 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence
                    .historical.intentional.index
                }
              </div>
            </div>
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence
                    .historical.intentional.result
                }
              </div>
              <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none bg-green-100 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence
                    .historical.intentional.index
                }
              </div>
            </div>
          </div>
          <div className="col-3 surface-border border-solid border-1 border-bottom-none">
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence.lastMonth
                    .intentional.result
                }
              </div>
              <div className="col-6 text-right bg-red-200 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence.lastMonth
                    .intentional.index
                }
              </div>
            </div>
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence.lastMonth
                    .intentional.result
                }
              </div>
              <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none bg-green-300 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence.lastMonth
                    .intentional.index
                }
              </div>
            </div>
          </div>
          <div className="col-3 surface-border border-solid border-1 border-bottom-none">
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence
                    .lastSession.intentional.result
                }
              </div>
              <div className="col-6 text-right bg-orange-300 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence
                    .lastSession.intentional.index
                }
              </div>
            </div>
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence
                    .lastSession.intentional.result
                }
              </div>
              <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none bg-green-400 text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.cadence
                    .lastSession.intentional.index
                }
              </div>
            </div>
          </div>

          {/* FILA 4 : FLEXOS */}

          <div className="col-2 surface-border border-solid border-1 border-bottom-none flex align-items-center justify-content-start font-bold px-2 text-xs">
            {t('pages.reports.tables.flexos')}**
          </div>
          <div className="col-1 surface-border border-solid border-1 border-bottom-none">
            <div className="flex flex-column">
              <div className="col-12 pl-1 surface-border border-solid border-bottom-1 border-top-none border-right-none border-left-none text-xs">
                {t('pages.reports.tables.hip')}
              </div>
              <div className="col-12 pl-1 surface-border border-solid border-bottom-1 border-top-none border-right-none border-left-none text-xs">
                {t('pages.reports.tables.knee')}
              </div>
              <div className="col-12 pl-1 text-xs">
                {t('pages.reports.tables.ankle')}
              </div>
            </div>
          </div>
          <div className="col-3 surface-border border-solid border-1 border-bottom-none">
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.flexos.historical
                    .hip.result
                }
              </div>
              <div className="col-6 text-right text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.flexos.historical
                    .hip.index
                }
              </div>
            </div>
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.flexos.historical
                    .knee.result
                }
              </div>
              <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.flexos.historical
                    .knee.index
                }
              </div>
            </div>
          </div>
          <div className="col-3 surface-border border-solid border-1 border-bottom-none">
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.flexos.lastMonth
                    .hip.result
                }
              </div>
              <div className="col-6 text-right text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.flexos.lastMonth
                    .hip.index
                }
              </div>
            </div>
            <div className="flex">
              <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.flexos.lastMonth
                    .knee.result
                }
              </div>
              <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none text-xs">
                {
                  dataTableOfLastSessionDataAgainstHistorical?.flexos.lastMonth
                    .knee.index
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-3 surface-border border-solid border-1 border-bottom-none">
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.flexos.lastSession
                  .hip.result
              }
            </div>
            <div className="col-6 text-right text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.flexos.lastSession
                  .hip.index
              }
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.flexos.lastSession
                  .knee.result
              }
            </div>
            <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.flexos.lastSession
                  .knee.index
              }
            </div>
          </div>
        </div>

        {/* FILA 5 : UMBRAL*/}

        <div className="col-2 surface-border border-solid border-1 border-bottom-none flex align-items-center justify-content-start font-bold px-2 text-xs">
          {t('pages.reports.tables.threshold')}
        </div>
        <div className="col-1 surface-border border-solid border-1 border-bottom-none">
          <div className="flex flex-column">
            <div className="col-12 pl-1 surface-border border-solid border-bottom-1 border-top-none border-right-none border-left-none text-xs">
              {t('pages.reports.tables.hip')}
            </div>
            <div className="col-12 pl-1 text-xs">
              {t('pages.reports.tables.knee')}
            </div>
          </div>
        </div>
        <div className="col-3 surface-border border-solid border-1 border-bottom-none">
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.threshold
                  .historical.hipl.result
              }
            </div>
            <div className="col-6 text-right bg-red-200 text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.threshold
                  .historical.hipl.index
              }
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.threshold
                  .historical.kneel.result
              }
            </div>
            <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none bg-green-100 text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.threshold
                  .historical.kneel.index
              }
            </div>
          </div>
        </div>
        <div className="col-3 surface-border border-solid border-1 border-bottom-none">
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.threshold.lastMonth
                  .hipl.result
              }
            </div>
            <div className="col-6 text-right bg-red-200 text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.threshold.lastMonth
                  .hipl.index
              }
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.threshold.lastMonth
                  .kneel.result
              }
            </div>
            <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none bg-green-300 text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.threshold.lastMonth
                  .kneel.index
              }
            </div>
          </div>
        </div>
        <div className="col-3 surface-border border-solid border-1 border-bottom-none">
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.threshold
                  .lastSession.hipl.result
              }
            </div>
            <div className="col-6 text-right bg-orange-300 text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.threshold
                  .lastSession.hipl.index
              }
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.threshold
                  .lastSession.kneel.result
              }
            </div>
            <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none bg-green-400 text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.threshold
                  .lastSession.kneel.index
              }
            </div>
          </div>
        </div>

        {/* FILA 6 : TERAPEUTA*/}

        <div className="col-2 surface-border border-solid border-1 border-bottom-none flex align-items-center justify-content-start font-bold px-2 text-xs">
          {t('pages.reports.tables.therapist')}*
        </div>
        <div className="col-1 surface-border border-solid border-1 border-bottom-none">
          <div className="flex flex-column">
            <div className="col-12 pl-1 surface-border border-solid border-bottom-1 border-top-none border-right-none border-left-none text-xs">
              {t('pages.reports.tables.dungarees')}***
            </div>
            <div className="col-12 pl-1 text-xs">
              {t('pages.reports.tables.effort')}
            </div>
          </div>
        </div>
        <div className="col-3 surface-border border-solid border-1 border-bottom-none">
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.therapist
                  .historical.dungarees.result
              }
            </div>
            <div className="col-6 text-right bg-red-200 text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.therapist
                  .historical.dungarees.index
              }
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.therapist
                  .historical.effort.result
              }
            </div>
            <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none bg-green-100 text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.therapist
                  .historical.effort.index
              }
            </div>
          </div>
        </div>
        <div className="col-3 surface-border border-solid border-1 border-bottom-none">
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.therapist.lastMonth
                  .dungarees.result
              }
            </div>
            <div className="col-6 text-right bg-red-200 text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.therapist.lastMonth
                  .dungarees.index
              }
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.therapist.lastMonth
                  .effort.result
              }
            </div>
            <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none bg-green-300 text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.therapist.lastMonth
                  .effort.index
              }
            </div>
          </div>
        </div>
        <div className="col-3 surface-border border-solid border-1 border-bottom-none">
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.therapist
                  .lastSession.dungarees.result
              }
            </div>
            <div className="col-6 text-right bg-orange-300 text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.therapist
                  .lastSession.dungarees.index
              }
            </div>
          </div>
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-bottom-none border-top-1 border-left-none text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.therapist
                  .lastSession.effort.result
              }
            </div>
            <div className="col-6 text-right surface-border border-solid border-right-none border-bottom-none border-top-1 border-left-none bg-green-400 text-xs">
              {
                dataTableOfLastSessionDataAgainstHistorical?.therapist
                  .lastSession.effort.index
              }
            </div>
          </div>
        </div>

        {/* FILA7 : TOTAL*/}

        <div className="col-2 surface-border border-solid border-1 border-right-none table-border-style-radius-bottom-left flex align-items-center justify-content-start font-bold pl-2 text-md">
          {t('pages.reports.tables.total')}
        </div>
        <div className="col-1 surface-border border-solid border-1 border-left-none border-right-none"></div>
        <div className="col-3 surface-border border-solid border-1 border-left-none">
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none"></div>
            <div className="col-6 text-right bg-red-200 font-bold text-md">
              {dataTableOfLastSessionDataAgainstHistorical?.totalHistorical}
            </div>
          </div>
        </div>
        <div className="col-3 surface-border border-solid border-1">
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none"></div>
            <div className="col-6 text-right bg-yellow-200 font-bold text-md">
              {dataTableOfLastSessionDataAgainstHistorical?.totalLastMonth}
            </div>
          </div>
        </div>
        <div className="col-3 surface-border border-solid border-1 table-border-style-radius-bottom-right">
          <div className="flex">
            <div className="col-6 text-right surface-border border-solid border-right-1 border-y-none border-left-none"></div>
            <div className="col-6 text-right bg-green-300 font-bold text-md table-border-style-radius-bottom-right">
              {dataTableOfLastSessionDataAgainstHistorical?.totalLastSession}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER FIRMA - Nº COLEGIADO - CERTIFICADO EN ATLAS */}
      <div className="flex align-items-center justify-content-end mt-5">
        <div className="surface-ground p-3 border-round-2xl flex flex-column gap-3 font-italic">
          <div className="text-sm">
            {t('pages.reports.signedBy.nameSurname')}
          </div>
          <div className="text-sm">
            {t('pages.reports.signedBy.registrationNumber')}
          </div>
          <div className="text-sm">
            {t('pages.reports.signedBy.certificate')}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Informe;
