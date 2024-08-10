import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollPanel } from 'primereact/scrollpanel';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';

import { Alarm } from 'apps/mypaw/src/app/typescript-axios';

import './event-list.module.scss';

export interface EventListProps {
  alarms: Alarm[];
  setUpdateAlarms: (update: boolean) => void;
  loading: boolean;
}

export function EventList(props: Readonly<EventListProps>) {
  const { t } = useTranslation();
  const toast = useRef(null);
  const { alarms, setUpdateAlarms, loading } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [prevIsModalVisible, setPrevIsModalVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedAlarm, setSelectedAlarm] = useState<any>(null);

  useEffect(() => {
    if (prevIsModalVisible && !isModalVisible) {
      setUpdateAlarms(true);
    }
    setPrevIsModalVisible(isModalVisible);
  }, [isModalVisible, prevIsModalVisible, setUpdateAlarms]);

  const obtenerFechaYHoraDeTimestamp = (timestamp: string) => {
    const fechaHora = new Date(timestamp);
    const año = fechaHora.getFullYear();
    const mes = fechaHora.getMonth() + 1;
    const día = fechaHora.getDate();
    const hora = fechaHora.getHours();
    const minutos = fechaHora.getMinutes();
    const segundos = fechaHora.getSeconds();

    const fechaFormateada = `${año}-${mes < 10 ? '0' : ''}${mes}-${día < 10 ? '0' : ''}${día}`;
    const horaFormateada = `${hora < 10 ? '0' : ''}${hora}:${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

    return { fecha: fechaFormateada, hora: horaFormateada };
  };

  const colorSelector = (status: string) => {
    switch (status) {
      case 'inactive':
        return '-grey-300';
      case 'active':
        return '-green-300';
      default:
        return '-black-300';
    }
  };

  const getPaddingClass = (item) => {
    if (item.status === 'active') {
      if (item.event_type === 'Alarm') {
        return 'pl-5';
      } else if (item.event_type === 'Warning') {
        return 'pl-2';
      } else {
        return '';
      }
    } else {
      return 'pl-0';
    }
  };

  const itemsTemplate = (item: Alarm, index: number) => {
    const fechaHora = obtenerFechaYHoraDeTimestamp(item.timestamp);
    const circleColor = item.value === 1 ? '#6C1AFF' : 'gray';
    const statusColor = item.value === 1 ? '#6C1AFF' : 'gray';
    const eyeIconColor = '#6C1AFF';
    const paddingClass = getPaddingClass(item);

    return (
      <div
        className="flex items-center border p-3 mb-2 bg-white rounded shadow-md"
        key={index}
      >
        <div className="flex items-center text-lg mr-4">
          <span
            data-tip={item.value === 1 ? 'Activo' : 'Inactivo'}
            data-for={`tooltip-${index}`}
          >
            <i
              className={`pi ${item.value === 1 ? 'pi-circle-fill' : 'pi-circle'} text-lg`}
              style={{ color: circleColor }}
            />
          </span>
          <span
            className={`ml-2 text-lg ${item.value === 1 ? 'font-bold' : ''}`}
            style={{ color: statusColor }}
          >
            {item.value === 1 ? 'Activo' : 'Inactivo'}
          </span>
        </div>
        <div className={`text-lg ml-4 ${paddingClass}`}>
          <span className="font-semibold">{fechaHora.hora}</span> -{' '}
          <span>{fechaHora.fecha}</span>
        </div>
        <div className="text-lg ml-4">
          <span className="font-semibold">{item.event_type}</span> -{' '}
          {item.event_id}
        </div>
        <div
          className={`text-lg ml-4 ${paddingClass}`}
          style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
        >
          {t(`pages.alarms.alarms.${item.event_id}`)}
        </div>
        <div className="ml-auto">
          <Button
            className="p-button-rounded p-button-secondary p-button-text p-button-lg"
            onClick={() => showEventModal(item)}
            aria-label="Ver"
            tabIndex={0}
            style={{
              cursor: 'pointer',
              color: eyeIconColor,
              border: 'none',
              background: 'none',
            }}
            data-tip="Ver detalles"
            data-for={`tooltip-${index}`}
          >
            <i className="pi pi-eye" />
          </Button>
        </div>
      </div>
    );
  };

  const filteredAlarms = alarms.filter(
    (event) =>
      event.event_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.event_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.version.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showEventModal = (event: Alarm) => {
    setSelectedAlarm(event);
    setIsModalVisible(!isModalVisible);
  };

  const hideEventModal = () => {
    setSelectedAlarm(null);
    setIsModalVisible(!isModalVisible);
  };

  const modalContent = (
    <div>
      {selectedAlarm && (
        <div className="p-4">
          <p className="mb-2">
            <span className="font-semibold">{t('pages.alarms.date')}:</span>{' '}
            {obtenerFechaYHoraDeTimestamp(selectedAlarm.timestamp).fecha}
          </p>
          <p className="mb-2">
            <span className="font-semibold">
              {t('pages.alarms.eventType')}:
            </span>{' '}
            {selectedAlarm.event_type}
          </p>
          <p className="mb-2">
            <span className="font-semibold">{t('pages.alarms.eventId')}:</span>{' '}
            {selectedAlarm.event_id}
          </p>
          <p className="mb-2">
            <span className="font-semibold">{t('pages.alarms.value')}:</span>{' '}
            {selectedAlarm.value}
          </p>
          <p className="mb-2">
            <span className="font-semibold">{t('pages.alarms.version')}:</span>{' '}
            {selectedAlarm.version}
          </p>
          <p className="mb-2">
            <span className="font-semibold">{t('pages.alarms.message')}:</span>{' '}
            {t(`pages.alarms.alarms.${selectedAlarm.event_id}`)}
          </p>
          <p className="mb-2">
            <span className="font-semibold">{t('pages.alarms.status')}:</span>{' '}
            <div className={`text${colorSelector(selectedAlarm.status)}`}>
              {selectedAlarm.status}
            </div>
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <div className="mt-3 py-4 border-2 surface-border border-round-2xl border-dashed surface-card">
        <div className="mb-3">
          <div className="flex justify-start px-2">
            <span className="p-input-icon-left w-full">
              <i className="pi pi-search" />
              <InputText
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('pages.patients.table.filter')}
                className="w-full border-1"
              />
            </span>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-content-center align-items-center h-full">
            <ProgressSpinner />
          </div>
        ) : (
          <ScrollPanel
            style={{ width: '100%', height: '319px' }}
            className="custombar1 px-1"
          >
            {filteredAlarms.length > 0 ? (
              filteredAlarms.map((event, i) => itemsTemplate(event, i))
            ) : (
              <div className="text-center ">{t('pages.alarms.noAlarms')}</div>
            )}
          </ScrollPanel>
        )}
        <Dialog
          visible={isModalVisible}
          onHide={hideEventModal}
          header={t('pages.alarms.details')}
        >
          {modalContent}
        </Dialog>
      </div>
    </>
  );
}

export default EventList;
