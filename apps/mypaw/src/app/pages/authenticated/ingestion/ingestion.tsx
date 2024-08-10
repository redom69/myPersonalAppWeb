import { useState, useEffect, useContext, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Context } from '../../../context/provider';
import { useTranslation } from 'react-i18next';
import {
  DevicesApiFactory,
  IngestionApiFactory,
  MyAccountApiFactory,
} from '../../../typescript-axios';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import Graphs from '../maintenance/components/graphs/graphs';
import { InputText } from 'primereact/inputtext';

/* eslint-disable-next-line */
export interface IngestionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelectedProducts: (selectedProducts: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedProducts: any;
}

interface Ingestion {
  id: string;
  data: string;
  created_at: string;
  updated_at: string;
  process: boolean;
  error_msg: string | null;
  ingest_id: number;
  zip_data: string;
}

const apiService = IngestionApiFactory();
const apiServiceDevices = MyAccountApiFactory();
const apiDevice = DevicesApiFactory();

export function Ingestion(props: IngestionProps) {
  const { selectedProducts, setSelectedProducts } = props;
  const { access_token, setRole, setAdmin } = useContext(Context);
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(true);
  const [ingestions, setIngestions] = useState<Ingestion[]>([]);
  const [ingestionId, setIngestionId] = useState<string>('');
  const [showGraphs, setShowGraphs] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [zip_data, setZip_data] = useState<string>('');
  const [deviceNames, setDeviceNames] = useState({});

  const toast = useRef(null);

  useEffect(() => {
    if (!access_token) return;
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    loadIngestions((page + 1).toString(), pageSize.toString(), searchTerm);
    apiServiceDevices.myAccountControllerGetData().then((response) => {
      const data = response.data;

      setRole(data.organization?.role);
      setAdmin(data.can_edit);
    });
  }, [access_token, page, pageSize, searchTerm]);

  useEffect(() => {
    if (!access_token) return;
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    const response = apiDevice.devicesControllerFindAll();
    response.then((response) => {
      const data = response.data;
      const devices = {};
      data.forEach((device) => {
        devices[device.d_id] = device.serial;
      });
      setDeviceNames(devices);
    });
  }, []);

  const button = (row) => {
    return (
      <div className="d-flex justify-content-center">
        <Button
          className="p-button-rounded p-button-secondary p-button-text p-button-lg"
          icon="pi pi-download"
          onClick={() => {
            downloadData(row.zip_data);
          }}
          tooltip={t('pages.ingestions.download')}
          tooltipOptions={{
            position: 'bottom',
            mouseTrack: true,
            mouseTrackTop: 15,
          }}
        />
      </div>
    );
  };

  const buttonGraphs = (row) => {
    return (
      <div className="d-flex justify-content-center">
        <Button
          className="p-button-rounded p-button-secondary p-button-text p-button-lg"
          icon="pi pi-chart-bar"
          onClick={() => {
            setShowGraphs(true);
            setIngestionId(row.id);
            setZip_data(row.zip_data);
          }}
          tooltip={t('pages.ingestions.graphs')}
          tooltipOptions={{
            position: 'bottom',
            mouseTrack: true,
            mouseTrackTop: 15,
          }}
        />
      </div>
    );
  };

  async function loadIngestions(
    page: string,
    pageSize: string,
    search?: string
  ) {
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await apiService.ingestionControllerFindAll(
        page,
        pageSize,
        search
      );
      if (response.data) {
        setIngestions(response.data.data);
        setTotalRecords(response.data.totalRecords);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function downloadData(zip_data: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await apiService.ingestionControllerDownloadFile(
        zip_data,
        { responseType: 'blob' }
      );

      if (response.data) {
        const blob = new Blob([response.data], { type: 'application/zip' });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = zip_data;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        show('success', t('messages.success'), t('messages.success_message'));
      } else {
        throw new Error('No data received');
      }
    } catch (error) {
      console.error(error);
      show('error', t('messages.error'), t('messages.error_message'));
    }
  }

  const show = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  const renderHeader = () => {
    return (
      <div className="p-inputgroup">
        <InputText
          placeholder={t('pages.ingestions.search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          icon="pi pi-search"
          onClick={() => {
            setPage(0); // Reset page to 0 on search
            loadIngestions('1', pageSize.toString(), searchTerm); // Load page 1 on new search
          }}
        />
      </div>
    );
  };

  function formatDevice(d_id: number) {
    return deviceNames[d_id];
  }

  function formatDateString(inputString: string): string {
    // Extraer la parte de fecha y hora del string
    const dateTimePattern = /(\d{8})-(\d{6})\.zip$/;
    const match = inputString.match(dateTimePattern);

    if (!match) {
      throw new Error('El formato de la cadena de entrada es incorrecto');
    }

    const datePart = match[1]; // ddmmyyyy
    const timePart = match[2]; // hhmmss

    // Formatear la fecha y hora a un string en formato ISO 8601
    const formattedDateTime = `${datePart.substring(4, 8)}-${datePart.substring(2, 4)}-${datePart.substring(0, 2)}T${timePart.substring(0, 2)}:${timePart.substring(2, 4)}:${timePart.substring(4, 6)}Z`;

    // Crear un objeto Date
    const date = new Date(formattedDateTime);

    // Obtener partes individuales de la fecha y hora en la zona horaria del navegador
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // La hora 0 debe ser 12

    // Formatear la fecha y hora
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;

    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <>
      <Toast ref={toast} />
      <div className="col-12 xl:pl-7 xl:pr-7">
        {showGraphs ? (
          <Graphs
            ingestionId={ingestionId}
            setShowGraphs={setShowGraphs}
            zip_data={zip_data}
          />
        ) : (
          <div className="col-12 grid mx-0">
            <div className="surface-card border-round-xl shadow-3 py-5 px-3 col-12">
              <DataTable
                value={ingestions}
                paginator
                lazy
                header={renderHeader()}
                first={page * pageSize}
                rows={pageSize}
                emptyMessage={t('emptyValuesTable')}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                selectionMode="checkbox"
                totalRecords={totalRecords}
                selection={selectedProducts}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
                onPage={(e) => {
                  setPage(e.page);
                  setPageSize(e.rows);
                  loadIngestions(
                    (e.page + 1).toString(),
                    e.rows.toString(),
                    searchTerm
                  ); // Ajustamos la página para la API
                }}
                loading={loading}
                dataKey="id"
              >
                <Column
                  selectionMode="multiple"
                  headerStyle={{ width: '3rem' }}
                ></Column>

                <Column
                  field="zip_data"
                  header={t('pages.ingestions.name')}
                  style={{ width: '17rem' }}
                  body={(rowData) => (
                    <div className="pl-3">{rowData.zip_data}</div>
                  )}
                />
                <Column
                  field="d_name"
                  header={t('pages.maintenance.ingestion.d_name')}
                  style={{ width: '10rem' }}
                  body={(rowData) => (
                    <div className="pl-3">{formatDevice(rowData.d_id)}</div>
                  )}
                />
                <Column
                  field="d_name"
                  header={t('pages.maintenance.ingestion.p_name')}
                  style={{ width: '10rem' }}
                  body={(rowData) => (
                    <div className="pl-3">
                      {rowData.p_name ? rowData.p_name : t('noData')}
                    </div>
                  )}
                />
                <Column
                  field="process"
                  header={t('pages.ingestions.process')}
                  style={{ width: '10rem' }}
                  body={(rowData) => (
                    <div className="pl-3">
                      {rowData.process
                        ? t('pages.ingestions.processed')
                        : t('pages.ingestions.notProcessed')}
                    </div>
                  )}
                />
                <Column
                  field="is_session"
                  header={t('pages.ingestions.is_session')}
                  style={{ width: '10rem' }}
                  body={(rowData) => (
                    <div className="pl-3">
                      {rowData.is_session
                        ? t('pages.ingestions.is_session_true')
                        : t('pages.ingestions.is_session_false')}
                    </div>
                  )}
                />
                <Column
                  field="created_at"
                  header={t('pages.ingestions.date')}
                  style={{ width: '10rem' }}
                  body={(rowData) => (
                    <div className="pl-3">
                      {formatDateString(rowData.zip_data)}
                    </div>
                  )}
                />
                <Column
                  header={t('pages.ingestions.graphs')}
                  body={buttonGraphs}
                  style={{ width: '5rem' }}
                />
                <Column
                  header={t('pages.ingestions.download')}
                  body={button}
                  style={{ width: '5rem' }}
                />
              </DataTable>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Ingestion;
