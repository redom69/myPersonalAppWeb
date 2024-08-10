import { useTranslation } from 'react-i18next';

import { useContext, useEffect, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { ChartData, ChartOptions } from 'chart.js';
import GraphNumberOfSteps from './components/graph-number-of-steps/graph-number-of-steps';
import GraphTimeOfUse from './components/graph-time-of-use/graph-time-of-use';
import { Dropdown } from 'primereact/dropdown';
import GraphDistributionSteps from './components/graph-distribution-steps/graph-distribution-steps';
import GraphDistributionTime from './components/graph-distribution-time/graph-distribution-time';

import { Context } from '../../../context/provider';
import axios from 'axios';
import {
  MyAccountApiFactory,
  Session,
  SessionsApiFactory,
} from '../../../typescript-axios';

import {
  SessionData,
  getStepGraph,
  getStepGraphTime,
  getTotalSteps,
  getTotalTime,
  getTotalsOfSessions,
} from '@mypaw/commons';

const documentStyle = getComputedStyle(document.documentElement);
const textColorSecondary = documentStyle.getPropertyValue(
  '--text-color-secondary'
);
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

const apiService = MyAccountApiFactory();
const apiServiceSessions = SessionsApiFactory();

/* eslint-disable-next-line */
export interface HomeProps {}

interface Device {
  id: string;
  created_at: string;
  updated_at: string;
  o_id: string;
  type: string;
  active: boolean;
  serial: string;
  version: string;
}

export function Home(props: HomeProps) {
  const { t, i18n } = useTranslation();
  const { access_token, setRole, setAdmin } = useContext(Context);

  const [devices, setDevices] = useState<Device[]>([]);

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [sessions, setSessions] = useState<Session[]>([]);
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
    total_time_use: 0,
    total_time_walking: 0,
    total_time_standing: 0,
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
    evaluation: 0,
    median_evaluation: 0,
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
  // ESTADOS PARA LAS GRAFICAS
  const [timeOfUse, setTimeOfUse] = useState<{
    data: ChartData;
    options: ChartOptions;
  }>({
    data: {
      labels: [],
      datasets: [],
    },
    options: {},
  });

  const [numberOfSteps, setNumberOfSteps] = useState<{
    data: ChartData;
    options: ChartOptions;
  }>({
    data: {
      labels: [],
      datasets: [],
    },
    options: {},
  });

  const [stepsDistribution, setStepsDistribution] = useState<{
    data: ChartData;
    options: ChartOptions;
  }>({
    data: {
      labels: [],
      datasets: [],
    },
    options: {},
  });

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

  // ESTADOS PARA CHECKBOX GRAFICA DISTRIBUCION DE PASOS Y TIEMPO
  const [showStepsDistributionGraph, setShowStepsDistributioGraph] =
    useState<boolean>(true);
  const [showTimeDistributionGraph, setShowTimeDistributionGraph] =
    useState<boolean>(false);

  const handleStepsCheckboxChange = () => {
    setShowStepsDistributioGraph(true);
    setShowTimeDistributionGraph(false);
  };

  const handleTimeCheckboxChange = () => {
    setShowStepsDistributioGraph(false);
    setShowTimeDistributionGraph(true);
  };

  const [updateResize, setUpdateResize] = useState<boolean>(false);

  const updateResizeGraph = () => {
    setUpdateResize(!updateResize);
  };

  const [languageChanged, setLanguageChanged] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('resize', updateResizeGraph);
    return () => window.removeEventListener('resize', updateResizeGraph);
  });

  const devicesTemplateDropwdown = (option) => {
    return <div>{option.serial}</div>;
  };

  const selectedDeviceTemplate = (option) => {
    if (!option) {
      return <div>{t('selectDevice')}</div>;
    }
    if (option) return <div>{option.serial}</div>;
  };

  const handleChangeSelectedDevice = (e) => {
    setSelectedDevice(e.value);
  };

  // TRAER DISPOSITIVOS
  useEffect(() => {
    if (!access_token) return;
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

    try {
      apiService.myAccountControllerGetMyDevices().then((response) => {
        const data = response.data;
        const sortedDevices = data['devices'].sort((a, b) => {
          const nameA = (a.serial || '').toUpperCase();
          const nameB = (b.serial || '').toUpperCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });

        setDevices(sortedDevices);
        setSelectedDevice(sortedDevices[0]);
      });
      apiService.myAccountControllerGetData().then((response) => {
        const data = response.data;

        setRole(data.organization?.role);
        setAdmin(data.can_edit);
      });
    } catch (error) {
      console.log(error);
    }
  }, [access_token]);

  // CARGAR GRÁFICAS
  useEffect(() => {
    if (!access_token || !selectedDevice?.d_id) return;
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

    try {
      apiServiceSessions
        .sessionControllerFindAllSessionsOfDevice(selectedDevice?.d_id)
        .then((response) => {
          const _sessions = response.data;
          setLanguageChanged(!languageChanged);
          if (Array.isArray(_sessions)) {
            setSessions(_sessions);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [selectedDevice]);

  useEffect(() => {
    const sessionData = getTotalsOfSessions(sessions);

    setTotalSession(sessionData);

    // CARGAR GRAFICAS
    setLanguageChanged(!languageChanged);

    const { dataTimeOfUse, optionsTimeOfUse } = getTotalTime(
      sessions,
      documentStyle,
      t,
      surfaceBorder,
      textColorSecondary
    );
    setTimeOfUse({
      data: dataTimeOfUse,
      options: optionsTimeOfUse,
    });

    const { dataNumberOfSteps, optionsNumberOfSteps } = getTotalSteps(
      sessions,
      documentStyle,
      t,
      surfaceBorder,
      textColorSecondary
    );
    setNumberOfSteps({
      data: dataNumberOfSteps,
      options: optionsNumberOfSteps,
    });

    const circularGraphSteps = getStepGraph(
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
    setStepsDistribution({
      data: circularGraphSteps.dataStepsDistribution,
      options: circularGraphSteps.optionsStepsDistribution,
    });

    setStepsDistributionTime({
      data: circularGraphTime.dataStepsDistribution,
      options: circularGraphTime.optionsStepsDistribution,
    });
  }, [sessions, updateResize, i18n.language]);

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
    <div className="col-12 xl:pl-7 xl:pr-7">
      <div className="col-12 ">
        <div className="surface-card p-3 shadow-3 border-round-xl flex justify-content-between align-items-center mb-5">
          <div className="font-medium text-2xl text-900 p-2">Dashboard</div>
        </div>
      </div>

      <div className="col-12 grid mx-0">
        <div className="surface-card border-round-xl shadow-3	py-5 px-3 col-12">
          <div className="field p-fluid col-12 ">
            <label className="font-bold block mb-2">{t('selectDevice')}</label>
            <Dropdown
              value={selectedDevice}
              onChange={handleChangeSelectedDevice}
              options={devices}
              optionLabel="serial"
              placeholder={t('selectDevice')}
              valueTemplate={selectedDeviceTemplate}
              itemTemplate={devicesTemplateDropwdown}
              showClear
              filter
            />
          </div>
        </div>
      </div>

      {/* CONTENEDOR DE GRÁFICAS */}
      <div className="col-12 grid mx-0">
        <div className="surface-card border-round-xl shadow-3	py-5 px-3 col-12">
          {selectedDevice ? (
            <>
              <label className="block mb-3 text-center text-lg font-bold">
                {t('sessionLastMonth')}
              </label>
              {/* TIEMPO DE USO */}
              <div className="grid grid-nogutter col-12 flex-column-reverse md:flex-row">
                <div className="col-12 md:col-6 mb-3 p-3 md:mb-5">
                  <div className="surface-100 h-full container-graphs__shadow-customs-graphs md:p-4 p-2 border-round-2xl text-center">
                    <div className="">
                      <div className="text-center text-700 font-bold mb-3">
                        {t('timeOfUse')}
                      </div>
                      {/* GRAFICA */}
                      <GraphTimeOfUse
                        updateResize={updateResize}
                        data={timeOfUse.data}
                        options={timeOfUse.options}
                        languageChanged={languageChanged}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 md:col-6 mb-3 p-3 md:mb-5">
                  <div className="surface-100 h-full container-graphs__shadow-customs-graphs md:p-4 p-2 border-round-2xl text-center">
                    <div className="h-full flex flex-column justify-content-center">
                      <div className="text-center">
                        <img
                          alt="clock-marsinet"
                          className="w-5rem"
                          src="assets/icons8-clock-100.png"
                        />
                        <div className="text-center text-700 text-2xl font-bold mb-3">
                          {t('pages.patients.viewPatient.sessions.totalTime')}
                        </div>
                        <div className="">
                          <div className="font-bold text-4xl">
                            {formatTime(totalSession.total_time_use)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* CANTIDAD DE PASOS */}
              <div className="grid grid-nogutter col-12 flex-column-reverse md:flex-row">
                <div className="col-12 md:col-6 mb-3 p-3 md:mb-5">
                  <div className="surface-100 h-full container-graphs__shadow-customs-graphs md:p-4 p-2 border-round-2xl text-center">
                    <div className="">
                      <div className="text-center text-700 font-bold mb-3">
                        {t('numberOfSteps')}
                      </div>
                      {/* GRAFICA */}
                      <GraphNumberOfSteps
                        updateResize={updateResize}
                        data={numberOfSteps.data}
                        options={numberOfSteps.options}
                        languageChanged={languageChanged}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 md:col-6 mb-3 p-3 md:mb-5">
                  <div className="surface-100 h-full container-graphs__shadow-customs-graphs md:p-4 p-2 border-round-2xl text-center">
                    <div className="h-full flex flex-column justify-content-center">
                      <div className="text-center">
                        <img
                          className="w-5rem"
                          src="assets/icons8-footprint-80.png"
                          alt="steps"
                        />
                        <div className="text-center text-700 text-2xl font-bold mb-3">
                          {t('pages.patients.viewPatient.sessions.totalSteps')}
                        </div>
                        <div className="">
                          <div className="font-bold text-4xl">
                            {`${totalSession.total_steps_total} ${t('steps').toLocaleLowerCase()}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* GRAFICA DISTRIBUCION */}
              <div className="col-12 grid justify-content-center">
                <div className="col-12 md:col-6 mb-3 p-3 border-round-xl align-items-center mb-5">
                  <div className="surface-100 h-full container-graphs__shadow-customs-graphs md:p-4 p-2 border-round-2xl text-center">
                    {/* CHECKBOXS */}
                    <div className="flex justify-content-center align-items-center gap-3">
                      <div className="flex gap-2 mb-3">
                        <label className="font-bold block mb-2">
                          {t('pages.patients.viewPatient.sessions.steps')}
                        </label>
                        <Checkbox
                          checked={showStepsDistributionGraph}
                          onChange={handleStepsCheckboxChange}
                        />
                      </div>

                      <div className="flex gap-2 mb-3">
                        <label className="font-bold block mb-2">
                          {t('pages.patients.viewPatient.sessions.time')}
                        </label>
                        <Checkbox
                          checked={showTimeDistributionGraph}
                          onChange={handleTimeCheckboxChange}
                        />
                      </div>
                    </div>

                    {/* GRÁFICAS */}
                    <div className="">
                      <div className="text-center text-700 font-bold mb-3">
                        {showStepsDistributionGraph
                          ? t(
                              'pages.patients.viewPatient.sessions.stepsDistribution'
                            )
                          : showTimeDistributionGraph
                            ? t(
                                'pages.patients.viewPatient.sessions.timeDistribution'
                              )
                            : ''}
                      </div>
                      {/* GRAFICA DISTRIBUCION DE PASOS */}
                      {showStepsDistributionGraph && (
                        <GraphDistributionSteps
                          data={stepsDistribution.data}
                          options={stepsDistribution.options}
                          updateResize={updateResize}
                          languageChanged={languageChanged}
                        />
                      )}
                      {/* GRAFICA DISTRIBUCION DE TIEMPO */}
                      {showTimeDistributionGraph && (
                        <GraphDistributionTime
                          data={stepsDistributionTime.data}
                          options={stepsDistributionTime.options}
                          updateResize={updateResize}
                          languageChanged={languageChanged}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="col-12">
              <div className="text-center text-700 font-bold py-6">
                {t('selectOneDevice')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
