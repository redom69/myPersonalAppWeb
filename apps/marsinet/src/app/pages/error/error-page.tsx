import { useState } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProgressBar } from 'primereact/progressbar';

/* eslint-disable-next-line */
export interface ErrorPageProps {}

export function ErrorPage(props: ErrorPageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  setTimeout(() => setIsLoading(false), 500);
  return (
    <div className="col-12">
      {isLoading ? (
        <div>
          <ProgressBar
            mode="indeterminate"
            style={{ height: '6px' }}
          ></ProgressBar>
        </div>
      ) : (
        <div className="px-4 py-8">
          <div className="border-round-2xl text-center surface-ground">
            <span className="surface-ground text-red-500 font-bold text-3xl inline-block px-3 text-center">
              <img
                src="/assets/marsi-azul-degradado-fondo-blanco.png"
                alt="logo marsinet"
                style={{ width: '193px' }}
                className="text-center"
              />
              <div className="">404</div>
            </span>
          </div>
          <div className="mt-6 mb-5 font-bold text-6xl text-300 text-center">
            {t('pageNotFound')}
          </div>
          <p className="text-100 text-3xl mt-0 mb-6 text-center">
            {t('pageNotFoundDescription')}
          </p>
          <div className="text-center mb-4">
            <Button
              onClick={goBack}
              className="p-button-primary mr-2"
              label={t('goBack')}
              icon="pi pi-arrow-left"
            />
            <Button
              className="p-button-secondary"
              onClick={() => navigate('/')}
              label={t('goHome')}
              icon="pi pi-home"
            />
          </div>
          <div className="border-round-2xl text-center surface-ground">
            <span className="surface-ground text-red-500 font-bold text-3xl inline-block px-3"></span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ErrorPage;
