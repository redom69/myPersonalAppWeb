import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  NavLink,
} from 'react-router-dom';
import Login from '../app/pages/login/login';
import Register from '../app/pages/register/register';
import RequestResetPassword from '../app/pages/request-reset-password/request-reset-password';
import ResetPassword from '../app/pages/reset-password/reset-password';
import Ingestion from '../app/pages/authenticated/ingestion/ingestion';
import Patients from '../app/pages/authenticated/patients/patients';
import Patient from '../app/pages/authenticated/patients/patient/patient';
import Sessions from '../app/pages/authenticated/sessions/sessions';
import { Ripple } from 'primereact/ripple';
import { StyleClass } from 'primereact/styleclass';
import { useContext, useEffect, useRef, useState } from 'react';
import { MarsinetContext } from '../app/context/marsinetProvider';
import Home from '../app/pages/authenticated/home/home';
import axios from 'axios';
import {
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
} from '../environments/environment';
import { useTranslation } from 'react-i18next';
import Informe from '../app/pages/authenticated/informe/informe';
import MyProfile from '../app/pages/authenticated/my-profile/my-profile';
import SelectorLanguageComponent from '../app/components/selector-language-component/selector-language-component';
import ErrorPage from '../app/pages/error/error-page';
import { Menu, MyAccountApiFactory } from '../app/typescript-axios';
import Users from '../app/pages/authenticated/users/users';
import Devices from '../app/pages/authenticated/devices/devices';
import CookiePolicy from '../app/pages/cookie-policy/cookie-policy';
import LegalNotice from '../app/pages/legal-notice/legal-notice';
import Confidentiality from '../app/pages/confidentiality/confidentiality';
import Device from '../app/pages/authenticated/devices/device/device';
import AccountNotYetActivated from '../app/pages/account-not-yet-activated/account-not-yet-activated';
import Institutions from '../app/pages/authenticated/institutions/institutions';
import Institution from '../app/pages/authenticated/institutions/institution/institution';
import NotPremiumPage from '../app/pages/not-premium/not-premium-page';
import { VERSION } from '../environments/environment';
import VerifyAccount from '../app/pages/verify-account/verify-account';
import Maintenance from '../app/pages/authenticated/maintenance/maintenance';

const apiService = MyAccountApiFactory();

