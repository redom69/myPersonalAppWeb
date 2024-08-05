import {
  get_if_organization_has_premium,
  prisma,
  user_is_active,
} from '@marsinet/server';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  GetMenuInfo,
  MyAccount,
  MyDevices,
  OrganizationUpdateDto,
  User,
  UserData,
  UserUpdateDto,
} from './dto/dto';

@Injectable()
export class MyAccountService {
  /**
   * Get user account data.
   * @param user_id The user ID.
   * @returns The user account data.
   */

  async getData(user_id): Promise<MyAccount> {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        u_id: user_id,
      },
      include: {
        user_data: true,
        organizations: true,
      },
    });

    // Verifica si se encontró el usuario y sus relaciones requeridas
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const can_edit = user.is_admin;

    // Mapea los datos de usuario y su relación a la estructura esperada por MyAccount
    const myAccount = new MyAccount();
    myAccount.user = new User();
    myAccount.user.email = user.email;
    myAccount.user.user_data = new UserData();
    myAccount.user.user_data.name = user.user_data?.name;
    myAccount.user.user_data.surnames = user.user_data?.surnames;
    myAccount.user.user_data.birth_date = user.user_data?.birth_date;
    myAccount.user.user_data.nationality = user.user_data?.nationality;
    myAccount.user.user_data.phone = user.user_data?.phone;

    // Aquí podrías ajustar la asignación según la estructura de `organizations` en tu base de datos
    myAccount.organization = user?.organizations; // Esto dependerá de la estructura real de tus datos

    myAccount.can_edit = can_edit;

    return myAccount;
  }

  /**
   * Get menu of user.
   * @param user The user token.
   * @returns The menu of user.
   * @throws {Error} If the user account data cannot be found.
   * @throws {Error} If the user account data cannot be updated.
   */

  async getMenu(user): Promise<GetMenuInfo> {
    const role: 'clinic' | 'marsi' | 'maintenance' | 'personal' = user.role;

    const menu = [
      // Home
      {
        i_class_name: 'pi pi-home mr-2',
        to: '/authenticated',
        translation: 'pages.menu.home',
      },
    ];

    // Get if user is active
    const is_active = await user_is_active(user.u_id);
    const premium = await get_if_organization_has_premium(user.u_id);

    if (is_active) {
      // Dispositivos
      if (role === 'marsi' || role === 'maintenance') {
        menu.push({
          i_class_name: 'pi pi-android mr-2',
          to: '/authenticated/devices',
          translation: 'pages.menu.devices',
        });
      }

      // Institutions
      if (role === 'marsi') {
        menu.push({
          i_class_name: 'pi pi-building mr-2',
          to: '/authenticated/institutions',
          translation: 'pages.menu.institutions',
        });
      }

      // Mantenimiento
      if (role === 'marsi' || role === 'maintenance') {
        menu.push({
          i_class_name: 'pi pi-wrench mr-2',
          to: '/authenticated/maintenance',
          translation: 'pages.menu.maintenance',
        });
      }

      // Pacientes
      if (role === 'clinic' || role === 'marsi' || role === 'personal') {
        menu.push({
          i_class_name: 'pi pi-users mr-2',
          to: '/authenticated/patients',
          translation: 'pages.menu.patients',
        });
      }

      // Sesiones
      menu.push({
        i_class_name: 'pi pi-book mr-2',
        to: '/authenticated/sessions',
        translation: 'pages.menu.sessions',
      });

      // Usuarios
      if (role === 'marsi' || role === 'clinic') {
        menu.push({
          i_class_name: 'pi pi-sitemap mr-2',
          to: '/authenticated/users',
          translation: 'pages.menu.users',
        });
      }
    }

    return Object.assign(new GetMenuInfo(), { menu, is_active, premium });
  }

  /**
   * Update user account data.
   * @param user_id The user ID.
   * @param userData The user data to update.
   * @returns The updated user account data.
   * @throws {Error} If the user data is invalid.
   * @throws {Error} If the user account data cannot be updated.
   * @throws {Error} If the user account data cannot be found.
   */

  async update(user_id, userData: UserUpdateDto): Promise<boolean> {
    const {
      birth_date,
      name,
      nationality,
      phone,

      surnames,
    } = userData;
    const user = await prisma.user.findFirstOrThrow({
      where: {
        u_id: user_id,
      },
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    await prisma.user_data.update({
      data: {
        birth_date,
        name,
        nationality,
        phone,
        surnames,
      },
      where: {
        u_id: user_id,
      },
    });
    return true;
  }

  /**
   * Get devices access of user.
   * @param user The user token.
   * @returns The devices access of user.
   * @throws {Error} If the user account data cannot be found.
   * @throws {Error} If the user account data cannot be updated.
   * @throws {Error} If the user data is invalid.
   */

  async getMyDevices(user_id: string) {
    // Obtener detalles del usuario, incluyendo la organización y su rol
    const user = await prisma.user.findUnique({
      where: { u_id: user_id },
      include: {
        organizations: true, // Asegúrate que esta es la relación correcta en tu modelo Prisma
      },
    });

    if (!user || !user.organizations) {
      throw new HttpException(
        'User organization not found',
        HttpStatus.NOT_FOUND
      );
    }

    if (user.organizations.role === 'marsi') {
      // Si el rol de la organización es 'marsi', obtener todos los dispositivos
      const allDevices = await prisma.devices.findMany();
      return { devices: allDevices };
    } else {
      // Si no es 'marsi', obtener dispositivos de la organización del usuario
      const organizationDevices = await prisma.organization_has_device.findMany(
        {
          where: { o_id: user.organizations.o_id },
          include: {
            devices: true, // Asegúrate que esta es la relación correcta para acceder a dispositivos desde la tabla intermedia
          },
        }
      );

      // Mapear los resultados para obtener solo los dispositivos
      const devices = organizationDevices.map(
        (association) => association.devices
      );
      return { devices };
    }
  }

  /**
   * Add device to my account.
   * @param user The user token.
   * @param device_id The device id.
   * @returns The devices access of user.
   * @throws {Error} If the user account data cannot be found.
   * @throws {Error} If the user account data cannot be updated.
   * @throws {Error} If the user data is invalid.
   * @throws {Error} If the device is already associated with an organization.
   * @throws {Error} If the user does not belong to any organization.
   * @throws {Error} If the device is not found.
   * @throws {Error} If the device is not active.
   * @throws {Error} If the device is not valid.
   */

  async addDeviceToMyAccount(
    user_id: string,
    device_id: string
  ): Promise<MyDevices> {
    // Primero, verificar si el dispositivo ya está asociado con alguna organización
    const existingAssociation = await prisma.organization_has_device.findFirst({
      where: { d_id: device_id },
    });

    if (existingAssociation) {
      throw new HttpException(
        'Device is already associated with an organization',
        HttpStatus.BAD_REQUEST
      );
    }

    // Encuentra la organización a la que el usuario pertenece
    const userOrganization = await prisma.user.findUnique({
      where: { u_id: user_id },
      select: {
        organizations: true,
      },
    });

    if (!userOrganization?.organizations) {
      throw new HttpException(
        'User does not belong to any organization',
        HttpStatus.BAD_REQUEST
      );
    }

    // Asociar el dispositivo con la organización del usuario
    await prisma.organization_has_device.create({
      data: {
        o_id: userOrganization.organizations.o_id,
        d_id: device_id,
      },
    });

    // Obtener los detalles del dispositivo para devolverlo
    const device = await prisma.devices.findUnique({
      where: { d_id: device_id },
    });

    if (!device) {
      throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
    }

    const myDevice = new MyDevices();
    myDevice.id = device.d_id;
    myDevice.model = device.model;
    myDevice.serial = device.serial;
    myDevice.active = device.active;

    return myDevice;
  }

  /**
   * Update organization.
   * @param user The user token.
   * @param organization_id The organization id.
   * @param organizationUpdate The organization data to update.
   * @returns The updated organization.
   * @throws {Error} If the user account data cannot be found.
   */
  async updateMyOrganization(
    user_id: string,
    organization_id: string,
    organization: OrganizationUpdateDto
  ): Promise<boolean> {
    const org = await prisma.organizations.update({
      where: {
        o_id: organization_id,
      },
      data: {
        ...organization,
      },
    });

    if (!org) {
      throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
    }

    return !!org;
  }
}
