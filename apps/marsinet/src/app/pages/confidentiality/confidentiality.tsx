import { Link } from 'react-router-dom';
import SelectorLanguageComponent from '../../components/selector-language-component/selector-language-component';
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
            {/* DATOS IDENTIFICATIVOS */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.privacyPoliceTexts.whoDataControllerTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              <div className="surface-300 p-3 border-round-xl">
                <strong>
                  {t('pages.register.privacyPoliceTexts.companyName')}
                </strong>{' '}
                MARSI BIONICS, S.L.
                <br />
                <br />
                <strong>
                  {t('pages.register.privacyPoliceTexts.cif')}
                </strong>{' '}
                B86756483
                <br />
                <br />
                <strong>
                  {t('pages.register.privacyPoliceTexts.address')}
                </strong>{' '}
                Calle Marie Curie, 13, Planta 6, Edif. Bioma, Oficinas 1-2,
                28521 Rivas-Vaciamadrid, Madrid
                <br />
                <br />
                <strong>
                  {t('pages.register.privacyPoliceTexts.phone')}
                </strong>{' '}
                914900090
                <br />
                <br />
                <strong>
                  {t('pages.register.privacyPoliceTexts.email')}
                </strong>{' '}
                info@marsibionics.com
                <br />
                <br />
                <strong>
                  {t('pages.register.privacyPoliceTexts.responsability')}
                </strong>{' '}
                MARSI BIONICS, S.L.
              </div>
            </p>
            {/* PROCESAMIENTO DE DATOS */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.privacyPoliceTexts.dataProcessingTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.privacyPoliceTexts.dataProcessingText')}
            </p>
            {/* QUE DATOS TRATAMOS */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.privacyPoliceTexts.whatDataProcessTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.privacyPoliceTexts.whatDataProcessText1')}
              <br />
              <br />
              {t('pages.register.privacyPoliceTexts.whatDataProcessText2')}
              <br />
              <br />
              {t('pages.register.privacyPoliceTexts.whatDataProcessText3')}
              <br />
              <br />
              {t('pages.register.privacyPoliceTexts.whatDataProcessText4')}
              <br />
              <br />
              {t('pages.register.privacyPoliceTexts.whatDataProcessText5')}
              <br />
              <br />
              {t('pages.register.privacyPoliceTexts.whatDataProcessText6')}
              <br />
              <br />
              {t('pages.register.privacyPoliceTexts.whatDataProcessText7')}
            </p>
            {/* LEGITIMACION DATOS */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.privacyPoliceTexts.whatLegitimateBasisTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.privacyPoliceTexts.whatLegitimateBasisText1')}
              <br />
              <br />•{' '}
              {t('pages.register.privacyPoliceTexts.whatLegitimateBasisText2')}
              <br />
              <br />•{' '}
              {t('pages.register.privacyPoliceTexts.whatLegitimateBasisText3')}
              <br />
              <br />•{' '}
              {t('pages.register.privacyPoliceTexts.whatLegitimateBasisText4')}
            </p>
            {/* FINALIDAD DATOS */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t(
                'pages.register.privacyPoliceTexts.whatPurposesDoWeProcessTitle'
              )}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t(
                'pages.register.privacyPoliceTexts.whatPurposesDoWeProcessText1'
              )}
              <br />
              <br />
              {t(
                'pages.register.privacyPoliceTexts.whatPurposesDoWeProcessText2'
              )}
              <br />
              <br />
              {t(
                'pages.register.privacyPoliceTexts.whatPurposesDoWeProcessText3'
              )}
            </p>
            {/* DURACION */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.privacyPoliceTexts.howLongWillWeProcessTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.privacyPoliceTexts.howLongWillWeProcessText1')}
              <br />
              <br />
              {t('pages.register.privacyPoliceTexts.howLongWillWeProcessText2')}
              <br />
              <br />
              {t(
                'pages.register.privacyPoliceTexts.howLongWillWeProcessText3'
              )}{' '}
              <a href="mailto:soporte.marsinet@marsibionics.com">
                soporte.marsinet@marsibionics.com
              </a>{' '}
              {t('pages.register.privacyPoliceTexts.howLongWillWeProcessText4')}
            </p>
            {/* DESTINATARIOS */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t(
                'pages.register.privacyPoliceTexts.whichRecipientsDataCommunicatedTitle'
              )}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t(
                'pages.register.privacyPoliceTexts.whichRecipientsDataCommunicatedText1'
              )}
              <br />
              <br />
              {t(
                'pages.register.privacyPoliceTexts.whichRecipientsDataCommunicatedText2'
              )}
              <br />
              <br />
              {t(
                'pages.register.privacyPoliceTexts.whichRecipientsDataCommunicatedText3'
              )}
              <br />
              <br />
              {t(
                'pages.register.privacyPoliceTexts.whichRecipientsDataCommunicatedText4'
              )}
            </p>
            {/* DERECHOS */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.privacyPoliceTexts.whatYoursRightsTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.privacyPoliceTexts.whatYoursRightsText1')}
              <br />
              <br />•{' '}
              {t('pages.register.privacyPoliceTexts.whatYoursRightsText2')}
              <br />
              <br />•{' '}
              {t('pages.register.privacyPoliceTexts.whatYoursRightsText3')}
              <br />
              <br />•{' '}
              {t('pages.register.privacyPoliceTexts.whatYoursRightsText4')}
              <br />
              <br />•{' '}
              {t('pages.register.privacyPoliceTexts.whatYoursRightsText5')}
              <br />
              <br />•{' '}
              {t('pages.register.privacyPoliceTexts.whatYoursRightsText6')}
              <br />
              <br />•{' '}
              {t('pages.register.privacyPoliceTexts.whatYoursRightsText7')}
              <br />
              <br />
              {t('pages.register.privacyPoliceTexts.whatYoursRightsText8')}
              <br />
              <br />
              {t('pages.register.privacyPoliceTexts.whatYoursRightsText9')}
              <br />
              <br />
              {t('pages.register.privacyPoliceTexts.whatYoursRightsText10')}
              <br />
              <br />
              {t('pages.register.privacyPoliceTexts.whatYoursRightsText11')}
              <br />
              <br />
              {t(
                'pages.register.privacyPoliceTexts.whatYoursRightsText12'
              )}{' '}
              <Link target="_blank" to="https://www.aepd.es/es">
                {' '}
                www.agpd.es.
              </Link>
            </p>
            {/* NOTIFICACION Y DECLARACIOn */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t(
                'pages.register.privacyPoliceTexts.securityBreachNotificationTitle'
              )}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t(
                'pages.register.privacyPoliceTexts.securityBreachNotificationText'
              )}
            </p>
            {/* SECRETO Y SEGURIDAD */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.privacyPoliceTexts.dataConfidentialityTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.privacyPoliceTexts.dataConfidentialityText1')}
              <br />
              <br />
              {t('pages.register.privacyPoliceTexts.dataConfidentialityText2')}
            </p>
            {/* EXACTITUD Y VERACIDAD */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.privacyPoliceTexts.accuracyVeracityTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.privacyPoliceTexts.accuracyVeracityText')}
            </p>
            {/* TERCERO */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t(
                'pages.register.privacyPoliceTexts.personalDataThirdPartiesTitle'
              )}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t(
                'pages.register.privacyPoliceTexts.personalDataThirdPartiesText1'
              )}
              <br />
              <br />
              {t(
                'pages.register.privacyPoliceTexts.personalDataThirdPartiesText2'
              )}
            </p>
            {/* CAMBIOS POLITICA */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.privacyPoliceTexts.changesPrivacyPoliceTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.privacyPoliceTexts.changesPrivacyPoliceText')}
            </p>
            {/* INFORMACION */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t(
                'pages.register.privacyPoliceTexts.additionalInformationTitle'
              )}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t(
                'pages.register.privacyPoliceTexts.additionalInformationText1'
              )}
              <a href="mailto:soporte.marsinet@marsibionics.com">
                soporte.marsinet@marsibionics.com
              </a>
              {t(
                'pages.register.privacyPoliceTexts.additionalInformationText2'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confidentiality;
