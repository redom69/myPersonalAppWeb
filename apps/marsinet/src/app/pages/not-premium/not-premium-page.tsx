import { useState } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProgressBar } from 'primereact/progressbar';

/* eslint-disable-next-line */
export interface NotPremiumPageProps {}

export function NotPremiumPage(props: NotPremiumPageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  const navigate = useNavigate();

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
                src="/assets/icons8-laravel-96.png"
                alt="logo"
                style={{ width: '193px' }}
                className="text-center"
              />
              <div className="">Aún no eres premium</div>
            </span>
          </div>
          <div className="mt-6 mb-5 font-bold text-6xl text-300 text-center">
            {t('doPremium')}
          </div>
          <p className="text-100 text-3xl mt-0 mb-6 text-center">
            {t('doPremiumDescription')}
          </p>
          <div className="text-center mb-4">
            <Button
              className="p-button-secondary"
              onClick={() => navigate('/')}
              label={t('goHome')}
              icon="pi pi-home"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default NotPremiumPage;
