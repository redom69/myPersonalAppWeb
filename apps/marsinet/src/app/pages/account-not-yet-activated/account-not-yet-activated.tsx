import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ProgressBar } from 'primereact/progressbar';

/* eslint-disable-next-line */
export interface AccountNotYetActivatedProps {
  is_active: boolean;
}

export function AccountNotYetActivated(props: AccountNotYetActivatedProps) {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  setTimeout(() => setIsLoading(false), 600);

  return (
    <div className="col-12">
      {isLoading && !props.is_active ? (
        <div>
          <ProgressBar
            mode="indeterminate"
            style={{ height: '6px' }}
          ></ProgressBar>
        </div>
      ) : (
        <div className="px-4 py-8">
          <div className="border-round-2xl text-center surface-ground">
            <span className="surface-ground text-red-500 font-bold text-3xl inline-block px-3">
              <img
                src="/assets/marsi-azul-degradado-fondo-blanco.png"
                alt="logo marsinet"
                style={{ width: '193px' }}
              />
            </span>
          </div>
          <div className="mt-6 mb-5 font-bold text-6xl text-300 text-center">
            {t('accountNotYetActivated')}
          </div>
          <p className="text-100 text-2xl mt-0 mb-6 text-center">
            {t('checkEmail')}
          </p>
          <div className="border-round-2xl text-center surface-ground">
            <span className="surface-ground text-red-500 font-bold text-3xl inline-block px-3"></span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountNotYetActivated;