export function AppRoutes() {
  const {
    setIsLogged,
    setAccessToken,
    access_token,
    refresh_token,
    setRefreshToken,
  } = useContext(MarsinetContext);
  const [menu, setMenu] = useState<Menu[]>(null);
  const { t } = useTranslation();
  const menuBtnRef = useRef(null);
  const menuUserBtnRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false); // Cambiado el nombre del estado
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPremium, setIsPremium] = useState<boolean>(false);

  // Función para cerrar menu responsive
  const closeMenu = () => {
    document.getElementById('app-sidebar').classList.add('hidden');
  };

  const goToMyAccount = () => {
    menuUserBtnRef.current.click();
  };

  const signOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
    setIsLogged(false);
    setAccessToken(null);
    setRefreshToken(null);
    axios.defaults.headers.common['Authorization'] = null;
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!access_token) {
      setIsLoading(false);
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

    try {
      apiService
        .myAccountControllerGetMenu()
        .then((response) => {
          const { menu, is_active, premium } = response.data;
          setMenu(menu);
          setIsLoading(false);
          setIsActive(is_active);
          setIsPremium(premium);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, [access_token, refresh_token]);

  useEffect(() => {
    if (access_token && refresh_token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    }
  }, [access_token, refresh_token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuUserBtnRef.current &&
        !menuUserBtnRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleClic = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <BrowserRouter>
      {access_token && !isLoading && (
        <>
          {/* Si está logueado muestra menú */}
          <div
            className="min-h-screen flex relative "
            style={{
              background: 'linear-gradient(60deg, #13dfb6 0%,#004e78 100%)',
            }}
          >
            {/* Menu Lateral */}
            <div
              id="app-sidebar"
              className="surface-section h-full  hidden  flex-shrink-0 absolute  left-0 top-0 z-5 border-right-1 surface-border select-none "
              style={{ width: '209px' }}
            >
              <div className="flex flex-column h-full fixed py-2">
                {/* Logo Aplicación */}
                <div className="flex align-items-center px-2 flex-shrink-0">
                  <img
                    src="/assets/marsi-azul-degradado-fondo-blanco.png"
                    alt="logo marsinet"
                    style={{ width: '193px' }}
                  />
                </div>
                {/* Menu */}
                <div className="flex-grow-1 overflow-auto">
                  <ul className="list-none p-0 m-0 overflow-hidden">
                    {menu?.map((item: Menu, index: number) => {
                      return (
                        <li key={index}>
                          <NavLink
                            className={({ isActive, isPending }) => {
                              return isPending
                                ? 'p-ripple flex align-items-center cursor-pointer p-3 text-700 hover:bg-primary transition-duration-150 transition-colors w-full no-underline'
                                : isActive
                                  ? 'p-ripple flex align-items-center cursor-pointer p-3 text-700 hover:bg-primary transition-duration-150 transition-colors w-full no-underline bg-primary'
                                  : 'p-ripple flex align-items-center cursor-pointer p-3 text-700 hover:bg-primary transition-duration-150 transition-colors w-full no-underline';
                            }}
                            end={index === 0}
                            to={item?.to}
                            onClick={() => closeMenu()}
                          >
                            {item.i_class_name !== 'pi pi-android mr-2' && (
                              <i className={item?.i_class_name}></i>
                            )}
                            {item.i_class_name === 'pi pi-android mr-2' && (
                              <img
                                src="/assets/robot.svg"
                                alt="exo"
                                style={{
                                  width: '20px',
                                  marginRight: '7px',
                                  filter: 'invert(50%)',
                                }}
                                className="p-ripple flex align-items-center cursor-pointer"
                              />
                            )}
                            <span className="font-medium">
                              {t(item?.translation)}
                            </span>
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <footer className="flex justify-content-center align-items-center py-9">
                  {`version ${VERSION}`}
                </footer>
              </div>
            </div>
            {/* Container */}
            <div className={`w-full `}>
              {/* Header */}
              <div
                className={`flex justify-content-between align-items-center px-2 surface-0 border-bottom-1 surface-border fixed z-4 w-full  `}
                style={{ height: '70px' }}
              >
                {/* Header */}
                {/* Boton */}
                <div className="w-full ">
                  <StyleClass
                    nodeRef={menuBtnRef}
                    selector="#app-sidebar"
                    enterClassName="hidden"
                    enterActiveClassName="fadeinleft"
                    leaveToClassName="hidden"
                    leaveActiveClassName="fadeoutleft"
                    hideOnOutsideClick
                  >
                    <div
                      ref={menuBtnRef}
                      className="  p-ripple cursor-pointer block  text-700 mr-3"
                      onClick={handleClic}
                    >
                      <span className="p-ripple flex align-items-center justify-content-center  cursor-pointer p-3 border-round text-700 hover:surface-200 transition-duration-150 transition-colors w-full no-underline">
                        <i className="pi pi-bars text-3xl " />
                        <Ripple />
                      </span>
                    </div>
                  </StyleClass>
                </div>
                <div className="w-full text-center" />
                <div className="w-full text-center" />
                <div className="w-full text-center" />
                <div className="w-full text-center" />
                {/* Logo */}
                <div className="w-full text-center">
                  <img
                    src="/assets/marsi-azul-degradado-fondo-blanco-plano.png"
                    alt="logo marsinet"
                    style={{ width: '350px', cursor: 'pointer' }}
                    onClick={() => (window.location.href = '/authenticated')}
                  />
                </div>
                <div className="w-full text-center" />
                <div className="w-full text-center" />
                <div className="w-full text-center" />
                <div className="w-full text-center" />

                {/* Menu Usuario */}
                <div className="w-full ">
                  <div className="flex justify-content-end ">
                    <StyleClass
                      nodeRef={menuUserBtnRef}
                      selector="@next"
                      enterClassName="hidden"
                      enterActiveClassName="fadein"
                      leaveToClassName="hidden"
                      leaveActiveClassName="fadeout"
                      hideOnOutsideClick
                    >
                      <div
                        ref={menuUserBtnRef}
                        className="p-ripple cursor-pointer block  text-700 "
                      >
                        <span className="p-ripple flex align-items-center justify-content-center  cursor-pointer p-3 border-round text-700 hover:surface-200 transition-duration-150 transition-colors w-full no-underline">
                          <i className="pi pi-user text-3xl " />
                          <Ripple />
                        </span>
                      </div>
                    </StyleClass>
                    <ul
                      className="list-none p-0 m-0 hidden select-none 
  surface-section border-1 surface-border right-0 top-100 z-1 shadow-2  absolute "
                    >
                      <li>
                        {/* Separador y selector de Idioma */}
                        <div className="flex align-items-center justify-content-center  cursor-pointer p-3 border-round text-700 hover:surface-200 transition-duration-150 transition-colors w-full no-underline">
                          <SelectorLanguageComponent />
                        </div>
                      </li>
                      <li>
                        <NavLink
                          className="p-ripple flex align-items-center justify-content-center  cursor-pointer p-3 border-round text-700 hover:surface-200 transition-duration-150 transition-colors w-full no-underline"
                          to={'/authenticated/my-profile'}
                          onClick={() => goToMyAccount()}
                        >
                          <i className="pi pi-cog mr-2"></i>
                          <span className="block font-medium">
                            {t('pages.menu.myAccount')}
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="p-ripple flex align-items-center justify-content-center  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
                          to={'/login'}
                          onClick={() => signOut()}
                        >
                          <i className="pi pi-sign-out mr-2"></i>
                          <span className="font-medium">
                            {t('pages.menu.signOut')}
                          </span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Contenido */}
              <div className="mt-7">
                <div className="col-12 py-4 p-1 md:p-3">
                  <div className="flex justify-content-center">
                    <div className="xl:max-width w-full">
                      <div className="grid grid-nogutter">
                        <Routes>
                          <>
                            <Route
                              path="/"
                              element={<Navigate to="authenticated" />}
                            />
                            {isActive && (
                              <Route path="authenticated" element={<Home />} />
                            )}
                            {!isActive && (
                              <Route
                                path="authenticated"
                                element={
                                  <AccountNotYetActivated
                                    is_active={isActive}
                                  />
                                }
                              />
                            )}
                            {!isActive && (
                              <Route
                                path="authenticated/verify-account"
                                element={<VerifyAccount is_active={isActive} />}
                              />
                            )}
                            {isActive && (
                              <Route
                                path="authenticated/patients"
                                element={
                                  isPremium ? <Patients /> : <NotPremiumPage />
                                }
                              />
                            )}
                            {isActive && (
                              <Route
                                path="authenticated/patients/:patient_id"
                                element={
                                  isPremium ? <Patient /> : <NotPremiumPage />
                                }
                              />
                            )}
                            {isActive && (
                              <Route
                                path="authenticated/users"
                                element={
                                  isPremium ? <Users /> : <NotPremiumPage />
                                }
                              />
                            )}
                            {isActive && (
                              <Route
                                path="authenticated/devices"
                                element={<Devices />}
                              />
                            )}
                            {isActive && (
                              <Route
                                path="authenticated/maintenance"
                                element={<Maintenance />}
                              />
                            )}
                            {isActive && (
                              <Route
                                path="authenticated/devices/:device_id"
                                element={<Device />}
                              />
                            )}
                            {isActive && (
                              <Route
                                path="authenticated/sessions"
                                element={
                                  isPremium ? <Sessions /> : <NotPremiumPage />
                                }
                              />
                            )}
                            {isActive && (
                              <Route
                                path="authenticated/patients/:patient_id/:start_date/:end_date"
                                element={<Informe />}
                              />
                            )}
                            {isActive && (
                              <Route
                                path="authenticated/institutions"
                                element={<Institutions />}
                              />
                            )}
                            {isActive && (
                              <Route
                                path="authenticated/institutions/:id_institution"
                                element={<Institution />}
                              />
                            )}
                            <Route
                              path="authenticated/ingestions"
                              element={<Ingestion />}
                            />
                            <Route
                              path="authenticated/my-profile"
                              element={<MyProfile />}
                            />
                            <Route path="*" element={<ErrorPage />} />
                          </>
                        </Routes>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Si no está logueado no muestra menu */}
      {!access_token && !isLoading && (
        <Routes>
          <>
            <Route path="/" element={<Navigate to="login" />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="request-reset-password"
              element={<RequestResetPassword />}
            />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="legal-notice" element={<LegalNotice />} />
            <Route path="confidentiality" element={<Confidentiality />} />
            <Route path="cookies-policy" element={<CookiePolicy />} />
            <Route path="*" element={<ErrorPage />} />
          </>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default AppRoutes;
