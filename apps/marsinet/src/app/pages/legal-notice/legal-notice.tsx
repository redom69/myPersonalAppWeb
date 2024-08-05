import { Link } from 'react-router-dom';
import SelectorLanguageComponent from '../../components/selector-language-component/selector-language-component';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface LegalNoticeProps {}

export function LegalNotice(props: LegalNoticeProps) {
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
            {/* AVISO LEGAL */}
            <h1 className="text-4xl font-bold text-primary-500 text-left">
              <span className="text-900">
                {t('pages.register.legalNoticeTexts.legalNoticeTitle')}
              </span>
            </h1>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.legalNoticeTexts.textLegalNotice')}
            </p>
            {/* DATOS IDENTIFICATIVOS */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.legalNoticeTexts.identificationData')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.legalNoticeTexts.textIdentificationData')}
              <br />
              <br />
              <div className="surface-300 p-3 border-round-xl">
                {t('pages.register.legalNoticeTexts.text2IdentificationData')}
                <br />
                <br />
                <strong>
                  {t('pages.register.legalNoticeTexts.companyName')}
                </strong>{' '}
                MARSI BIONICS S.L
                <br />
                <br />
                <strong>{t('pages.register.legalNoticeTexts.cif')}</strong>{' '}
                B86756483
                <br />
                <br />
                <strong>
                  {t('pages.register.legalNoticeTexts.address')}
                </strong>{' '}
                Calle Marie Curie, 13, Planta 6, Edif. Bioma, Oficinas 1-2,
                28521 Rivas-Vaciamadrid, Madrid
                <br />
                <br />
                <strong>
                  {t('pages.register.legalNoticeTexts.phone')}
                </strong>{' '}
                914900090
                <br />
                <br />
                <strong>
                  {t('pages.register.legalNoticeTexts.email')}
                </strong>{' '}
                info@marsibionics.com
                <br />
                <br />
                <strong>
                  {t('pages.register.legalNoticeTexts.domainName')}
                </strong>{' '}
                www.marsibionics.com
                <br />
                <br />
                <strong>
                  {t('pages.register.legalNoticeTexts.registry')}
                </strong>{' '}
                Mercantil de Madrid
                <br />
                <br />
                <strong>
                  {t('pages.register.legalNoticeTexts.tome')}
                </strong>{' '}
                31512
                <br />
                <br />
                <strong>{t('pages.register.legalNoticeTexts.book')}</strong> 0
                <br />
                <br />
                <strong>{t('pages.register.legalNoticeTexts.page')}</strong> 105
                <br />
                <br />
                <strong>
                  {t('pages.register.legalNoticeTexts.section')}
                </strong>{' '}
                8
                <br />
                <br />
                <strong>{t('pages.register.legalNoticeTexts.sheet')}</strong> M
                567159
                <br />
                <br />
                <strong>{t('pages.register.legalNoticeTexts.date')}</strong> 04
                de octubre de 2013
              </div>
            </p>
            {/* USUARIOS */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.legalNoticeTexts.usersTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.legalNoticeTexts.usersText')}
            </p>
            {/* USO DEL PORTAL */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.legalNoticeTexts.usePortalTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.legalNoticeTexts.usePortalText')}
            </p>
            {/* PROPIEDAD INTELECTUAL E INDUSTRIAL */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.legalNoticeTexts.intellectualPropertyTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.legalNoticeTexts.intellectualPropertyText1')}
              <br />
              <br />
              {t('pages.register.legalNoticeTexts.intellectualPropertyText2')}
              <br />
              <br />
              {t('pages.register.legalNoticeTexts.intellectualPropertyText3')}
            </p>
            {/* EXCLUSION DE GARANTIAS Y RESPONSABILIDAD */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.legalNoticeTexts.exclusionWarrantiesTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.legalNoticeTexts.exclusionWarrantiesText1')}
              <br />
              <br />
              {t('pages.register.legalNoticeTexts.exclusionWarrantiesText2')}
              <br />
              <br />
              {t('pages.register.legalNoticeTexts.exclusionWarrantiesText3')}
              <br />
              <br />
              {t('pages.register.legalNoticeTexts.exclusionWarrantiesText4')}
              <br />
              <br />
              {t(
                'pages.register.legalNoticeTexts.exclusionWarrantiesText5'
              )}{' '}
              <a href="mailto:soporte.marsinet@marsibionics.com">
                soporte.marsinet@marsibionics.com
              </a>{' '}
              {t('pages.register.legalNoticeTexts.exclusionWarrantiesText6')}
            </p>
            {/* MODIFICACIONES */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.legalNoticeTexts.modificationsTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.legalNoticeTexts.modificationsText')}
            </p>
            {/* DERECHO DE EXCLUSION */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.legalNoticeTexts.rightOfExclusionTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.legalNoticeTexts.rightOfExclusionText')}
            </p>
            {/* GENERALIDADES */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.legalNoticeTexts.generalTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.legalNoticeTexts.generalText')}
            </p>
            {/* LEGISLACIÓN APLICABLE */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.legalNoticeTexts.applicableLegislationTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.legalNoticeTexts.applicableLegislationText')}
            </p>
            {/* LEGISLACION APLICABLE Y JURISDICIÓN */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t(
                'pages.register.legalNoticeTexts.applicableLawAndJurisdictionTitle'
              )}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t(
                'pages.register.legalNoticeTexts.applicableLawAndJurisdictionText'
              )}
            </p>
            {/* PLATAFORMA EUROPEA DE RESOLUCIÓN DE CONFLICTOS EN LÍNEA */}
            <h2 className="text-xl font-bold text-900 text-left">
              {t('pages.register.legalNoticeTexts.europeanPlatformTitle')}
            </h2>
            <p className="text-justify text-700 mb-5">
              {t('pages.register.legalNoticeTexts.europeanPlatformText')}
              <br />
              <Link
                target="_blank"
                to="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.show&lng=ES"
              >
                {' '}
                https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.show&lng=ES.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LegalNotice;
