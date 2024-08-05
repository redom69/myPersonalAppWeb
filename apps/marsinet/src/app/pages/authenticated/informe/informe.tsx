/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'primereact/button';
import { ChartData, ChartOptions } from 'chart.js';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

// IMPORTACIONES DE LAS GRÁFICAS
import {
  GraphTotalSteps,
  GraphDistributionOfTheStepsPerformedOnTheLastDay,
  GraphStepsPerDayAndMode,
  GraphDailyEvolutionOfTheScoreProps,
  GraphTotalNumberOfStepsFromStart,
  GraphTotalAmountOfTimesSinceStart,
  GraphMonthlyEvolutionOfTheScore,
  ComparativeTableOfLastSessionDataAgainstHistoricalAndLatestMonthlyData,
  TableScoreLastSessions,
  ReportHeader,
  DataLastSessionReceived,
  DataSessionsLastMonth,
  DataSessionsMadeFromTheStart,
} from '@marsinet/web-commons';

import {
  TableScoreLastSessionDataInterface,
  ComparativeTableOfLastSessionDataAgainstHistoricalAndLatestMonthlyDataInterface,
} from '@marsinet/commons';

// TRADUCCIONES i18n
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  PatientView,
  PatientsApiFactory,
  Session,
} from '../../../typescript-axios';
import { MarsinetContext } from '../../../context/marsinetProvider';
import {
  getEarlyAndLastSession,
  getSessionsByMonth,
  getStepSessionGraph,
  getStepGraph,
  getTotalsOfSessions,
  getMonthName,
} from '@marsinet/commons';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const apiServicePatient = PatientsApiFactory();

/* eslint-disable-next-line */
export interface InformeProps {}

