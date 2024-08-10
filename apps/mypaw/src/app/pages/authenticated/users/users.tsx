import { Toast } from 'primereact/toast';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AdminApiFactory,
  MyAccountApiFactory,
  UsersApiFactory,
} from 'apps/mypaw/src/app/typescript-axios';
import { Context } from '../../../context/provider';
import axios from 'axios';
import { TabView, TabPanel } from 'primereact/tabview';
import { ConfirmDialog } from 'primereact/confirmdialog';
import TableUsersComponent from './components/table-users-component/table-users-component';

import { Button } from 'primereact/button';
import ModalCreateUser from './components/modal-create-user/modal-create-user';
import ModalEditUser from './components/modal-edit-user/modal-edit-user';

/* eslint-disable-next-line */
export interface UsersProps {}

interface Users {
  u_id: string;
  o_id: string;
  name?: string;
  surnames?: string;
  email?: string;
  active?: boolean;
  role?: string;
}

interface CreateUser {
  name: string;
  surnames: string;
  email: string;
  password: string;
  phone: string;
  birth_date: string;
  nationality: string;
  organization_id: string;
}

const apiService = UsersApiFactory();
const apiServiceAdmin = AdminApiFactory();
const apiServiceDevices = MyAccountApiFactory();

export function Users(props: UsersProps) {
  const toast = useRef(null);
  const { t } = useTranslation();
  const { access_token, role, setRole, setAdmin } = useContext(Context);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filtersUsers, setFiltersUsers] = useState<any>();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [editUserVisible, setEditUserVisible] = useState<boolean>(false);
  const [userEdit, setUserEdit] = useState<string>();

  const loadUsers = async () => {
    try {
      const response = await apiService.usersControllerFindAll();

      setUsers(response.data);
    } catch (error) {
      show('error', t('messages.error'), t('messages.error_message'));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeActive = async (row: any) => {
    if (!row.u_id) return;
    try {
      await apiService.usersControllerToggleActiveUser({
        u_id: row.u_id,
        active: !row.active,
        o_id: row.o_id,
      });

      setUsers(
        users.map((user) => {
          if (user.u_id === row.u_id) {
            return {
              ...user,
              active: !user.active,
            };
          }
          return user;
        })
      );

      setFiltersUsers(
        users.filter((user) => (activeIndex === 0 ? user.active : !user.active))
      );

      show(
        'success',
        t('messages.success'),
        t('messages.user_updated_success')
      );
    } catch (error) {
      show('error', t('messages.error'), t('messages.error_message'));
    }
  };

  const show = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  const changeTabView = (index: number) => {
    setActiveIndex(index);
    setFiltersUsers(
      users?.filter((user) => (activeIndex === 0 ? user.active : !user.active))
    );
  };

  const createUserFunction = async (values: CreateUser) => {
    try {
      await apiServiceAdmin
        .adminControllerCreateUser(values)
        .then((res) => {
          show(
            'success',
            t('messages.success'),
            t('messages.user_created_success')
          );
        })
        .catch();
      setVisible(false);
      loadUsers();
      return true;
    } catch (error) {
      const status = error.response?.status;

      if (status === 404) {
        show('error', t('messages.error'), t('messages.o_id_not_found'));
      } else if (status === 409) {
        show('error', t('messages.error'), t('messages.email_already_in_use'));
      } else {
        show('error', t('messages.error'), t('messages.error_message'));
      }
      return false;
    }
  };

  const editUserFunctionActiveModal = async (id: string) => {
    if (!id) return;
    setUserEdit(id);
    setEditUserVisible(true);
  };

  useEffect(() => {
    if (!access_token) return;
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    loadUsers();
    apiServiceDevices.myAccountControllerGetData().then((response) => {
      const data = response.data;

      setRole(data.organization?.role);
      setAdmin(data.can_edit);
    });
  }, [access_token]);

  useEffect(() => {
    setFiltersUsers(
      users?.filter((user) => (activeIndex === 0 ? user.active : !user.active))
    );
  }, [activeIndex, users]);

  return (
    <div className="col-12 xl:pl-7 xl:pr-7">
      <Toast ref={toast} />
      <div className="col-12 ">
        <ConfirmDialog />
        <div className="surface-card p-3 shadow-3 border-round-xl flex justify-content-between align-items-center mb-5">
          <div className="font-medium text-2xl text-900">
            {t('pages.users.title')}
          </div>
          {role === 'marsi' && (
            <Button
              icon="pi pi-plus"
              label={t('pages.users.add')}
              severity="secondary"
              aria-label="Añadir"
              onClick={() => {
                setVisible(true);
              }}
            />
          )}
        </div>
      </div>

      <div className="col-12 grid mx-0">
        <div className="surface-card border-round-xl shadow-3	py-5 px-3 col-12">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => changeTabView(e.index)}
            className="px-0"
          >
            <TabPanel header={t('pages.users.table.usersActive')}>
              {/* TABLA USUARIOS ACTIVOS */}
              <TableUsersComponent
                filtersUsers={filtersUsers}
                changeActive={changeActive}
                editUserFunctionActiveModal={editUserFunctionActiveModal}
              />
            </TabPanel>
            <TabPanel header={t('pages.users.table.usersInactive')}>
              {/* TABLA USUARIOS INACTIVOS */}
              <TableUsersComponent
                filtersUsers={filtersUsers}
                changeActive={changeActive}
                editUserFunctionActiveModal={editUserFunctionActiveModal}
              />
            </TabPanel>
          </TabView>
        </div>
      </div>
      {/* MODAL CREAR USUARIO */}
      <ModalCreateUser
        visible={visible}
        setVisible={setVisible}
        createUserFunction={createUserFunction}
      />
      {/* MODAL EDITAR USUARIO */}
      <ModalEditUser
        visible={editUserVisible}
        setVisible={setEditUserVisible}
        userEdit={userEdit}
        loadUsers={loadUsers}
      />
    </div>
  );
}

export default Users;
