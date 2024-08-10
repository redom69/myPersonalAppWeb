import React, { useEffect, useRef, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import AreaChartCustom from 'apps/mypaw/src/app/components/area-chart/area-chart';
import ConfigPatient from 'apps/mypaw/src/app/components/config_patient/dashboard';
import MultiLineChart from 'apps/mypaw/src/app/components/multi-line-chart/multi-line-chart';
import { IngestionApiFactory } from 'apps/mypaw/src/app/typescript-axios';
import { t } from 'i18next';
import {
  BatteryData,
  SessionData,
  MotorsAng,
  TemperatureData,
  MotorVoltageData,
  TorqueData,
  GraphsProps,
  EnergyMonitor,
  GlobalPosition,
  ElevSens,
  ElevCtrl,
  MotorsInt,
} from 'apps/mypaw/src/app/models/graphsModels';

const apiService = IngestionApiFactory();

export function Graphs(props: Readonly<GraphsProps>) {
  const { ingestionId, setShowGraphs, zip_data } = props;
  const toast = useRef(null);

  const [sessionData, setSessionData] = useState<SessionData[]>([]);
  const [batteryData, setBatteryData] = useState<BatteryData[]>([]);
  const [motorsAng, setMotorsAng] = useState<MotorsAng[]>([]);
  const [torqueData, setTorqueData] = useState<TorqueData[]>([]);
  const [temperatureData, setTemperatureData] = useState<TemperatureData[]>([]);
  const [motorVoltageData, setMotorVoltageData] = useState<MotorVoltageData[]>(
    []
  );
  const [energyMonitor, setEnergyMonitor] = useState<EnergyMonitor[]>([]);
  const [globalPosition, setGlobalPosition] = useState<GlobalPosition[]>([]);
  const [elevSens, setElevSens] = useState<ElevSens[]>([]);
  const [elevCtrl, setElevCtrl] = useState<ElevCtrl[]>([]);
  const [motorsInt, setMotorsInt] = useState<MotorsInt[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [configPatient, setConfigPatient] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const [graphsVisibility, setGraphsVisibility] = useState({
    generalState: false,
    battery: false,
    motorsRef: false,

    motorsTorque: false,
    motorsTemp: false,
    motorsCurrent: false,
    motorsInt: false,
    energy_monitor: false,
    global_position: false,
    elev_sens: false,
    elev_ctrl: false,
  });

  console.log(sessionData);

  console.log(motorsAng);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any =
          await apiService.ingestionControllerFindOne(ingestionId);

        if (response.data) {
          setSessionData(response.data.sessionData);
          setBatteryData(response.data.batteryData);
          setMotorsAng(response.data.motorsAng);
          setTorqueData(response.data.torqueData);
          setTemperatureData(response.data.temperatureData);
          setMotorVoltageData(response.data.motorVoltageData);
          setConfigPatient(response.data.config_patient);
          setEnergyMonitor(response.data.energyMonitor);
          setGlobalPosition(response.data.globalPosition);
          setElevSens(response.data.elevSens);
          setElevCtrl(response.data.elevCtrl);
          setMotorsInt(response.data.motorsInt);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        show('error', t('messages.error'), t('messages.error_ingestion'));
        setLoading(false);
      }
    };
    fetchdata();
  }, [ingestionId]);

  const handleCheckboxChange = (name: string) => (e) => {
    setGraphsVisibility({ ...graphsVisibility, [name]: e.checked });
  };

  const show = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  return (
    <div className="col-12 grid grid-nogutter">
      <Toast ref={toast} />

      {loading ? (
        <div
          className="flex justify-center items-center align-center col-12"
          style={{ height: '400px' }}
        >
          <ProgressSpinner
            aria-label="Loading"
            style={{ width: '50%', height: '50%', color: '#007bff' }}
            animationDuration=".5s"
          />
        </div>
      ) : (
        <>
          <Button
            icon="pi pi-angle-left"
            rounded
            onClick={() => setShowGraphs(false)}
            severity="secondary"
            className="mr-4"
            aria-label="Bookmark"
          />
          <div className="surface-card border-round-2xl col-12 p-4">
            <h1 className="text-4xl font-bold text-center">
              {t('pages.maintenance.ingestion.generalInformation') +
                ' ' +
                zip_data}
            </h1>
            <ConfigPatient config={configPatient} />
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={graphsVisibility.generalState}
                    onChange={handleCheckboxChange('generalState')}
                  />
                  <label>{t('pages.maintenance.ingestion.generalState')}</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={graphsVisibility.battery}
                    onChange={handleCheckboxChange('battery')}
                  />
                  <label>{t('pages.maintenance.ingestion.batery')}</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={graphsVisibility.energy_monitor}
                    onChange={handleCheckboxChange('energy_monitor')}
                  />
                  <label>
                    {t('pages.maintenance.ingestion.energy_monitor')}
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={graphsVisibility.global_position}
                    onChange={handleCheckboxChange('global_position')}
                  />
                  <label>
                    {t('pages.maintenance.ingestion.global_position')}
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={graphsVisibility.elev_sens}
                    onChange={handleCheckboxChange('elev_sens')}
                  />
                  <label>{t('pages.maintenance.ingestion.elev_sens')}</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={graphsVisibility.elev_ctrl}
                    onChange={handleCheckboxChange('elev_ctrl')}
                  />
                  <label>{t('pages.maintenance.ingestion.elev_ctrl')}</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={graphsVisibility.motorsRef}
                    onChange={handleCheckboxChange('motorsRef')}
                  />
                  <label>{t('pages.maintenance.ingestion.motorsRef')}</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={graphsVisibility.motorsTorque}
                    onChange={handleCheckboxChange('motorsTorque')}
                  />
                  <label>{t('pages.maintenance.ingestion.motorsTorque')}</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={graphsVisibility.motorsTemp}
                    onChange={handleCheckboxChange('motorsTemp')}
                  />
                  <label>{t('pages.maintenance.ingestion.motorsTemp')}</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={graphsVisibility.motorsCurrent}
                    onChange={handleCheckboxChange('motorsCurrent')}
                  />
                  <label>
                    {t('pages.maintenance.ingestion.motorsCurrent')}
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={graphsVisibility.motorsInt}
                    onChange={handleCheckboxChange('motorsInt')}
                  />
                  <label>{t('pages.maintenance.ingestion.motorsInt')}</label>
                </div>
              </div>
            </div>

            {graphsVisibility.generalState && (
              <AreaChartCustom
                data={sessionData}
                title={t('pages.maintenance.ingestion.generalState')}
                setLoading={setLoading}
              />
            )}
            {graphsVisibility.battery && (
              <AreaChartCustom
                data={batteryData}
                title={t('pages.maintenance.ingestion.batery')}
                setLoading={setLoading}
              />
            )}
            {graphsVisibility.energy_monitor && (
              <AreaChartCustom
                data={energyMonitor}
                title={t('pages.maintenance.ingestion.energy_monitor')}
                setLoading={setLoading}
              />
            )}
            {graphsVisibility.global_position && (
              <AreaChartCustom
                data={globalPosition}
                title={t('pages.maintenance.ingestion.global_position')}
                setLoading={setLoading}
              />
            )}

            {graphsVisibility.elev_sens && (
              <AreaChartCustom
                data={elevSens}
                title={t('pages.maintenance.ingestion.elev_sens')}
                setLoading={setLoading}
              />
            )}
            {graphsVisibility.elev_ctrl && (
              <AreaChartCustom
                data={elevCtrl}
                title={t('pages.maintenance.ingestion.elev_ctrl')}
                setLoading={setLoading}
              />
            )}
            {(graphsVisibility.motorsRef ||
              graphsVisibility.motorsTorque ||
              graphsVisibility.motorsTemp ||
              graphsVisibility.motorsCurrent ||
              graphsVisibility.motorsInt) && (
              <h1 className="text-4xl font-bold text-center">
                {t('pages.maintenance.ingestion.motorsInformation')}
              </h1>
            )}
            {graphsVisibility.motorsRef && (
              <MultiLineChart
                data={motorsAng}
                title={t('pages.maintenance.ingestion.motorsRef')}
                setLoading={setLoading}
              />
            )}
            {graphsVisibility.motorsTorque && (
              <MultiLineChart
                data={torqueData}
                title={t('pages.maintenance.ingestion.motorsTorque')}
                setLoading={setLoading}
              />
            )}
            {graphsVisibility.motorsTemp && (
              <MultiLineChart
                data={temperatureData}
                title={t('pages.maintenance.ingestion.motorsTemp')}
                setLoading={setLoading}
              />
            )}
            {graphsVisibility.motorsCurrent && (
              <MultiLineChart
                data={motorVoltageData}
                title={t('pages.maintenance.ingestion.motorsCurrent')}
                setLoading={setLoading}
              />
            )}
            {graphsVisibility.motorsInt && (
              <MultiLineChart
                data={motorsInt}
                title={t('pages.maintenance.ingestion.motorsInt')}
                setLoading={setLoading}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Graphs;
