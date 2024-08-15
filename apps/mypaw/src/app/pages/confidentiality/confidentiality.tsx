import { Link } from 'react-router-dom';
import SelectorLanguageComponent from '../../components/slc/slc';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface ConfidentialityProps {}

export function Confidentiality(props: ConfidentialityProps) {
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen pb-6"
      style={{
        background: 'linear-gradient(60deg, #6C1AFF 0%,#C822FF 100%)',
      }}
    >
      <div className="absolute right-0 top-0">
        <div className="flex p-3 justify-content-end">
          <SelectorLanguageComponent />
        </div>
      </div>
      <div className="flex justify-content-center pt-8">
        <div className="px-2 mx-2 xl:w-10 lg:px-4 surface-100 shadow-2 text-center border-round-3xl relative">
          <div className="col-12 text-center p-0">
            <img
              className="w-18rem lg:w-15rem"
              src="/assets/icons8-laravel-96.png"
              alt="logo"
            />
          </div>
          <div className="col-12 px-3">
            {/* POLITICA DE PRIVACIDAD */}
            <h1 className="text-4xl font-bold text-primary-500 text-left">
              {t('pages.register.privacyPoliceTexts.pivacyPoliceTitle')}
            </h1>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.privacyPoliceTexts.pivacyPoliceText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confidentiality;
