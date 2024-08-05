import { Link } from 'react-router-dom';
import SelectorLanguageComponent from '../../components/selector-language-component/selector-language-component';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface CookiePolicyProps {}

export function CookiePolicy(props: CookiePolicyProps) {
  const { t } = useTranslation();
  return (
    <div
      className="min-h-screen pb-6"
      style={{
        background: 'linear-gradient(60deg, #13dfb6 0%,#004e78 100%)',
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
              src="/assets/marsi-azul-degradado-fondo-blanco.png"
              alt="logo marsinet"
            />
          </div>
          <div className="col-12 px-3">
            {/* INFORMACION DE COOKIES */}
            <h1 className="text-4xl font-bold text-primary-500 text-left">
              {t('pages.register.cookiePolicyTexts.cookiePolicyTitle')}
            </h1>
            <h2 className="text-xl font-bold text-900 text-left">
              {t(
                'pages.register.cookiePolicyTexts.informationAboutCookiesTitle'
              )}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t(
                'pages.register.cookiePolicyTexts.informationAboutCookiesText'
              )}
            </p>
            {/* QUE SON */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.cookiePolicyTexts.whatAreCookiesTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.cookiePolicyTexts.whatAreCookiesText1')}
              <br />
              <br />
              {t('pages.register.cookiePolicyTexts.whatAreCookiesText2')}
            </p>
            {/* AFECTADAS */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t(
                'pages.register.cookiePolicyTexts.cookiesAffectedByTheRegulationTitle'
              )}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t(
                'pages.register.cookiePolicyTexts.cookiesAffectedByTheRegulationText'
              )}
            </p>
            {/* TIPOS */}
            <h2 className="text-2xl font-bold text-900 text-left">
              {t('pages.register.cookiePolicyTexts.typeOfCookiesTitle')}
            </h2>
            <h2 className="text-xl pl-3 font-bold text-900 text-left">
              {t('pages.register.cookiePolicyTexts.dependingOnThePurposeTitle')}
            </h2>
            <p className="pl-3 text-justify text-700 mb-5">
              •{' '}
              {t('pages.register.cookiePolicyTexts.dependingOnThePurposeText1')}
              <br />
              <br />•{' '}
              {t('pages.register.cookiePolicyTexts.dependingOnThePurposeText2')}
              <br />
              <br />•{' '}
              {t('pages.register.cookiePolicyTexts.dependingOnThePurposeText3')}
              <br />
              <br />•{' '}
              {t('pages.register.cookiePolicyTexts.dependingOnThePurposeText4')}
              <br />
              <br />•{' '}
              {t('pages.register.cookiePolicyTexts.dependingOnThePurposeText5')}
              <br />
              <br />•{' '}
              {t('pages.register.cookiePolicyTexts.dependingOnThePurposeText6')}
              <br />
              <br />•{' '}
              {t('pages.register.cookiePolicyTexts.dependingOnThePurposeText7')}
            </p>
            <h2 className="text-xl pl-3 font-bold text-900 text-left">
              {t('pages.register.cookiePolicyTexts.accordingToOwnershipTitle')}
            </h2>
            <p className="pl-3 text-justify text-700 mb-5">
              •{' '}
              {t('pages.register.cookiePolicyTexts.accordingToOwnershipText1')}
              <br />
              <br />•{' '}
              {t('pages.register.cookiePolicyTexts.accordingToOwnershipText2')}
            </p>
            <h2 className="text-xl pl-3 font-bold text-900 text-left">
              {t(
                'pages.register.cookiePolicyTexts.accordingToTheConservationPeriodTitle'
              )}
            </h2>
            <p className="pl-3 text-justify text-700 mb-5">
              •{' '}
              {t(
                'pages.register.cookiePolicyTexts.accordingToTheConservationPeriodText1'
              )}
              <br />
              <br />•{' '}
              {t(
                'pages.register.cookiePolicyTexts.accordingToTheConservationPeriodText2'
              )}
            </p>
            {/* ACEPTACION */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t(
                'pages.register.cookiePolicyTexts.acceptanceRejectionOrDeletionTitle'
              )}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t(
                'pages.register.cookiePolicyTexts.acceptanceRejectionOrDeletionText1'
              )}
              <br />
              <br />
              {t(
                'pages.register.cookiePolicyTexts.acceptanceRejectionOrDeletionText2'
              )}
              <br />
              <br />
              {t(
                'pages.register.cookiePolicyTexts.acceptanceRejectionOrDeletionText3'
              )}
              <br />
              <br />
              {t(
                'pages.register.cookiePolicyTexts.acceptanceRejectionOrDeletionText4'
              )}
            </p>
            {/* MODIFICAR */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t(
                'pages.register.cookiePolicyTexts.changingTheCookieSettingsTitle'
              )}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t(
                'pages.register.cookiePolicyTexts.changingTheCookieSettingsText1'
              )}
              <br />
              <br />
              - Internet Explorer:
              windows.microsoft.com/es-xl/internet-explorer/delete-manage-cookies#ie="ie-
              10"
              <br />
              <br />
              - Microsoft Edge:
              support.microsoft.com/es-es/help/4468242/microsoft-edge-browsing-data-and-
              privacy-microsoft-privacy
              <br />
              <br />
              - FireFox: support.mozilla.org/es/kb/Borrar%20cookies
              <br />
              <br />
              - Chrome: support.google.com/chrome/answer/95647?hl="es"
              <br />
              <br />
              - Safari: www.apple.com/es/privacy/use-of-cookies/
              <br />
              <br />
              {t(
                'pages.register.cookiePolicyTexts.changingTheCookieSettingsText2'
              )}
              <br />
              <br />
              - Ghostery: www.ghostery.com/
              <br />
              <br />- Your online choices: www.youronlinechoices.com/es/
            </p>
            {/* TRATAMIENTOS */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t(
                'pages.register.cookiePolicyTexts.processingOfPersonalDataTitle'
              )}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t(
                'pages.register.cookiePolicyTexts.processingOfPersonalDataText1'
              )}
              <br />
              <br />
              {t(
                'pages.register.cookiePolicyTexts.processingOfPersonalDataText2'
              )}
              <br />
              <br />
              {t(
                'pages.register.cookiePolicyTexts.processingOfPersonalDataText3'
              )}
              <br />
              <br />
              {t(
                'pages.register.cookiePolicyTexts.processingOfPersonalDataText4'
              )}
              <br />
              <br />
              {t(
                'pages.register.cookiePolicyTexts.processingOfPersonalDataText5'
              )}
            </p>
            {/* DERECHOS */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.cookiePolicyTexts.rightsInterestedPartyTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              -{' '}
              {t('pages.register.cookiePolicyTexts.rightsInterestedPartyText1')}
              <br />
              <br />-{' '}
              {t('pages.register.cookiePolicyTexts.rightsInterestedPartyText2')}
              <br />
              <br />-{' '}
              {t(
                'pages.register.cookiePolicyTexts.rightsInterestedPartyText3'
              )}{' '}
              <Link target="_blank" to="https://www.aepd.es/es">
                {' '}
                www.agpd.es.
              </Link>{' '}
              {t('pages.register.cookiePolicyTexts.rightsInterestedPartyText4')}
              <br />
              <br />
              <strong>
                {t(
                  'pages.register.cookiePolicyTexts.rightsInterestedPartyText5'
                )}
              </strong>
              <br />
              <br />
              MARSI BIONICS S.L Calle Marie Curie, 13, Planta 6, Edif. Bioma,
              Oficinas 1-2, 28521 Rivas-Vaciamadrid, Madrid.{' '}
              <a href="mailto:soporte.marsinet@marsibionics.com">
                soporte.marsinet@marsibionics.com
              </a>{' '}
            </p>
            {/* COOKIES */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.cookiePolicyTexts.whatCookiesDoWeUseTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.cookiePolicyTexts.whatCookiesDoWeUseText1')}
              <div className="pl-2">
                <h3 className="text-md font-bold text-900 text-left">
                  Cookies
                </h3>
                <p className="text-justify text-700 mb-5">
                  Google Analytics:
                  <br />
                  <br />
                  _ga
                  <br />
                  _gat
                  <br />
                  _gid
                  <br />
                  {t(
                    'pages.register.cookiePolicyTexts.whatCookiesDoWeUseText2'
                  )}
                </p>
                <h3 className="text-md font-bold text-900 text-left">
                  {t(
                    'pages.register.cookiePolicyTexts.whatCookiesDoWeUseText3'
                  )}
                </h3>
                <p className="text-justify text-700 mb-5">
                  {t(
                    'pages.register.cookiePolicyTexts.whatCookiesDoWeUseText4'
                  )}
                </p>
                <h3 className="text-md font-bold text-900 text-left">
                  {t(
                    'pages.register.cookiePolicyTexts.whatCookiesDoWeUseText5'
                  )}
                </h3>
                <p className="text-justify text-700 mb-5">
                  {t(
                    'pages.register.cookiePolicyTexts.whatCookiesDoWeUseText6'
                  )}
                </p>
                <h3 className="text-md font-bold text-900 text-left">
                  {t(
                    'pages.register.cookiePolicyTexts.whatCookiesDoWeUseText7'
                  )}
                </h3>
                <p className="text-justify text-700 mb-5">
                  {t(
                    'pages.register.cookiePolicyTexts.whatCookiesDoWeUseText8'
                  )}
                </p>
                <h3 className="text-md font-bold text-900 text-left">
                  {t(
                    'pages.register.cookiePolicyTexts.whatCookiesDoWeUseText9'
                  )}
                </h3>
                <p className="text-justify text-700 mb-5">
                  {t(
                    'pages.register.cookiePolicyTexts.whatCookiesDoWeUseText10'
                  )}
                  <br />
                  <br />-{' '}
                  {t(
                    'pages.register.cookiePolicyTexts.whatCookiesDoWeUseText11'
                  )}
                  https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es
                  <br />
                  <br />-{' '}
                  {t(
                    'pages.register.cookiePolicyTexts.whatCookiesDoWeUseText12'
                  )}
                  https://www.google.com/policies/privacy/
                  <br />
                  <br />-{' '}
                  {t(
                    'pages.register.cookiePolicyTexts.whatCookiesDoWeUseText13'
                  )}
                  http://www.google.com/policies/technologies/types/
                </p>
                <h3 className="text-md font-bold text-900 text-left">
                  {t(
                    'pages.register.cookiePolicyTexts.whatCookiesDoWeUseText14'
                  )}
                </h3>
                <p className="text-justify text-700 mb-5">
                  {t(
                    'pages.register.cookiePolicyTexts.whatCookiesDoWeUseText15'
                  )}
                  <br />
                  <br />
                  - Facebook: https://www.facebook.com/privacy/explanation
                  <br />
                  <br />
                  - Instagram: https://help.instagram.com/519522125107875
                  <br />
                  <br />- Linkedin: https://es.linkedin.com/legal/privacy-policy
                  <br />
                  <br />- Twitter: https://twitter.com/privacy
                  <br />
                  <br />- YouTube:
                  https://www.google.es/intl/es/policies/technologies/cookies/
                </p>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookiePolicy;
