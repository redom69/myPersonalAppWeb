import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { TabPanel, TabView } from 'primereact/tabview';
import Alarms from './components/alarms/alarms';
import Tests from './components/tests/tests';
import { Ingestion } from '../ingestion/ingestion';
import { Button } from 'primereact/button';
import { IngestionApiFactory } from '../../../typescript-axios';

const apiService = IngestionApiFactory();

/* eslint-disable-next-line */
export interface MaintenanceProps {}

export function Maintenance(props: MaintenanceProps) {
  const { t } = useTranslation();
  const toast = useRef(null);

  const [updateResize, setUpdateResize] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedProducts, setSelectedProducts] = useState(null);

  useEffect(() => {
    window.addEventListener('resize', updateResizeGraph);
    return () => window.removeEventListener('resize', updateResizeGraph);
  });

  const updateResizeGraph = () => {
    setUpdateResize(!updateResize);
  };

  async function downloadSelectedData() {
    try {
      show('info', t('messages.info'), t('messages.downloading'));
      const files = selectedProducts.map((product) => product.zip_data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any =
        await apiService.ingestionControllerDownloadGroupFiles(files, {
          responseType: 'blob',
        });

      if (response.data) {
        const blob = new Blob([response.data], { type: 'application/zip' });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'download.zip';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        show('success', t('messages.success'), t('messages.success_message'));
      } else {
        throw new Error('No data received');
      }
    } catch (error) {
      show('error', t('messages.error'), t('messages.error_message'));
    }
  }

  const changeTabView = (index: number) => {
    setActiveIndex(index);
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
    <div className="col-12 xl:pl-7 xl:pr-7 ">
      <div className="col-12 ">
        <div className="surface-card p-3 shadow-3 border-round-xl flex justify-content-between align-items-center mb-5">
          <div className="font-medium text-2xl text-900 p-2">
            {t('pages.maintenance.title')}
          </div>
          {selectedProducts && selectedProducts.length > 0 ? (
            <Button
              icon="pi pi-download"
              label={t('pages.ingestions.downloadFiles')}
              onClick={() => downloadSelectedData()}
              severity="secondary"
              aria-label="Añadir"
            />
          ) : null}
        </div>
      </div>
      <Toast ref={toast} />
      <div className="col-12 grid mx-0">
        <div className="surface-card border-round-xl shadow-3	py-5 px-3 col-12">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => changeTabView(e.index)}
            className="px-0"
          >
            <TabPanel header={t('pages.maintenance.ingestion.title')}>
              <Ingestion
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
              />
            </TabPanel>
            <TabPanel header={t('pages.maintenance.alarms.title')}>
              <Alarms />
            </TabPanel>
            <TabPanel header={t('pages.maintenance.test.title')}>
              <Tests />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
