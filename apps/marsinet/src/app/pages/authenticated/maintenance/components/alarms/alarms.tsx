import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState, useCallback } from 'react';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';

import { MarsinetContext } from '../../../../../context/marsinetProvider';
import {
  Alarm,
  AlarmApiFactory,
  MyAccountApiFactory,
  Session,
  SessionsApiFactory,
} from '../../../../../typescript-axios';
import {
  SessionData,
  getTotalsOfSessions,
  getSessionsFilteredByDate,
} from '@marsinet/commons';

import SessionSummaryBar from '../../../patients/patient/components/session-summary-bar/session-summary-bar';
import EventList from '../../../sessions/components/event-list/event-list';
import CustomCalendar from 'apps/marsinet/src/app/components/calendar/calendar';

const apiServiceDevices = MyAccountApiFactory();
const apiServiceSessions = SessionsApiFactory();
const apiServiceAlarms = AlarmApiFactory();

interface Device {
  d_id: string;
  created_at: string;
  updated_at: string;
  o_id: string;
  type: string;
  active: boolean;
  serial: string;
  version: string;
}

export function Alarms() {
  const { t, i18n } = useTranslation();
  const { access_token, setRole, setAdmin } = useContext(MarsinetContext);

  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [highlightedDates, setHighlightedDates] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [updateAlarms, setUpdateAlarms] = useState<boolean>(false);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDate, setLoadingDate] = useState<boolean>(false);
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
    const fetchDevices = async () => {
      if (!access_token) return;

      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      try {
        const response =
          await apiServiceDevices.myAccountControllerGetMyDevices();
        const data = response.data;
        const sortedDevices = data['devices'].sort((a: Device, b: Device) =>
          a.serial.localeCompare(b.serial)
        );
        setDevices(sortedDevices);
        setSelectedDevice(sortedDevices[0]);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, [access_token]);

  const fetchSessionsAndAlarms = useCallback(async () => {
    if (!access_token || !selectedDevice) return;

    setLoading(true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    try {
      const [
        sessionsResponse,
        alarmsResponse,
        dataResponse,
        alarmsAllResponse,
      ] = await Promise.all([
        apiServiceSessions.sessionControllerFindAllSessionsOfDevice(
          selectedDevice.d_id
        ),
        apiServiceAlarms.alarmControllerFindAllAlarmOfDevicePerDay(
          selectedDevice.d_id,
          `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`
        ),
        apiServiceDevices.myAccountControllerGetData(),
        apiServiceAlarms.alarmControllerFindAllAlarmOfDevice(
          selectedDevice.d_id
        ),
      ]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sessionData: any = sessionsResponse.data;
      const sessions = getSessionsFilteredByDate(sessionData);
      setSessions(sessions);
      setTotalSession(getTotalsOfSessions(sessions));

      const alarmsAll = alarmsAllResponse.data;
      setHighlightedDates(
        alarmsAll.map(
          (alarm: Alarm) =>
            new Date(alarm.timestamp).toISOString().split('T')[0]
        )
      );

      const _alarms = [...alarmsResponse.data].sort(
        (a: Alarm, b: Alarm) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

      setAlarms(_alarms);

      const data = dataResponse.data;
      setRole(data.organization?.role);
      setAdmin(data.can_edit);
    } catch (error) {
      console.error('Error fetching sessions and alarms:', error);
    }
    setLoading(false);
    setUpdateAlarms(false);
  }, [access_token, selectedDevice]);

  const fetchAlarmsByDate = useCallback(async () => {
    if (!access_token || !selectedDevice) return;

    setLoadingDate(true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    try {
      const alarmsResponse =
        await apiServiceAlarms.alarmControllerFindAllAlarmOfDevicePerDay(
          selectedDevice.d_id,
          `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`
        );

      const _alarms = [...alarmsResponse.data].sort(
        (a: Alarm, b: Alarm) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

      setAlarms(_alarms);
    } catch (error) {
      console.error('Error fetching alarms by date:', error);
    }
    setLoadingDate(false);
  }, [access_token, selectedDevice, startDate]);

  useEffect(() => {
    if (selectedDevice) {
      fetchSessionsAndAlarms();
    }
  }, [fetchSessionsAndAlarms, selectedDevice, i18n.language, updateAlarms]);

  useEffect(() => {
    if (selectedDevice) {
      fetchAlarmsByDate();
    }
  }, [fetchAlarmsByDate, startDate]);

  const handleChangeSelectedDevice = useCallback((e: { value: Device }) => {
    setSelectedDevice(e.value);
  }, []);

  const selectedDeviceTemplate = useCallback(
    (option: Device) =>
      option ? <div>{option.serial}</div> : <div>{t('selectDevice')}</div>,
    [t]
  );

  const devicesTemplateDropdown = useCallback(
    (option: Device) => <div>{option.serial}</div>,
    []
  );

  return (
    <div className="col-12 grid grid-nogutter">
      <div className="surface-card border-round-2xl col-12 p-4">
        <div className="col-12 px-0 grid grid-nogutter text-center md:text-left">
          <div className="col-6 mb-3 xl:mb-0 flex align-items-center flex-column xl:flex-row gap-2">
            <div className="p-fluid w-full text-center">
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
                itemTemplate={devicesTemplateDropdown}
                showClear
                filter
              />
            </div>
          </div>
          <div className="col-6 mb-3 xl:mb-0 flex align-items-center flex-column xl:flex-row gap-2">
            <div className="p-fluid w-full text-center">
              <CustomCalendar
                highlightedDates={highlightedDates}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </div>
          </div>
        </div>
        {!selectedDevice && (
          <div className="col-12">
            <div className="text-center text-700 font-bold py-6">
              {t('selectOneDevice')}
            </div>
          </div>
        )}
        {loading ? (
          <div className="flex justify-content-center align-items-center h-full">
            <ProgressSpinner />
          </div>
        ) : (
          selectedDevice && (
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
              <div className="col-12 px-0 grid grid-nogutter text-center md:text-left">
                <div className="grid grid-nogutter h-full w-full">
                  <div className="col-12">
                    <div className="surface-100 h-full container-graphs__shadow-customs-graphs md:p-4 p-2 border-round-2xl text-center">
                      <div className="grid h-full">
                        <div className="col-12">
                          {loadingDate ? (
                            <div className="flex justify-content-center align-items-center h-full">
                              <ProgressSpinner />
                            </div>
                          ) : (
                            <EventList
                              alarms={alarms}
                              setUpdateAlarms={setUpdateAlarms}
                              loading={loading}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default Alarms;
