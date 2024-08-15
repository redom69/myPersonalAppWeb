import { useContext, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';

import {
  AlarmApiFactory,
  MyAccountApiFactory,
  SessionsApiFactory,
} from '../../../typescript-axios';
import SessionSummaryBar from '../../../components/ssb/session-summary-bar';
import { Context } from '../../../context/provider';
import { ChartData, ChartOptions } from 'chart.js';
import GraphNumbersOfSteps from '../../../components/gnos/gnos';
import IncidentReport from '../../../components/ir/ir';
import GraphTimeOfUse from '../../../components/gtou/gtou';
import GraphDistribution from '../../../components/gd/gd';
import DateRangePicker from '../../../components/date-range-picker/date-range-picker';

import {
  SessionData,
  getEarlyAndLastAlarm,
  getEarlyAndLastSession,
  getNumberOfStepDirection,
  getNumberOfStepMode,
  getNumberOfTimeMode,
  getStepGraph,
  getStepGraphTime,
  getTotalsOfSessions,
} from '@mypaw/commons';

const apiServiceDevices = MyAccountApiFactory();
const apiServiceSessions = SessionsApiFactory();
const apiServiceAlarms = AlarmApiFactory();
const documentStyle = getComputedStyle(document.documentElement);

interface DeviceSession {
  active: boolean;
  created_at: string;
  d_id: string;
  o_id: string;
  serial: string;
  type: string;
  updated_at: string;
  version: string;
}

export function Sessions() {
  const { t, i18n } = useTranslation();
  const toast = useRef(null);
  const { access_token, setRole, setAdmin } = useContext(Context);

  const [devices, setDevices] = useState<DeviceSession[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<DeviceSession | null>(
    null
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [allSessions, setAllSessions] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sessions, setSessions] = useState<any[]>([]);
  const [highlightedDates, setHighlightedDates] = useState<string[]>([]);
  const [updateResize, setUpdateResize] = useState<boolean>(false);
  const [languageChanged, setLanguageChanged] = useState(false);

  const [numberOfStepsMode, setNumberOfStepsMode] = useState<{
    data: ChartData;
    options: ChartOptions;
  }>({
    data: { labels: [], datasets: [] },
    options: {},
  });
  const [numberOfStepsDirection, setNumberOfStepsDirection] = useState<{
    data: ChartData;
    options: ChartOptions;
  }>({
    data: { labels: [], datasets: [] },
    options: {},
  });
  const [timeOfUseMode, setTimeOfUseMode] = useState<{
    data: ChartData;
    options: ChartOptions;
  }>({
    data: { labels: [], datasets: [] },
    options: {},
  });
  const [timeOfUseDirection, setTimeOfUseDirection] = useState<{
    data: ChartData;
    options: ChartOptions;
  }>({
    data: { labels: [], datasets: [] },
    options: {},
  });
  const [distributionGraphSteps, setDistributionGraphSteps] = useState<{
    data: ChartData;
    options: ChartOptions;
  }>({
    data: { labels: [], datasets: [] },
    options: {},
  });
  const [distributionGraphTime, setDistributionGraphTime] = useState<{
    data: ChartData;
    options: ChartOptions;
  }>({
    data: { labels: [], datasets: [] },
    options: {},
  });

  const [showNumberOfStepsMode, setShowNumberOfStepsMode] =
    useState<boolean>(true);
  const [showNumberOfStepsDirection, setShowNumberOfStepsDirection] =
    useState<boolean>(false);
  const [showTimeOfUseMode, setShowTimeOfUseMode] = useState<boolean>(true);
  const [showTimeOfUseDirection, setShowTimeOfUseDirection] =
    useState<boolean>(false);
  const [showDistributionSteps, setShowDistributionSteps] =
    useState<boolean>(true);
  const [showDistributionTime, setShowDistributionTime] =
    useState<boolean>(false);

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

  useEffect(() => {
    window.addEventListener('resize', updateResizeGraph);
    return () => window.removeEventListener('resize', updateResizeGraph);
  }, []);

  const updateResizeGraph = () => {
    setUpdateResize(!updateResize);
  };

  const handleStepsCheckboxChangeNumberOfStepsMode = () => {
    setShowNumberOfStepsMode(true);
    setShowNumberOfStepsDirection(false);
  };

  const handleStepsCheckboxChangeNumberOfStepsDirection = () => {
    setShowNumberOfStepsMode(false);
    setShowNumberOfStepsDirection(true);
  };

  const handleStepsCheckboxChangeTimeOfUseMode = () => {
    setShowTimeOfUseMode(true);
    setShowTimeOfUseDirection(false);
  };

  const handleTimeCheckboxChangeTimeOfUseDirection = () => {
    setShowTimeOfUseMode(false);
    setShowTimeOfUseDirection(true);
  };

  const handleStepsCheckboxChangeDistributionSteps = () => {
    setShowDistributionSteps(true);
    setShowDistributionTime(false);
  };

  const handleTimeCheckboxChangeDistributionTime = () => {
    setShowDistributionSteps(false);
    setShowDistributionTime(true);
  };

  useEffect(() => {
    if (!access_token) return;

    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    apiServiceDevices
      .myAccountControllerGetMyDevices()
      .then((response) => {
        const data = response.data;
        const sortedDevices = data['devices'].sort((a, b) =>
          (a.serial || '').localeCompare(b.serial || '')
        );
        console.log(sortedDevices);

        setDevices(sortedDevices);
        setSelectedDevice(sortedDevices[0]);

        return apiServiceDevices.myAccountControllerGetData();
      })
      .then((response) => {
        const data = response.data;
        setRole(data.organization?.role);
        setAdmin(data.can_edit);
      })
      .catch((error) => {
        console.error('Error fetching devices or data:', error);
      });
  }, [access_token]);
  const prevDeviceIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!access_token || !selectedDevice?.d_id) return;

    if (prevDeviceIdRef.current === selectedDevice.d_id) return;

    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

    const fetchSessions = async () => {
      try {
        const response =
          await apiServiceSessions.sessionControllerFindAllSessionsOfDevice(
            selectedDevice.d_id
          );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _sessions: any = response.data;

        setLanguageChanged(!languageChanged);
        const dates = _sessions.map(
          (session) => new Date(session.date).toISOString().split('T')[0]
        );

        setHighlightedDates(dates);

        const { earlySession, lastSession } = getEarlyAndLastSession(_sessions);
        setStartDate(earlySession ? new Date(earlySession.date) : null);
        setEndDate(lastSession ? new Date(lastSession.date) : null);
        setAllSessions(_sessions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    const fetchAlarms = async () => {
      if (!startDate) return;

      try {
        const response =
          await apiServiceAlarms.alarmControllerFindAllAlarmOfDevicePerDay(
            selectedDevice.d_id,
            startDate.toISOString().split('T')[0]
          );
        const _alarms = response.data;

        setLanguageChanged(!languageChanged);
        _alarms.sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

        const dates = _alarms.map(
          (alarm) => new Date(alarm.timestamp).toISOString().split('T')[0]
        );

        setHighlightedDates(dates);

        if (Array.isArray(_alarms)) {
          const { lastAlarm: earlyAlarm, earlyAlarm: lastAlarm } =
            getEarlyAndLastAlarm(_alarms);
          setStartDate(earlyAlarm ? new Date(earlyAlarm.timestamp) : null);
          setEndDate(lastAlarm ? new Date(lastAlarm.timestamp) : null);
        }
      } catch (error) {
        console.error('Error fetching alarms:', error);
      }
    };

    fetchSessions();
    fetchAlarms();

    prevDeviceIdRef.current = selectedDevice.d_id;
  }, [selectedDevice?.d_id, i18n.language, access_token, startDate]);

  const devicesTemplateDropwdown = (option) => <div>{option.serial}</div>;

  const selectedDeviceTemplate = (option) =>
    option ? <div>{option.serial}</div> : <div>{t('selectDevice')}</div>;

  const handleChangeSelectedDevice = (e) => {
    setSelectedDevice(e.value);
  };

  useEffect(() => {
    const _sessions = allSessions.filter((session) => {
      const sessionDate = new Date(session.date);

      if (startDate && endDate) {
        if (startDate.getTime() > endDate.getTime()) {
          show('error', t('messages.error'), t('messages.invalidDate'));
          return false;
        }
        return sessionDate >= startDate && sessionDate <= endDate;
      } else if (startDate) {
        return sessionDate >= startDate;
      } else if (endDate) {
        return sessionDate <= endDate;
      }
      return true;
    });

    setSessions(_sessions);
  }, [startDate, endDate, allSessions]);

  useEffect(() => {
    const _total = getTotalsOfSessions(sessions);
    setTotalSession(_total);

    const { dataNumberOfSteps, optionsNumberOfSteps } = getNumberOfStepMode(
      sessions,
      documentStyle,
      t
    );
    setNumberOfStepsMode({
      data: dataNumberOfSteps,
      options: optionsNumberOfSteps,
    });

    const { dataNumberOfStepsDirection, optionsNumberOfStepsDirection } =
      getNumberOfStepDirection(sessions, documentStyle, t);
    setNumberOfStepsDirection({
      data: dataNumberOfStepsDirection,
      options: optionsNumberOfStepsDirection,
    });

    const { dataNumberOfTime, optionsTimeOfUse } = getNumberOfTimeMode(
      sessions,
      documentStyle,
      t
    );
    setTimeOfUseMode({
      data: dataNumberOfTime,
      options: optionsTimeOfUse,
    });

    setTimeOfUseDirection({
      data: dataNumberOfTime,
      options: optionsTimeOfUse,
    });

    const sessionData = getTotalsOfSessions(sessions);

    const circularGraphSteps = getStepGraph(
      sessionData,
      documentStyle,
      t,
      window,
      true
    );
    setDistributionGraphSteps({
      data: circularGraphSteps.dataStepsDistribution,
      options: circularGraphSteps.optionsStepsDistribution,
    });

    const circularGraphTime = getStepGraphTime(
      sessionData,
      documentStyle,
      t,
      window
    );
    setDistributionGraphTime({
      data: circularGraphTime.dataStepsDistribution,
      options: circularGraphTime.optionsStepsDistribution,
    });
  }, [sessions]);

  const show = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  return (
    <div className="col-12 xl:pl-7 xl:pr-7">
      <Toast ref={toast} />
      <div className="col-12">
        <div className="surface-card p-3 shadow-3 border-round-xl flex justify-content-between align-items-center mb-5">
          <div className="font-medium text-2xl text-900 p-2">
            {t('pages.sessions.sessions')}
          </div>
        </div>
      </div>
      <div className="col-12 grid grid-nogutter">
        <div className="surface-card border-round-2xl col-12 p-4">
          <div className="col-12 px-0 grid grid-nogutter text-center md:text-left">
            <div className="col-12 mb-3 xl:mb-0 xl:col-6 flex align-items-center flex-column xl:flex-row gap-2">
              <div className="p-fluid w-full">
                <label className="font-bold block mb-2">
                  {t('selectDevice')}:
                </label>
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
            <div className="col-12 mb-3 xl:mb-0 xl:col-6 flex align-items-center justify-content-around flex-column xl:flex-row gap-2">
              <DateRangePicker
                highlightedDates={highlightedDates}
                startDate={startDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                endDate={endDate}
              />
            </div>
          </div>
          {!selectedDevice && (
            <div className="col-12">
              <div className="text-center text-700 font-bold py-6">
                {t('selectOneDevice')}
              </div>
            </div>
          )}
          {selectedDevice && (
            <>
              <div className="col-12 px-0">
                <SessionSummaryBar
                  total_sessions={sessions.length}
                  total_steps={totalSession.total_steps_total}
                  total_time={totalSession.total_time_use}
                  total_time_walking={totalSession.total_time_walking}
                  total_time_standing={totalSession.total_time_standing}
                  average_steps_session={totalSession.median_total_steps}
                  average_time_session={totalSession.median_total_time}
                />
              </div>
              <div className="grid justify-content-center flex-column-reverse xl:flex-row">
                <div className="col-12 xl:col-6 grid grid-nogutter">
                  <div className="grid mx-0 w-full align-items-center surface-100 container-graphs__shadow-customs-graphs border-round-2xl">
                    <div className="col-12">
                      <div className="h-full md:p-4 p-2 text-center">
                        <div className="flex justify-content-center align-items-center gap-3">
                          <div className="flex gap-2 mb-3">
                            <label className="font-bold block mb-2">
                              {t('pages.patients.viewPatient.sessions.mode')}
                            </label>
                            <Checkbox
                              checked={showNumberOfStepsMode}
                              onChange={
                                handleStepsCheckboxChangeNumberOfStepsMode
                              }
                            />
                          </div>
                          <div className="flex gap-2 mb-3">
                            <label className="font-bold block mb-2">
                              {t(
                                'pages.patients.viewPatient.sessions.direction'
                              )}
                            </label>
                            <Checkbox
                              checked={showNumberOfStepsDirection}
                              onChange={
                                handleStepsCheckboxChangeNumberOfStepsDirection
                              }
                            />
                          </div>
                        </div>
                        <div className="text-center text-700 font-bold mb-3">
                          {t('pages.sessions.numberOfSteps')}
                        </div>
                        {showNumberOfStepsMode && (
                          <GraphNumbersOfSteps
                            key={`${numberOfStepsMode.data.labels.join('-')}-${numberOfStepsMode.data.datasets.length}`}
                            updateResize={updateResize}
                            data={numberOfStepsMode.data}
                            options={numberOfStepsMode.options}
                            languageChanged={languageChanged}
                          />
                        )}
                        {showNumberOfStepsDirection && (
                          <GraphNumbersOfSteps
                            key={`${numberOfStepsMode.data.labels.join('-')}-${numberOfStepsMode.data.datasets.length}`}
                            updateResize={updateResize}
                            data={numberOfStepsDirection.data}
                            options={numberOfStepsDirection.options}
                            languageChanged={languageChanged}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="h-full md:p-4 p-2 text-center">
                        <div className="flex justify-content-center align-items-center gap-3">
                          <div className="flex gap-2 mb-3">
                            <label className="font-bold block mb-2">
                              {t('pages.patients.viewPatient.sessions.mode')}
                            </label>
                            <Checkbox
                              checked={showTimeOfUseMode}
                              onChange={handleStepsCheckboxChangeTimeOfUseMode}
                            />
                          </div>
                          <div className="flex gap-2 mb-3">
                            <label className="font-bold block mb-2">
                              {t(
                                'pages.patients.viewPatient.sessions.direction'
                              )}
                            </label>
                            <Checkbox
                              checked={showTimeOfUseDirection}
                              onChange={
                                handleTimeCheckboxChangeTimeOfUseDirection
                              }
                            />
                          </div>
                        </div>
                        <div className="text-center text-700 font-bold mb-3">
                          {t('pages.sessions.timeOfUse')}
                        </div>
                        {showTimeOfUseMode && (
                          <GraphTimeOfUse
                            key={`${numberOfStepsMode.data.labels.join('-')}-${numberOfStepsMode.data.datasets.length}`}
                            updateResize={updateResize}
                            data={timeOfUseMode.data}
                            options={timeOfUseMode.options}
                            languageChanged={languageChanged}
                          />
                        )}
                        {showTimeOfUseDirection && (
                          <GraphTimeOfUse
                            key={`${numberOfStepsMode.data.labels.join('-')}-${numberOfStepsMode.data.datasets.length}`}
                            updateResize={updateResize}
                            data={timeOfUseDirection.data}
                            options={timeOfUseDirection.options}
                            languageChanged={languageChanged}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 xl:col-6 grid grid-nogutter">
                  <div className="grid mx-0 w-full align-items-center surface-100 container-graphs__shadow-customs-graphs border-round-2xl">
                    <div className="col-12">
                      <div className="p-4">
                        <div className="flex justify-content-center align-items-center gap-3">
                          <div className="flex gap-2 mb-3">
                            <label className="font-bold block mb-2">
                              {t('pages.patients.viewPatient.sessions.steps')}
                            </label>
                            <Checkbox
                              checked={showDistributionSteps}
                              onChange={
                                handleStepsCheckboxChangeDistributionSteps
                              }
                            />
                          </div>
                          <div className="flex gap-2 mb-3">
                            <label className="font-bold block mb-2">
                              {t('pages.patients.viewPatient.sessions.time')}
                            </label>
                            <Checkbox
                              checked={showDistributionTime}
                              onChange={
                                handleTimeCheckboxChangeDistributionTime
                              }
                            />
                          </div>
                        </div>
                        {showDistributionSteps && (
                          <>
                            <div className="text-center text-700 font-bold mb-3">
                              {t('pages.sessions.numberOfSteps')}
                            </div>
                            <GraphDistribution
                              key={`${numberOfStepsMode.data.labels.join('-')}-${numberOfStepsMode.data.datasets.length}`}
                              updateResize={updateResize}
                              data={distributionGraphSteps.data}
                              options={distributionGraphSteps.options}
                              languageChanged={languageChanged}
                            />
                          </>
                        )}
                        {showDistributionTime && (
                          <>
                            <div className="text-center text-700 font-bold mb-3">
                              {t('pages.sessions.timeOfUse')}
                            </div>
                            <GraphDistribution
                              key={`${numberOfStepsMode.data.labels.join('-')}-${numberOfStepsMode.data.datasets.length}`}
                              updateResize={updateResize}
                              data={distributionGraphTime.data}
                              options={distributionGraphTime.options}
                              languageChanged={languageChanged}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 flex align-items-center">
                  <div className="grid grid-nogutter h-full w-full">
                    <div className="col-12">
                      <div className="surface-100 h-full container-graphs__shadow-customs-graphs md:p-4 p-2 border-round-2xl text-center">
                        <div className="grid h-full">
                          <div className="col-12">
                            <div className="text-center font-bold text-500 text-2xl flex align-items-center justify-content-center">
                              <i className="pi pi-exclamation-triangle mr-2"></i>
                              {t('pages.sessions.incidentList')}
                            </div>
                            <IncidentReport />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sessions;