export function Informe(props: InformeProps) {
  const { t, i18n } = useTranslation();
  const toast = useRef(null);
  const { access_token } = useContext(MarsinetContext);
  const { patient_id, start_date, end_date } = useParams();

  const [patient, setPatient] = useState<PatientView>(null);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [score, setScore] = useState<number>(0);
  const [sessionInAMonth, setSessionInAMonth] = useState<any[]>([]);
  const [sessionInAYear, setSessionInAYear] = useState<any[]>([]);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [earlySession, setEarlySession] = useState<any>(null);
  const [lastSession, setLastSession] = useState<any>(null);
  const [sessionMonthEvaluation, setSessionMonthEvaluation] =
    useState<any>(null);

  const optionsDate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // TODO BBDD

  // DATOS ULTIMA SESION RECIBIDA
  const [lastSessionReceived, setLastSessionReceived] =
    useState<DataLastSessionReceived>({
      steps: 0,
      time: 0,
      score: 0.0,
      walking: 0,
      standing: 0,
    });

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

  // NOMBRE Y APELLIDOS COLEGIADO y NUMERO COLEGIDADO
  const [nameMedical, setNameMedical] = useState<string>('');
  const [surnamesMedical, setSurnamesMedical] = useState<string>('');
  const [registrationNumberMedical, setRegistrationNumberMedical] =
    useState<string>('');

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

  // Gráfica  de pasos, datos y opciones (círculo)
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

  // Grafica de Distribución de pasos, datos y opciones (circulo)
  const [stepGraphLastSession, setStepGraphLastSession] = useState<{
    dataStepsLastSessionDistribution: ChartData;
    optionsStepsLastSessionDistribution: ChartOptions;
  }>({
    dataStepsLastSessionDistribution: {
      labels: [],
      datasets: [],
    },
    optionsStepsLastSessionDistribution: {},
  });

  const navigate = useNavigate();

  const [updateResize, setUpdateResize] = useState<boolean>(false);
  const [languageChanged, setLanguageChanged] = useState<boolean>(false);

  const updateResizeGraph = () => {
    setUpdateResize(!updateResize);
  };

  const MaxLinesInputTextarea = ({ maxLines, placeholder }) => {
    const [text, setText] = useState('');

    const handleChange = (event) => {
      const lines = event.target.value.split('\n');

      // Verifica si el número de líneas no excede el límite
      if (lines.length <= maxLines) {
        setText(event.target.value);
      }
    };

    return (
      <InputTextarea
        autoResize
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        className="text-2xl"
        style={{
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
    );
  };

  const generatePdfFile = async () => {
    const pdf = new jsPDF('p', 'pt', 'a4');
    const padding = 20;
    const pageWidth = pdf.internal.pageSize.getWidth() - 2 * padding;
    const numberOfPages = 6;

    for (let i = 1; i <= numberOfPages; i++) {
      const element = document.getElementById(`page-${i}`);
      const canvas = await html2canvas(element, {
        scale: 1,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const scale = pageWidth / imgWidth;

      const scaledWidth = imgWidth * scale;
      const scaledHeight = imgHeight * scale;

      if (i !== 1) {
        pdf.addPage();
      }

      const x = padding;
      const y = padding;

      pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
    }

    const actualDate = new Date().toISOString().slice(0, 10);
    pdf.save(`report_${actualDate}.pdf`);
    show('success', t('messages.success'), t('messages.success_message'));
  };

  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue(
    '--text-color-secondary'
  );
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  //
  const sessionsByDate: Record<
    string,
    Record<string, number>
  > = sessionInAMonth.reduce((result, session) => {
    const dateKey = new Date(session.date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    if (!result[dateKey]) {
      result[dateKey] = {
        forwardIntention: 0,
        automaticForward: 0,
        backwardIntention: 0,
        automaticBackward: 0,
        evaluation: 0,
      };
    }

    result[dateKey].forwardIntention += session.steps_intention_forward;
    result[dateKey].automaticForward += session.steps_automatic_forward;
    result[dateKey].backwardIntention += session.steps_intention_backward;
    result[dateKey].automaticBackward += session.steps_automatic_backward;

    return result;
  }, {});

  const sortedEntries = Object.entries(sessionsByDate).sort(
    (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
  );
  const labels = sortedEntries.map(([dateKey]) => dateKey);

  // DATA AND OPTIONS GRAPH STEPS PER SESSION AND MODE
  const dataGraphStepsPerDayAndModeProps: ChartData = {
    labels,
    datasets: [
      {
        label: t('pages.reports.graphs.forwardIntention'),
        data: sortedEntries.map(([_, steps]) => steps.forwardIntention),
        fill: false,
        borderColor: '#004E78',
        backgroundColor: '#004E78',
        tension: 0,
      },
      {
        label: t('pages.reports.graphs.automaticForward'),
        data: sortedEntries.map(([_, steps]) => steps.automaticForward),
        fill: false,
        borderColor: '#13DFB6',
        backgroundColor: '#13DFB6',
        tension: 0,
      },
      {
        label: t('pages.reports.graphs.backwardIntention'),
        data: sortedEntries.map(([_, steps]) => steps.backwardIntention),
        fill: false,
        borderColor: '#DF8F13',
        backgroundColor: '#DF8F13',
        tension: 0,
      },
      {
        label: t('pages.reports.graphs.automaticBackward'),
        data: sortedEntries.map(([_, steps]) => steps.automaticBackward),
        fill: false,
        borderColor: '#DF1351',
        backgroundColor: '#DF1351',
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
          font: {
            size: 20,
          },
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
          font: {
            size: 20,
          },
        },
        grid: {
          color: surfaceBorder,
        },
        title: {
          display: true,
          text: t('pages.reports.graphs.days'),
          font: {
            size: 20,
          },
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
          font: {
            size: 20,
          },
        },
        grid: {
          color: surfaceBorder,
        },
        title: {
          display: true,
          text: t('pages.reports.graphs.steps'),
          font: {
            size: 20,
          },
        },
      },
    },
  };

  const maxScore = Math.max(...sessionInAMonth.map((s) => s.evaluation), 10);

  // DATA AND OPTIONS GRAPH DAILY EVOLUTION OF THE SCORE
  const dataGraphDailyEvolutionOfTheScoreProps: ChartData = {
    labels,
    datasets: [
      {
        label: t('pages.reports.graphs.automaticForward'),
        data: sessionInAMonth.map((s) => s.evaluation),
        fill: false,
        borderColor: '#004E78',
        backgroundColor: '#004E78',
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
        font: {
          size: 20,
        },
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
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            size: 20,
          },
        },
        grid: {
          color: surfaceBorder,
        },
        title: {
          display: true,
          text: t('pages.reports.graphs.days'),
          font: {
            size: 20,
          },
        },
      },
      y: {
        stacked: true,
        display: true,
        max: maxScore > 100 ? maxScore : 100,
        min: 0,
        ticks: {
          font: {
            size: 20,
          },
        },
        title: {
          display: true,
          text: t('pages.reports.graphs.score'),
          font: {
            size: 20,
          },
        },
      },
    },
  };

  // Obtén los máximos de los pasos para cada conjunto de datos
  const maxValues = [
    Math.max(
      ...sessionInAYear.map(
        (s) => getTotalsOfSessions(s.sessions).total_steps_intention_backward
      )
    ),
    Math.max(
      ...sessionInAYear.map(
        (s) => getTotalsOfSessions(s.sessions).total_steps_intention_forward
      )
    ),
    Math.max(
      ...sessionInAYear.map(
        (s) => getTotalsOfSessions(s.sessions).total_steps_automatic_backward
      )
    ),
    Math.max(
      ...sessionInAYear.map(
        (s) => getTotalsOfSessions(s.sessions).total_steps_automatic_forward
      )
    ),
  ];

  // Calcula el máximo global de todos los conjuntos de datos
  const globalMaxSteps = Math.max(...maxValues);

  // DATA AND OPTIONS GRAPH TOTAL NUMBER OF STEPS FROM START
  const dataGraphTotalNumberOfStepsFromStart: ChartData = {
    labels: sessionInAYear.map((s) => getMonthName(s.month)),
    datasets: [
      {
        label: t('pages.reports.graphs.forwardIntention'),
        data: sessionInAYear.map(
          (s) => getTotalsOfSessions(s.sessions).total_steps_intention_forward
        ),
        backgroundColor: ['#004E78'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.automaticForward'),
        data: sessionInAYear.map(
          (s) => getTotalsOfSessions(s.sessions).total_steps_automatic_forward
        ),
        backgroundColor: ['#13DFB6'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.backwardIntention'),
        data: sessionInAYear.map(
          (s) => getTotalsOfSessions(s.sessions).total_steps_intention_backward
        ),
        backgroundColor: ['#DF8F13'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.automaticBackward'),
        data: sessionInAYear.map(
          (s) => getTotalsOfSessions(s.sessions).total_steps_automatic_backward
        ),
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
        labels: {
          font: {
            size: 20,
          },
        },
      },
      datalabels: {
        display: false,
        font: {
          size: 20,
        },
      },
    },

    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: globalMaxSteps + 200 - (globalMaxSteps % 200),
        stacked: true,
        title: {
          display: true,
          text: t('pages.reports.graphs.steps'),
          font: {
            size: 20,
          },
        },
        ticks: {
          font: {
            size: 20,
          },
        },
      },
      x: {
        stacked: true,
        ticks: {
          font: {
            size: 20,
          },
        },
      },
    },
  };

  // obtener los maximos para los tiempos de cada conjunto de datos
  const maxTimes = [
    Math.max(
      ...sessionInAYear.map(
        (s) => getTotalsOfSessions(s.sessions).total_time_intention_backward
      )
    ),
    Math.max(
      ...sessionInAYear.map(
        (s) => getTotalsOfSessions(s.sessions).total_time_intentiton_forward
      )
    ),
    Math.max(
      ...sessionInAYear.map(
        (s) => getTotalsOfSessions(s.sessions).total_time_automatic_backward
      )
    ),
    Math.max(
      ...sessionInAYear.map(
        (s) => getTotalsOfSessions(s.sessions).total_time_automatic_forward
      )
    ),
  ];

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

  const globalMaxTimes = Math.max(...maxTimes);

  // DATA AND OPTIONS GRAPH TOTAL AMOUNT OF TIMES SINCE START
  const dataGraphTotalAmountOfTimesSinceStart: ChartData = {
    labels: sessionInAYear.map((s) => getMonthName(s.month)),
    datasets: [
      {
        label: t('pages.reports.graphs.forwardIntentionTime'),
        data: sessionInAYear.map(
          (s) => getTotalsOfSessions(s.sessions).total_time_intentiton_forward
        ),
        backgroundColor: ['#004E78'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.automaticForwardTime'),
        data: sessionInAYear.map(
          (s) => getTotalsOfSessions(s.sessions).total_time_automatic_forward
        ),
        backgroundColor: ['#13DFB6'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.backwardIntentionTime'),
        data: sessionInAYear.map(
          (s) => getTotalsOfSessions(s.sessions).total_time_intention_backward
        ),
        backgroundColor: ['#DF8F13'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.automaticBackwardTime'),
        data: sessionInAYear.map(
          (s) => getTotalsOfSessions(s.sessions).total_time_automatic_backward
        ),
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
        labels: {
          font: {
            size: 20,
          },
        },
      },
      datalabels: {
        display: false,
      },
    },

    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: globalMaxTimes + 200 - (globalMaxTimes % 200),
        stacked: true,
        title: {
          display: true,
          text: t('pages.reports.graphs.time'),
          font: {
            size: 20,
          },
        },
      },
      x: {
        stacked: true,
        ticks: {
          font: {
            size: 20,
          },
        },
      },
    },
  };

  const maxScoreAll = Math.max(
    ...sessionInAYear.map(
      (s) => getTotalsOfSessions(s.sessions).median_evaluation
    )
  );

  // DATA AND OPTIONS GRAPH MONTHLY EVOLUTION OF THE SCORE
  const dataGraphMonthlyEvolutionOfTheScore: ChartData = {
    labels: sessionInAYear.map((s) => getMonthName(s.month)),
    datasets: [
      {
        label: t('pages.reports.graphs.score'),
        data: sessionInAYear.map(
          (s) => getTotalsOfSessions(s.sessions).median_evaluation
        ),
        fill: false,
        borderColor: '#004E78',
        backgroundColor: '#004E78',
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
      legend: {
        display: false,
      },
      datalabels: {
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
        max: maxScoreAll > 100 ? maxScoreAll : 100,
        beginAtZero: true,
        min: 0,
        ticks: {
          font: {
            size: 20,
          },
        },
        title: {
          display: true,
          text: t('pages.reports.graphs.score'),
          font: {
            size: 20,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 20,
          },
        },
      },
    },
  };

  const getDateToString = (date) => {
    if (!date) return t('noData');
    return String(date).split('T')[0];
  };

  useEffect(() => {
    window.addEventListener('resize', updateResizeGraph);
    return () => window.removeEventListener('resize', updateResizeGraph);
  });

  useEffect(() => {
    if (!access_token) return;
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    if (patient_id && start_date && end_date) {
      apiServicePatient
        .patientControllerFindOne(patient_id)
        .then((response) => {
          const _patient = response.data;
          setPatient(_patient);

          const _sessions = _patient.sessions;

          // Primer y ultimo uso del dispositivo
          const { earlySession, lastSession } =
            getEarlyAndLastSession(_sessions);
          setEarlySession(earlySession);
          setLastSession(lastSession);

          // SETEO DATOS ULTIMA SESION RECIBIDA
          setLastSessionReceived({
            steps: lastSession?.steps_total,
            time: lastSession?.timeUse,
            walking: lastSession?.timeWalking,
            standing: lastSession?.timeUse - lastSession?.timeWalking,
            score: lastSession?.evaluation,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [access_token]);

  useEffect(() => {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const endOfDay = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
      23,
      59,
      0
    );

    if (patient && patient.sessions) {
      setSessions(
        patient.sessions.filter((session) => {
          const sessionDate = new Date(session.date);

          if (startDate && endOfDay) {
            return sessionDate >= startDate && sessionDate <= endOfDay;
          } else if (startDate && !endOfDay) {
            return sessionDate >= startDate;
          } else if (!startDate && endOfDay) {
            return sessionDate <= endOfDay;
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

    // Agrupa las sesiones por mes
    const sessionsByMonth = getSessionsByMonth(sessions);
    setSessionInAYear(sessionsByMonth);
    // Obtiene los totales de las sesiones del último mes
    if (sessionsByMonth.length > 0) {
      const lastSessionsByMonth = getTotalsOfSessions(
        sessionsByMonth[sessionsByMonth.length - 1].sessions
      );

      setSessionInAMonth(
        sessionsByMonth[sessionsByMonth.length - 1].sessions.reverse()
      );
      setSessionMonthEvaluation(lastSessionsByMonth);

      sessionInAMonth.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      setLastSessionsMonth({
        steps: lastSessionsByMonth?.total_steps_total,
        last_date: lastSession
          ? new Date(lastSession.date).toLocaleDateString(
              i18n.language,
              optionsDate
            )
          : null,
        time: lastSessionsByMonth?.total_time_use,
        num_sessions:
          sessionsByMonth[sessionsByMonth.length - 1].sessions.length,
        score: lastSessionsByMonth?.median_evaluation,
      });
    }

    setTotalSteps(sessionData.total_steps_total);
    setTotalTime(sessionData.total_time_use);
    setScore(sessionData.median_evaluation);

    const { dataStepsDistribution, optionsStepsDistribution } = getStepGraph(
      sessionData,
      documentStyle,
      t,
      window,
      false,
      true
    );

    setStepGraph({
      dataStepsDistribution,
      optionsStepsDistribution,
    });

    if (lastSession) {
      const {
        dataStepsLastSessionDistribution,
        optionsStepsLastSessionDistribution,
      } = getStepSessionGraph(lastSession, documentStyle, t, window, false);

      setStepGraphLastSession({
        dataStepsLastSessionDistribution,
        optionsStepsLastSessionDistribution,
      });
    }

    // SETEO DATOS SESIONES REALIZADAS DESDE EL INICIO

    setSessionsMadeFromTheStart({
      steps: sessionData.total_steps_total,
      last_date: new Date(earlySession?.date).toLocaleDateString(
        i18n.language,
        optionsDate
      ),
      time: sessionData.total_time_use,
      num_sessions: sessions.length,
      score: sessionData.median_evaluation,
    });

    setDataTableScoreLastSessions({
      automaticSteps: {
        forward: {
          result: lastSession?.steps_automatic_forward,
          index: parseFloat(
            (lastSession?.steps_automatic_forward * 0.05).toFixed(2)
          ),
        },
        backward: {
          result: lastSession?.steps_automatic_backward,
          index: parseFloat(
            (lastSession?.steps_automatic_backward * 0.05).toFixed(2)
          ),
        },
      },
      intentionalSteps: {
        forward: {
          result: lastSession?.steps_intention_forward,
          index: parseFloat(
            (lastSession?.steps_intention_forward * 0.1).toFixed(2)
          ),
        },
        backward: {
          result: lastSession?.steps_intention_backward,
          index: parseFloat(
            (lastSession?.steps_intention_backward * 0.1).toFixed(2)
          ),
        },
      },
      cadence: {
        automatic_backward: {
          result: lastSession?.cadence_automatic_backward,
          index: parseFloat(
            (lastSession?.cadence_automatic_backward * 0.05).toFixed(2)
          ),
        },
        intentional_backward: {
          result: lastSession?.cadence_intention_backward,
          index: parseFloat(
            (lastSession?.cadence_intention_backward * 0.1).toFixed(2)
          ),
        },
        automatic_forward: {
          result: lastSession?.cadence_automatic_forward,
          index: parseFloat(
            (lastSession?.cadence_automatic_forward * 0.05).toFixed(2)
          ),
        },
        intentional_forward: {
          result: lastSession?.cadence_intention_forward,
          index: parseFloat(
            (lastSession?.cadence_intention_forward * 0.1).toFixed(2)
          ),
        },
      },
      flexos: {
        hip: {
          result: lastSession?.flexos_hip,
          index: parseFloat((lastSession?.flexos_hip * 0.05).toFixed(2)),
        },
        knee: {
          result: lastSession?.flexos_knee,
          index: parseFloat((lastSession?.flexos_knee * 0.05).toFixed(2)),
        },
      },
      threshold: {
        hipL: {
          result: lastSession?.threshold_hipl,
          index: parseFloat((lastSession?.threshold_hipl * 0.025).toFixed(2)),
        },
        kneeL: {
          result: lastSession?.threshold_kneel,
          index: parseFloat((lastSession?.threshold_kneel * 0.025).toFixed(2)),
        },
        hipR: {
          result: lastSession?.threshold_hipr,
          index: parseFloat((lastSession?.threshold_hipr * 0.025).toFixed(2)),
        },
        kneeR: {
          result: lastSession?.threshold_kneer,
          index: parseFloat((lastSession?.threshold_kneer * 0.025).toFixed(2)),
        },
      },
      therapist: {
        dungarees: {
          result: lastSession?.has_chest,
          index: parseFloat((lastSession?.has_chest * 0.05).toFixed(2)),
        },
        effort: {
          result: lastSession?.effort,
          index: parseFloat((lastSession?.effort * 0.15).toFixed(2)),
        },
      },
      total: lastSession?.evaluation,
    });
    // SETEO Tabla comparativa de los datos de la última sesión con respecto a los históricos y últimos mensuales
    setDataTableOfLastSessionDataAgainstHistorical({
      automaticSteps: {
        historical: {
          forward: {
            result: sessionData?.total_steps_automatic_forward,
            index: parseFloat(
              (sessionData?.total_steps_automatic_forward * 0.05).toFixed(2)
            ),
          },
          backward: {
            result: sessionData?.total_steps_automatic_backward,
            index: parseFloat(
              (sessionData?.total_steps_automatic_backward * 0.05).toFixed(2)
            ),
          },
        },
        lastMonth: {
          forward: {
            result: sessionMonthEvaluation?.total_steps_automatic_forward,
            index: parseFloat(
              (
                sessionMonthEvaluation?.total_steps_automatic_forward * 0.05
              ).toFixed(2)
            ),
          },
          backward: {
            result: sessionMonthEvaluation?.total_steps_automatic_backward,
            index: parseFloat(
              (
                sessionMonthEvaluation?.total_steps_automatic_backward * 0.05
              ).toFixed(2)
            ),
          },
        },
        lastSession: {
          forward: {
            result: lastSession?.steps_automatic_forward,
            index: parseFloat(
              (lastSession?.steps_automatic_forward * 0.05).toFixed(2)
            ),
          },
          backward: {
            result: lastSession?.steps_automatic_backward,
            index: parseFloat(
              (lastSession?.steps_automatic_backward * 0.05).toFixed(2)
            ),
          },
        },
      },
      intentionalSteps: {
        historical: {
          forward: {
            result: sessionData?.total_steps_intention_forward,
            index: parseFloat(
              (sessionData?.total_steps_intention_forward * 0.1).toFixed(2)
            ),
          },
          backward: {
            result: sessionData?.total_steps_intention_backward,
            index: parseFloat(
              (sessionData?.total_steps_intention_backward * 0.1).toFixed(2)
            ),
          },
        },
        lastMonth: {
          forward: {
            result: sessionMonthEvaluation?.total_steps_intention_forward,
            index: parseFloat(
              (
                sessionMonthEvaluation?.total_steps_intention_forward * 0.1
              ).toFixed(2)
            ),
          },
          backward: {
            result: sessionMonthEvaluation?.total_steps_intention_backward,
            index: parseFloat(
              (
                sessionMonthEvaluation?.total_steps_intention_backward * 0.1
              ).toFixed(2)
            ),
          },
        },
        lastSession: {
          forward: {
            result: lastSession?.steps_intention_forward,
            index: parseFloat(
              (lastSession?.steps_intention_forward * 0.1).toFixed(2)
            ),
          },
          backward: {
            result: lastSession?.steps_intention_backward,
            index: lastSession?.steps_intention_backward * 0.1,
          },
        },
      },
      cadence: {
        historical: {
          automatic: {
            result: sessionData?.cadence_automatic_forward,
            index: parseFloat(
              (sessionData?.cadence_automatic_forward * 0.05).toFixed(2)
            ),
          },
          intentional: {
            result: sessionData?.cadence_intention_forward,
            index: parseFloat(
              (sessionData?.cadence_intention_forward * 0.1).toFixed(2)
            ),
          },
        },
        lastMonth: {
          automatic: {
            result: sessionMonthEvaluation?.cadence_automatic_forward,
            index: parseFloat(
              (
                sessionMonthEvaluation?.cadence_automatic_forward * 0.05
              ).toFixed(2)
            ),
          },
          intentional: {
            result: sessionMonthEvaluation?.cadence_intention_forward,
            index: parseFloat(
              (sessionMonthEvaluation?.cadence_intention_forward * 0.1).toFixed(
                2
              )
            ),
          },
        },
        lastSession: {
          automatic: {
            result: lastSession?.cadence_automatic_forward,
            index: parseFloat(
              (lastSession?.cadence_automatic_forward * 0.05).toFixed(2)
            ),
          },
          intentional: {
            result: lastSession?.cadence_intention_forward,
            index: parseFloat(
              (lastSession?.cadence_intention_forward * 0.1).toFixed(2)
            ),
          },
        },
      },
      flexos: {
        historical: {
          hip: {
            result: sessionData?.flexos_hip,
            index: parseFloat((sessionData?.flexos_hip * 0.05).toFixed(2)),
          },
          knee: {
            result: sessionData?.flexos_knee,
            index: parseFloat((sessionData?.flexos_knee * 0.05).toFixed(2)),
          },
        },
        lastMonth: {
          hip: {
            result: sessionMonthEvaluation?.flexos_hip,
            index: parseFloat(
              (sessionMonthEvaluation?.flexos_hip * 0.05).toFixed(2)
            ),
          },
          knee: {
            result: sessionMonthEvaluation?.flexos_knee,
            index: parseFloat(
              (sessionMonthEvaluation?.flexos_knee * 0.05).toFixed(2)
            ),
          },
        },
        lastSession: {
          hip: {
            result: lastSession?.flexos_hip,
            index: parseFloat((lastSession?.flexos_hip * 0.05).toFixed(2)),
          },
          knee: {
            result: lastSession?.flexos_knee,
            index: parseFloat((lastSession?.flexos_knee * 0.05).toFixed(2)),
          },
        },
      },
      threshold: {
        historical: {
          hipl: {
            result: sessionData?.threshold_hipl,
            index: parseFloat((sessionData?.threshold_hipl * 0.025).toFixed(2)),
          },
          kneel: {
            result: sessionData?.threshold_kneel,
            index: parseFloat(
              (sessionData?.threshold_kneel * 0.025).toFixed(2)
            ),
          },
          hipr: {
            result: sessionData?.threshold_hipr,
            index: parseFloat((sessionData?.threshold_hipr * 0.025).toFixed(2)),
          },
          kneer: {
            result: sessionData?.threshold_kneer,
            index: parseFloat(
              (sessionData?.threshold_kneer * 0.025).toFixed(2)
            ),
          },
        },
        lastMonth: {
          hipl: {
            result: sessionMonthEvaluation?.threshold_hipl,
            index: parseFloat(
              (sessionMonthEvaluation?.threshold_hipl * 0.025).toFixed(2)
            ),
          },
          kneel: {
            result: sessionMonthEvaluation?.threshold_kneel,
            index: parseFloat(
              (sessionMonthEvaluation?.threshold_kneel * 0.025).toFixed(2)
            ),
          },
          hipr: {
            result: sessionMonthEvaluation?.threshold_hipr,
            index: parseFloat(
              (sessionMonthEvaluation?.threshold_hipr * 0.025).toFixed(2)
            ),
          },
          kneer: {
            result: sessionMonthEvaluation?.threshold_kneer,
            index: parseFloat(
              (sessionMonthEvaluation?.threshold_kneer * 0.025).toFixed(2)
            ),
          },
        },
        lastSession: {
          hipl: {
            result: lastSession?.threshold_hipr,
            index: parseFloat((lastSession?.threshold_hipr * 0.025).toFixed(2)),
          },
          kneel: {
            result: lastSession?.threshold_kneel,
            index: parseFloat(
              (lastSession?.threshold_kneel * 0.025).toFixed(2)
            ),
          },
          hipr: {
            result: lastSession?.threshold_hipr,
            index: parseFloat((lastSession?.threshold_hipr * 0.025).toFixed(2)),
          },
          kneer: {
            result: lastSession?.threshold_kneer,
            index: parseFloat(
              (lastSession?.threshold_kneer * 0.025).toFixed(2)
            ),
          },
        },
      },
      therapist: {
        historical: {
          dungarees: {
            result: sessionData?.chest,
            index: parseFloat((sessionData?.chest * 0.05).toFixed(2)),
          },
          effort: {
            result: sessionData?.effort,
            index: parseFloat((sessionData?.effort * 0.15).toFixed(2)),
          },
        },
        lastMonth: {
          dungarees: {
            result: sessionMonthEvaluation?.chest,
            index: sessionMonthEvaluation?.chest * 0.05,
          },
          effort: {
            result: sessionMonthEvaluation?.effort,
            index: parseFloat(
              (sessionMonthEvaluation?.effort * 0.15).toFixed(2)
            ),
          },
        },
        lastSession: {
          dungarees: {
            result: lastSession?.has_chest,
            index: parseFloat((lastSession?.has_chest * 0.05).toFixed(2)),
          },
          effort: {
            result: lastSession?.effort,
            index: parseFloat((lastSession?.effort * 0.15).toFixed(2)),
          },
        },
      },
      totalHistorical: sessionData?.median_evaluation,
      totalLastMonth: sessionMonthEvaluation?.median_evaluation,
      totalLastSession: lastSession?.evaluation,
    });

    // SETEO REPORTE SEGUIMIENTO DIAGNOSTICO
    setDiagnostic('Diagnóstico...');

    // SETEO OBJETIVOS
    setTargets('Objetivos...');

    // SETO DESCRIPCION
    setDescription('Descripción...');

    // SETEO NOMBRRE, APELLIDOS Y NUMERO COLEGIADO
    setNameMedical('Nombre');
    setSurnamesMedical('Apellidos');
    setRegistrationNumberMedical('Número Colegiado');

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

  // Función para mostrar Toast
  const show = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
      life: 5000,
    });
  };

  return (
    <div
      className="col-12 py-7 "
      style={{ paddingLeft: '150px', paddingRight: '150px' }}
    >
      <Toast ref={toast} />

      <div className="border-2 border-dashed surface-border border-round surface-card xl:p-4 p-2 grid formgrid grid-nogutter">
        {/* BOTON IMPRIMIR */}
        <div className="col-12 flex justify-content-center justify-content-between p-3 mt-4">
          {/* button go back */}

          <Button
            tooltip={t('pages.reports.goBack')}
            tooltipOptions={{
              position: 'bottom',
              mouseTrack: true,
              mouseTrackTop: 15,
            }}
            icon="pi pi-angle-left"
            rounded
            onClick={() => navigate(`/authenticated/patients/${patient_id}`)}
            severity="secondary"
            aria-label="Bookmark"
          />

          <Button
            label={t('pages.reports.saveToPdf')}
            icon="pi pi-file-pdf"
            className="p-button p-button-primary"
            onClick={() => {
              generatePdfFile();
              show('info', t('messages.info'), t('messages.downloading'));
            }}
          />
        </div>

        {/* -------------------------------------------------PAGINA 1 ------------------------------------------------- */}
        <div id="report">
          <div id="page-1">
            {/* CABECERA INFORME - PÁGINA 1*/}
            <div className="col-12">
              <ReportHeader />
            </div>

            {/* RESUMEN DE SESIÓN */}
            <div className="col-12">
              <div className="text-center  text-4xl font-bold">
                {t('pages.reports.sessionSummary')}
              </div>
            </div>

            {/* DATOS DEL PACIENTE */}
            <div className="col-12">
              <div className="border-1 surface-border border-solid my-7 border-round-2xl">
                <div className="font-bold text-700 text-4xl p-3">
                  {t('pages.reports.patientData')}
                </div>
                <div className="surface-border border-top border-solid"></div>
                <div className="grid grid-nogutter pt-5 text-2xl">
                  <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">
                      {t('pages.reports.nameSurname')}
                    </div>
                    <div className="text-900">
                      {patient?.name} {patient?.surnames}
                    </div>
                  </div>
                  <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">
                      {t('pages.reports.birthDate')}
                    </div>
                    <div className="text-900">
                      {getDateToString(patient?.birth_date)}
                    </div>
                  </div>
                  <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">
                      {t('pages.reports.firstUseDevice')}
                    </div>
                    <div className="text-900">
                      {getDateToString(earlySession?.date)}
                    </div>
                  </div>
                  <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">
                      {t('pages.reports.lastUseDevice')}
                    </div>
                    <div className="text-900">
                      {getDateToString(lastSession?.date)}
                    </div>
                  </div>

                  <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">
                      {t('pages.reports.totalNumberofSessionsWithDevice')}
                    </div>
                    <div className="text-900">{sessions.length}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* RESULTADOS */}
            <div className="col-12">
              <div className="surface-card  p-4 my-4 border-solid border-1 surface-border	border-round-2xl">
                <div className="text-center text-2xl mb-3 my-4">
                  <span className="font-italic">
                    {t('pages.reports.yourResults')}
                  </span>
                  <div className="grid grid-nogutter align-items-end	justify-content-center gap-2 mt-4 ">
                    <div className="col-12 md:col-3 h-11rem surface-ground p-3 border-round-2xl border-solid border-1 surface-border flex flex-column justify-content-center align-items-center">
                      <span className="text-5xl font-bold">
                        {/* TODO: total de paso */}
                        {totalSteps}
                      </span>
                      <span className="text-500 font-italic	text-2xl">
                        {t('pages.reports.steps')}
                      </span>
                    </div>
                    <div className="col-12 md:col-3 h-13rem surface-ground p-3 border-round-2xl border-solid border-1 surface-border bg-primary-reverse flex flex-column justify-content-center align-items-center">
                      <span className="text-5xl font-bold ">
                        {score.toFixed(2)}%
                      </span>
                      <span className="text-500 font-italic	text-2xl">
                        {t('pages.reports.score')}
                      </span>
                    </div>
                    <div className="col-12 md:col-3 h-11rem surface-ground p-3 border-round-2xl border-solid border-1 surface-border flex flex-column justify-content-center align-items-center">
                      <span className="text-5xl font-bold ">
                        {/* TODO: total de tiempo */}
                        {formatTime(totalTime)}
                      </span>
                      <span className="text-500 font-italic	text-2xl">
                        {t('pages.reports.totalTime')}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 text-700 font-italic	text-2xl">
                    <strong>
                      {totalSteps} {t('pages.reports.steps')}{' '}
                    </strong>
                    {t('pages.reports.performed')}
                  </div>
                </div>
              </div>
            </div>

            {/* GRÁFICA 1: PASOS */}

            <div className="col-12  text-2xl">
              <div className="sm:surface-100 sm:container-graphs__shadow-customs-graphs sm:p-4 sm:border-round-2xl  w-full ">
                <div className="">
                  <div className=" text-700 font-bold mb-3">
                    {t('pages.reports.totalSteps')}
                  </div>
                  <GraphTotalSteps
                    key={Math.random()}
                    data={stepGraph.dataStepsDistribution}
                    options={stepGraph.optionsStepsDistribution}
                    updateResize={updateResize}
                    languageChanged={languageChanged}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* ----------------------------------------------------------------------------------------------------------- */}

          {/* -------------------------------------------------PAGINA 2 ------------------------------------------------- */}
          <div id="page-2">
            {/* CABECERA PAGINA 2 */}
            <div className="col-12">
              <ReportHeader />
            </div>

            {/* REPORTE SEGUIMIENTO*/}
            <div className="col-12">
              <div className="border-1 surface-border border-solid my-7 border-round-2xl">
                <div className="font-bold text-700 text-4xl p-3">
                  {t('pages.reports.followUpReport')}
                </div>
                <div className="surface-border border-top border-solid"></div>
                <div className="grid grid-nogutter pt-5 text-2xl">
                  <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">
                      {t('pages.reports.nameSurname')}
                    </div>
                    <div className="text-900">
                      {patient?.name} {patient?.surnames}
                    </div>
                  </div>
                  <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">
                      {t('pages.reports.birthDate')}
                    </div>
                    <div className="text-900">
                      {getDateToString(patient?.birth_date)}
                    </div>
                  </div>
                  <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">
                      {t('pages.reports.firstUseDevice')}
                    </div>
                    <div className="text-900">
                      {getDateToString(earlySession?.date)}
                    </div>
                  </div>
                  <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">
                      {t('pages.reports.lastUseDevice')}
                    </div>
                    <div className="text-900">
                      {getDateToString(lastSession?.date)}
                    </div>
                  </div>
                  <div className="col-12 md:col-6 p-3">
                    <div className="text-500 font-medium mb-2">
                      {t('pages.reports.totalNumberofSessionsWithDevice')}
                    </div>
                    <div className="text-900">{sessions.length}</div>
                  </div>
                </div>
                <div className="text-700 text-4xl p-3">
                  {t('pages.reports.diagnostic')}
                  <div className="px-5 text-justify pt-5 pb-5 ">
                    <MaxLinesInputTextarea
                      maxLines={10}
                      placeholder={diagnostic}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* OBJETIVOS */}
            <div className="col-12">
              <div className="border-1 surface-border border-solid my-7 border-round-2xl">
                <div className="font-bold text-700 text-4xl p-3">
                  {t('pages.reports.targets')}
                </div>
                <div className="surface-border border-top border-solid"></div>
                <div className="px-5 text-justify pt-5 pb-5">
                  <MaxLinesInputTextarea maxLines={10} placeholder={targets} />
                </div>
              </div>
            </div>

            {/* DESCRIPCION */}
            <div className="col-12">
              <div className="border-1 surface-border border-solid my-7 border-round-2xl">
                <div className="font-bold text-700 text-4xl p-3">
                  {t('pages.reports.description')}
                </div>
                <div className="surface-border border-top border-solid"></div>
                <div className="px-5 text-justify pt-5 pb-5">
                  <MaxLinesInputTextarea
                    maxLines={10}
                    placeholder={description}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* ----------------------------------------------------------------------------------------------------------- */}

          {/* -------------------------------------------------PAGINA 3 ------------------------------------------------- */}
          <div id="page-3">
            {/* CABECERA PAGINA 3 */}
            <div className="col-12">
              <ReportHeader />
            </div>

            {/* ÚLTIMA SESIÓN RECIBIDA*/}
            <div className="col-12">
              <div className="surface-card  my-7">
                <div className="text-center mb-5">
                  <div className="text-4xl font-bold">
                    {t('pages.reports.lastSessionReceived.title')}
                  </div>
                </div>
                <div className="text-large mb-3 text-2xl">
                  {t('pages.reports.lastSessionReceived.totalSteps')}
                  <strong>
                    {` ${lastSessionReceived.steps} `}
                    {t('pages.reports.lastSessionReceived.steps')}
                  </strong>
                  . <br />
                  <strong>{` ${formatTime(lastSessionReceived.time)} `}</strong>
                  {t('pages.reports.lastSessionReceived.time')}
                  . <br />
                  <strong>
                    {` ${formatTime(lastSessionReceived.walking)} `}
                  </strong>
                  {t('pages.reports.lastSessionReceived.walking')}
                  . <br />
                  <strong>
                    {` ${formatTime(lastSessionReceived.standing)} `}
                  </strong>
                  {t('pages.reports.lastSessionReceived.standing')}
                  . <br />
                  <strong>{lastSessionReceived.score.toFixed(2)} % </strong>
                  {t('pages.reports.lastSessionReceived.score')}
                  . <br />
                </div>
              </div>
            </div>

            {/* GRÁFICA DISTRIBUCIÓN DE LOS PASOS REALIZADOS EN EL ÚLTIMO DÍA */}
            <div className="col-12 mb-3 ">
              <div className="sm:surface-100 sm:container-graphs__shadow-customs-graphs sm:p-4 sm:border-round-2xl sm:text-center w-full ">
                <div className="">
                  <div className="text-center text-700 font-bold mb-3 text-2xl">
                    {t('pages.reports.graphs.distributionStepsLastDay')}
                  </div>
                  <GraphDistributionOfTheStepsPerformedOnTheLastDay
                    key={Math.random()}
                    data={stepGraphLastSession.dataStepsLastSessionDistribution}
                    options={
                      stepGraphLastSession.optionsStepsLastSessionDistribution
                    }
                    updateResize={updateResize}
                    languageChanged={languageChanged}
                  />
                </div>
              </div>
            </div>

            {/* TABLA PUNTUACIÓN ÚLTIMA SESIÓN */}
            <div className="col-12 ">
              <TableScoreLastSessions data={dataTableScoreLastSessions} />
            </div>
          </div>
          {/* ----------------------------------------------------------------------------------------------------------- */}

          {/* -------------------------------------------------PAGINA 4 ------------------------------------------------- */}
          <div id="page-4">
            {/* CABECERA PAGINA 4 */}
            <div className="col-12">
              <ReportHeader />
            </div>

            {/* SESIONES REALIZADAS EN EL ÚLTIMO MES*/}
            <div className="col-12">
              <div className="surface-card ">
                <div className="text-center mb-5">
                  <div className="text-4xl font-bold">
                    {t('pages.reports.sessionsLastMonth.title')}
                  </div>
                </div>
                <div className="text-large mb-3 text-2xl">
                  <strong>{lastSessionsMonth?.steps}</strong>{' '}
                  {t('pages.reports.sessionsLastMonth.steps')}{' '}
                  <strong>
                    {getDateToString(lastSessionsMonth?.last_date)}
                  </strong>
                  <br />
                  <strong> {formatTime(lastSessionsMonth?.time)} </strong>
                  {t('pages.reports.sessionsLastMonth.time')}{' '}
                  <strong>{lastSessionsMonth?.num_sessions}</strong>{' '}
                  {t('pages.reports.sessionsLastMonth.sessions')}{' '}
                  {t('pages.reports.sessionsLastMonth.theLastMonth')} <br />
                  <strong>{lastSessionsMonth?.score} </strong>
                  {t('pages.reports.sessionsLastMonth.score')}
                </div>
              </div>
            </div>

            {/* GRÁFICA PASOS POR SESION Y MODO */}
            <div className="col-12 ">
              <div className="sm:surface-100 sm:container-graphs__shadow-customs-graphs sm:p-4 sm:border-round-2xl  w-full ">
                <div className="">
                  <div className=" text-700 font-bold mb-3 text-2xl">
                    {t('pages.reports.graphs.dayAndMode')}
                  </div>
                  <GraphStepsPerDayAndMode
                    key={Math.random()}
                    data={dataGraphStepsPerDayAndModeProps}
                    options={optionsGraphStepsPerDayAndModeProps}
                    updateResize={updateResize}
                    languageChanged={languageChanged}
                  />
                </div>
              </div>
            </div>

            {/* GRÁFICA EVOLUCIÓN DIARIA DE LA PUNTUACIÓN */}
            <div className="col-12 mb-3 ">
              <div className="sm:surface-100 sm:container-graphs__shadow-customs-graphs sm:p-4 sm:border-round-2xl  w-full ">
                <div className="">
                  <div className=" text-700 font-bold mb-3 text-2xl">
                    {t('pages.reports.graphs.dailyEvolutionOfTheScore')}
                  </div>
                  <GraphDailyEvolutionOfTheScoreProps
                    key={Math.random()}
                    data={dataGraphDailyEvolutionOfTheScoreProps}
                    options={optionsGraphDailyEvolutionOfTheScoreProps}
                    updateResize={updateResize}
                    languageChanged={languageChanged}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* ----------------------------------------------------------------------------------------------------------- */}

          {/* -------------------------------------------------PAGINA 5 ------------------------------------------------- */}
          <div id="page-5">
            {/* CABECERA PAGINA 5 */}
            <div className="col-12">
              <ReportHeader />
            </div>

            {/* SESIONES REALIZADAS DESDE SU INICIO*/}
            <div className="col-12">
              <div className="surface-card  mb-3">
                <div className="text-center mb-5">
                  <div className="text-4xl font-bold">
                    {t('pages.reports.sessionsHeldInception.title')}
                  </div>
                </div>
                <div className="text-large mb-3 text-2xl">
                  <strong>{sessionsMadeFromTheStart.steps}</strong>{' '}
                  {t('pages.reports.sessionsHeldInception.steps')}{' '}
                  <strong>
                    {getDateToString(sessionsMadeFromTheStart.last_date)}
                  </strong>
                  <br />
                  <strong>{formatTime(sessionsMadeFromTheStart.time)} </strong>
                  {t('pages.reports.sessionsHeldInception.time')}{' '}
                  <strong>{sessionsMadeFromTheStart.num_sessions}</strong>{' '}
                  {t('pages.reports.sessionsHeldInception.sessions')}
                  <br />
                  <strong>{sessionsMadeFromTheStart.score}</strong>{' '}
                  {t('pages.reports.sessionsHeldInception.score')}
                </div>
              </div>
            </div>

            {/* GRÁFICA CANTIDAD TOTAL DE PASOS DESDE INICIO*/}
            <div className="col-12 mb-3 ">
              <div className="sm:surface-100 sm:container-graphs__shadow-customs-graphs sm:p-4 sm:border-round-2xl  w-full ">
                <div className="">
                  <div className=" text-700 font-bold mb-3 text-2xl">
                    {t('pages.reports.graphs.totalSteps')}
                  </div>
                  <GraphTotalNumberOfStepsFromStart
                    key={Math.random()}
                    data={dataGraphTotalNumberOfStepsFromStart}
                    options={optionsGraphTotalNumberOfStepsFromStart}
                    updateResize={updateResize}
                    languageChanged={languageChanged}
                  />
                </div>
              </div>
            </div>

            {/* GRÁFICA CANTIDAD TOTAL DE TIEMPO DESDE INICIO*/}
            <div className="col-12 mb-3 text-2xl">
              <div className="sm:surface-100 sm:container-graphs__shadow-customs-graphs sm:p-4 sm:border-round-2xl  w-full ">
                <div className="">
                  <div className=" text-700 font-bold mb-3">
                    {t('pages.reports.graphs.totalTime')}
                  </div>
                  <GraphTotalAmountOfTimesSinceStart
                    key={Math.random()}
                    data={dataGraphTotalAmountOfTimesSinceStart}
                    options={optionsGraphTotalAmountOfTimesSinceStart}
                    updateResize={updateResize}
                    languageChanged={languageChanged}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* ----------------------------------------------------------------------------------------------------------- */}

          {/* -------------------------------------------------PAGINA 5 ------------------------------------------------- */}
          <div id="page-6">
            {/* CABECERA PAGINA 5 */}
            <div className="col-12">
              <ReportHeader />
            </div>

            {/* GRÁFICA EVOLUCION MENSUAL DE LA PUNTUACIÓN */}
            <div className="col-12 mb-3 text-2xl">
              <div className="sm:surface-100 sm:container-graphs__shadow-customs-graphs sm:p-4 sm:border-round-2xl  w-full ">
                <div className="">
                  <div className="text-700 font-bold mb-3">
                    {t('pages.reports.graphs.evolutionOfTheScore')}
                  </div>
                  <GraphMonthlyEvolutionOfTheScore
                    key={Math.random()}
                    data={dataGraphMonthlyEvolutionOfTheScore}
                    options={optionsGraphMonthlyEvolutionOfTheScore}
                    updateResize={updateResize}
                    languageChanged={languageChanged}
                  />
                </div>
              </div>
            </div>

            {/* TABLA COMPARATIVA DE LOS DATOS DE LA ÚLTIMA SESIÓN CON RESPECTO A LOS HISTÓRICOS Y ÚLTIMOS MENSUALES */}
            <div className="col-12 text-2xl">
              <ComparativeTableOfLastSessionDataAgainstHistoricalAndLatestMonthlyData
                data={dataTableOfLastSessionDataAgainstHistorical}
              />
            </div>

            {/* FOOTER FIRMA - Nº COLEGIADO - CERTIFICADO EN ATLAS */}
            <div className="col-12 text-2xl">
              <div className="flex align-items-center justify-content-end mt-5">
                <div className="surface-ground p-5 border-round-2xl flex flex-column gap-3 font-italic">
                  <div className="">
                    {nameMedical} {surnamesMedical} :
                    <div className="flex items-center justify-end mt-2">
                      <MaxLinesInputTextarea
                        maxLines={10}
                        placeholder={nameMedical}
                      />
                    </div>
                  </div>
                  <div className="">
                    {registrationNumberMedical} :
                    <div className="flex items-center justify-end mt-2">
                      <MaxLinesInputTextarea
                        maxLines={10}
                        placeholder={registrationNumberMedical}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Informe;
