import { ChartData, ChartOptions } from 'chart.js';
import GraphStepsDistribution from './components/sd/sd';

import { useTranslation } from 'react-i18next';
import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';

import GraphScore from './components/p/p';
import GraphSteps from './components/s/s';
import GraphTime from './components/t/t';
import GraphCadence from './components/c/c';

/* eslint-disable-next-line */
export interface ContainerForGraphicsProps {
  updateResize: boolean;
  dataStepsDistribution: ChartData;
  optionsStepsDistribution: ChartOptions;
  dataTimeDistribution: ChartData;
  optionsTimeDistribution: ChartOptions;
  dataScore: ChartData;
  optionsScore: ChartOptions;
  dataStepsDirection: ChartData;
  optionsStepsDirection: ChartOptions;
  dataStepsMode: ChartData;
  optionsStepsMode: ChartOptions;
  dataTimeDirection: ChartData;
  optionsTimeDirection: ChartOptions;
  dataTimeMode: ChartData;
  optionsTimeMode: ChartOptions;
  dataCadenceDirection: ChartData;
  optionsCadenceDirection: ChartOptions;
  dataCadenceMode: ChartData;
  optionsCadenceMode: ChartOptions;
}

export function ContainerForGraphics(props: ContainerForGraphicsProps) {
  const { t } = useTranslation();

  // ESTADOS PARA LA GRAFICA DISTRIBUCION DE PASOS Y TIEMPO
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

  // ESTADOS PARA LA GRAFICA PASOS MODO Y DIRECCION
  const [showStepsMode, setShowStepsMode] = useState<boolean>(false);
  const [showStepsDirection, setShowStepsDirection] = useState<boolean>(true);

  const handleStepsDirectionCheckboxChange = () => {
    setShowStepsDirection(true);
    setShowStepsMode(false);
  };

  const handleStepsModeCheckboxChange = () => {
    setShowStepsDirection(false);
    setShowStepsMode(true);
  };

  // ESTADO PARA LA GRAFICA TIEMPO MODO Y DIRECCION
  const [showTimeMode, setShowTimeMode] = useState<boolean>(false);
  const [showTimeDirection, setShowTimeDirection] = useState<boolean>(true);

  const handleTimeModeCheckboxChange = () => {
    setShowTimeDirection(false);
    setShowTimeMode(true);
  };

  const handleTimeDirectionCheckboxChange = () => {
    setShowTimeDirection(true);
    setShowTimeMode(false);
  };

  // ESTADO PARA LA GRAFICA DE CADENCIA MODO Y DIRECCION
  const [showCadenceMode, setShowCadenceMode] = useState<boolean>(false);
  const [showCadenceDirection, setShowCadenceDirection] =
    useState<boolean>(true);

  const handleCadenceModeCheckboxChange = () => {
    setShowCadenceDirection(false);
    setShowCadenceMode(true);
  };

  const handleCadenceDirectionCheckboxChange = () => {
    setShowCadenceDirection(true);
    setShowCadenceMode(false);
  };

  return (
    <div className="align-items-center grid">
      <div className="col-12 xl:col-8 xxl:col-8">
        <div className="grid formgrid">
          {/* GRAFICA PASOS */}
          <div className="col-12 md:col-6 mb-3 ">
            <div className="surface-100 h-full container-graphs__shadow-customs-graphs md:p-4 p-2 border-round-2xl text-center">
              {/* CHECKBOX */}
              <div className="flex justify-content-center align-items-center gap-3">
                <div className="flex gap-2 mb-3">
                  <label className="font-bold block mb-2">
                    {' '}
                    {t('pages.patients.viewPatient.sessions.mode')}
                  </label>
                  <Checkbox
                    checked={showStepsMode}
                    onChange={handleStepsModeCheckboxChange}
                  />
                </div>

                <div className="flex gap-2 mb-3">
                  <label className="font-bold block mb-2">
                    {' '}
                    {t('pages.patients.viewPatient.sessions.direction')}
                  </label>
                  <Checkbox
                    checked={showStepsDirection}
                    onChange={handleStepsDirectionCheckboxChange}
                  />
                </div>
              </div>

              <div className="">
                <div className="text-center text-700 font-bold mb-3">
                  {t('pages.patients.viewPatient.sessions.steps')}
                </div>
                {showStepsDirection && (
                  <GraphSteps
                    key={Math.random()}
                    updateResize={props.updateResize}
                    data={props.dataStepsDirection}
                    options={props.optionsStepsDirection}
                  />
                )}
                {showStepsMode && (
                  <GraphSteps
                    key={Math.random()}
                    updateResize={props.updateResize}
                    data={props.dataStepsMode}
                    options={props.optionsStepsMode}
                  />
                )}
              </div>
            </div>
          </div>
          {/* GRAFICA TIEMPO */}
          <div className="col-12 md:col-6 mb-3">
            <div className="surface-100 h-full container-graphs__shadow-customs-graphs md:p-4 p-2 border-round-2xl text-center">
              {/* CHECKBOX */}
              <div className="flex justify-content-center align-items-center gap-3">
                <div className="flex gap-2 mb-3">
                  <label className="font-bold block mb-2">
                    {' '}
                    {t('pages.patients.viewPatient.sessions.mode')}
                  </label>
                  <Checkbox
                    checked={showTimeMode}
                    onChange={handleTimeModeCheckboxChange}
                  />
                </div>

                <div className="flex gap-2 mb-3">
                  <label className="font-bold block mb-2">
                    {' '}
                    {t('pages.patients.viewPatient.sessions.direction')}
                  </label>
                  <Checkbox
                    checked={showTimeDirection}
                    onChange={handleTimeDirectionCheckboxChange}
                  />
                </div>
              </div>
              <div className="">
                <div className="text-center text-700 font-bold mb-3">
                  {t('pages.patients.viewPatient.sessions.time')}
                </div>
                {showTimeDirection && (
                  <GraphTime
                    key={Math.random()}
                    updateResize={props.updateResize}
                    data={props.dataTimeDirection}
                    options={props.optionsTimeDirection}
                  />
                )}
                {showTimeMode && (
                  <GraphTime
                    key={Math.random()}
                    updateResize={props.updateResize}
                    data={props.dataTimeMode}
                    options={props.optionsTimeDirection}
                  />
                )}
              </div>
            </div>
          </div>
          {/* GRAFICA CADENCIA */}
          <div className="col-12 md:col-6 mb-3">
            <div className="surface-100 h-full container-graphs__shadow-customs-graphs md:p-4 p-2 border-round-2xl text-center">
              {/* CHECKBOX */}
              <div className="flex justify-content-center align-items-center gap-3">
                <div className="flex gap-2 mb-3">
                  <label className="font-bold block mb-2">
                    {' '}
                    {t('pages.patients.viewPatient.sessions.mode')}
                  </label>
                  <Checkbox
                    checked={showCadenceMode}
                    onChange={handleCadenceModeCheckboxChange}
                  />
                </div>

                <div className="flex gap-2 mb-3">
                  <label className="font-bold block mb-2">
                    {' '}
                    {t('pages.patients.viewPatient.sessions.direction')}
                  </label>
                  <Checkbox
                    checked={showCadenceDirection}
                    onChange={handleCadenceDirectionCheckboxChange}
                  />
                </div>
              </div>
              <div className="">
                <div className="text-center text-700 font-bold mb-3">
                  {t('pages.patients.viewPatient.sessions.cadence')}
                </div>
                {showCadenceDirection && (
                  <GraphCadence
                    key={Math.random()}
                    updateResize={props.updateResize}
                    data={props.dataCadenceDirection}
                    options={props.optionsCadenceDirection}
                  />
                )}
                {showCadenceMode && (
                  <GraphCadence
                    key={Math.random()}
                    updateResize={props.updateResize}
                    data={props.dataCadenceMode}
                    options={props.optionsCadenceMode}
                  />
                )}
              </div>
            </div>
          </div>
          {/* GRAFICA PUNTUACION */}
          <div className="col-12 md:col-6 mb-3">
            <div className="surface-100 h-full container-graphs__shadow-customs-graphs md:p-4 p-2 border-round-2xl text-center">
              <div className="">
                <div className="text-center text-700 font-bold mb-3">
                  {t('pages.patients.viewPatient.sessions.score')}
                </div>

                <GraphScore
                  key={Math.random()}
                  updateResize={props.updateResize}
                  data={props.dataScore}
                  options={props.optionsScore}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* GRAFICA DISTRIBUCION DE PASOS Y TIEMPO */}
      <div className="col-12 xl:col-4 xxl:col-4">
        <div className="surface-100 h-full container-graphs__shadow-customs-graphs md:p-4 p-2 border-round-2xl text-center">
          {/* CHECKBOXS */}
          <div className="flex justify-content-center align-items-center gap-3">
            <div className="flex gap-2 mb-3">
              <label className="font-bold block mb-2">
                {' '}
                {t('pages.patients.viewPatient.sessions.steps')}
              </label>
              <Checkbox
                checked={showStepsDistributionGraph}
                onChange={handleStepsCheckboxChange}
              />
            </div>

            <div className="flex gap-2 mb-3">
              <label className="font-bold block mb-2">
                {' '}
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
                ? t('pages.patients.viewPatient.sessions.stepsDistribution')
                : showTimeDistributionGraph
                  ? t('pages.patients.viewPatient.sessions.timeDistribution')
                  : ''}
            </div>
            {/* GRAFICA DISTRIBUCION DE PASOS */}
            {showStepsDistributionGraph && (
              <GraphStepsDistribution
                key={Math.random()}
                updateResize={props.updateResize}
                data={props.dataStepsDistribution}
                options={props.optionsStepsDistribution}
              />
            )}
            {/* GRAFICA DISTRIBUCION DE TIEMPO */}
            {showTimeDistributionGraph && (
              <GraphStepsDistribution
                key={Math.random()}
                updateResize={props.updateResize}
                data={props.dataTimeDistribution}
                options={props.optionsTimeDistribution}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContainerForGraphics;
