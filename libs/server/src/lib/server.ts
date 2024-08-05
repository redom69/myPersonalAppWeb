import { Prisma, user } from '@prisma/client';
import { prisma } from './utils';
// Bcript
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import {
  WelcomeEmailData,
  account,
  resetPasswordEmail,
  sendEmailAdmin,
  sendWelcomeEmailAdmin,
  verifyAccountUser,
  welcomeEmail,
} from './email';
import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

const SALT_ROUNDS = 15;
const jwtService = new JwtService({
  secret: process.env.jwtSecretKey,
});
const URL_FRONTED = process.env.URL_FRONTED || 'http://localhost:4200';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'marsinet@marsinet.com';
const CONTACT_PHONE = process.env.CONTACT_PHONE || '955 99 99 99';

export const ERROR_USER_NOT_FOUND = 'User not found';
export const ERROR_PASSWORD_NOT_VALID = 'Password not valid';

export async function get_user_by_email(email: string): Promise<user | null> {
  return await prisma.user.findUnique({ where: { email } });
}

export function hash_password(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export function compare_password(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function create_user(user: Prisma.userCreateInput): Promise<user> {
  const password = await bcrypt.hash(user.password, SALT_ROUNDS);
  const email = user.email;
  return prisma.user.create({
    data: {
      email,
      password,
    },
  });
}

export async function login(email: string, password: string): Promise<user> {
  const user = await get_user_by_email(email);

  if (!user) {
    throw new Error(ERROR_USER_NOT_FOUND);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error(ERROR_PASSWORD_NOT_VALID);
  }

  delete user.password;

  return user;
}

export async function create_token(user: user): Promise<string> {
  const organization = await prisma.organizations.findFirst({
    where: {
      o_id: user.o_id,
    },
  });
  const user_data = await prisma.user_data.findFirst({
    where: {
      u_id: user.u_id,
    },
  });

  if (!organization) {
    throw new Error(
      'No se pudo encontrar la organización o los datos del usuario.'
    );
  }

  const decode = jwtService.sign(
    {
      ...user,
      role: organization.role,
      name: user_data ? user_data?.name : 'unknown',
    },
    { expiresIn: '180d' }
  );

  return decode;
}

export async function refreshAccessToken(
  refreshToken: string
): Promise<string> {
  try {
    const decoded = jwtService.verify(refreshToken);

    const payload = {
      u_id: decoded.u_id,
      created_at: decoded.created_at,
      updated_at: decoded.updated_at,
      email: decoded.email,
      o_id: decoded.o_id,
      active: decoded.active,
      is_admin: decoded.is_admin,
      role: decoded.role,
      name: decoded.name,
    };

    const newAccessToken = jwtService.sign(payload, {
      expiresIn: '182d',
    });

    return newAccessToken;
  } catch (error) {
    throw new UnauthorizedException('Invalid refresh token');
  }
}

export async function verify_token(token: string): Promise<user | null> {
  try {
    const decoded = await jwtService.verify(token);
    // aqui peta
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // Manejar específicamente el error de token expirado
      throw new UnauthorizedException(`Token de acceso inválido o expirado`);
    } else {
      // Manejar otros posibles errores
      console.error('Error verificando el token JWT:', error);
    }
    return null;
  }
}

export async function create_refresh_token(user: user): Promise<string | null> {
  const organization = await prisma.organizations.findFirst({
    where: {
      o_id: user.o_id,
    },
  });
  const user_data = await prisma.user_data.findFirst({
    where: {
      u_id: user.u_id,
    },
  });
  if (!organization) {
    throw new Error(
      'No se pudo encontrar la organización o los datos del usuario.'
    );
  }

  const decode = jwtService.sign(
    {
      ...user,
      role: organization.role,
      name: user_data ? user_data?.name : 'unknown',
    },
    { expiresIn: '1d' }
  );
  return decode;
}

export async function createUser(email, _password, userData, o_id: string) {
  const password = await bcrypt.hash(_password, SALT_ROUNDS);

  const organization = await prisma.organizations.findFirst({
    where: {
      o_id,
    },
  });

  if (!organization) {
    throw new HttpException(
      'No se encontro la organizacion',
      HttpStatus.BAD_REQUEST
    );
  }

  const users = await prisma.user.findMany({
    where: {
      o_id,
    },
  });

  const user = await prisma.user.create({
    data: {
      email,
      password,
      o_id,
      is_admin: users.length === 0,
      active: users.length === 0,
      user_data: {
        create: {
          name: userData.name,
          surnames: userData.surnames,
          phone: userData.phone,
          birth_date: new Date(userData.birth_date),
          nationality: userData.nationality,
        },
      },
    },
  });

  delete user.password;
  return user;
}

export async function sendEmailToAdmin(o_id: string) {
  let success = false;
  let url = '';

  const users: any[] = await prisma.user.findMany({
    where: { o_id, is_admin: true },
    include: {
      user_data: true,
    },
  });

  if (users.length > 0) {
    url = `${URL_FRONTED}/authenticated/users`;

    // Utilizamos Promise.all para manejar múltiples envíos de correos electrónicos
    const emailPromises = users.map(async (user) => {
      const email = user.email; // Asumimos que user tiene una propiedad email
      const adminData = {
        contact_email: CONTACT_EMAIL,
        contact_phone: CONTACT_PHONE,
        email,
        full_name: `${user.user_data.name} ${user.user_data.surnames}`,
        url_inactive: url,
      };

      return sendEmailAdmin(email, adminData)
        .then(() => true)
        .catch((error) => {
          console.log(error);
          return false;
        });
    });

    const emailResults = await Promise.all(emailPromises);
    success = emailResults.every((result) => result === true);
  }

  return { success };
}

export async function verifyAccount(email: string) {
  let success = false;
  let url = '';
  const user = await prisma.user.findFirst({
    where: { email },
    include: {
      user_data: true,
    },
  });

  if (user) {
    url = `${URL_FRONTED}/authenticated/verify-account`;

    const emailData: account = {
      contact_email: CONTACT_EMAIL,
      contact_phone: CONTACT_PHONE,
      email,
      full_name: `${user.user_data.name} ${user.user_data.surnames}`,
      url_inactive: url,
    };

    await verifyAccountUser(email, emailData)
      .then(() => (success = true))
      .catch((error) => console.log(error));
  }

  return { success };
}

export async function sendWelcomeEmailToUser(email: string) {
  let success = false;
  const user = await prisma.user.findFirst({
    where: { email },
    include: {
      user_data: true,
    },
  });

  if (user) {
    const emailData: WelcomeEmailData = {
      full_name: `${user.user_data.name} ${user.user_data.surnames}`,
    };

    await welcomeEmail(email, emailData)
      .then(() => (success = true))
      .catch((error) => console.log(error));
  }
  return { success };
}

export async function generate_reset_token_password_and_send_email(
  email: string
) {
  let url = '';
  let success = false;
  let id, r;
  const user = await prisma.user.findFirst({
    where: { email },
    include: {
      user_data: true,
    },
  });

  if (user) {
    const user_reset_password = await prisma.user_reset_password.create({
      data: {
        u_id: user.u_id,
        r: uuidv4(),
      },
    });

    url = `${URL_FRONTED}/reset-password?r=${user_reset_password.r}&id=${user_reset_password.id}`;
    // Send email
    resetPasswordEmail(email, {
      contact_email: CONTACT_EMAIL,
      contact_phone: CONTACT_PHONE,
      email,
      full_name: `${user.user_data.name} ${user.user_data.surnames}`,
      url_recovery: url,
    })
      .then()
      .catch();
    success = true;
    id = user_reset_password.id;
    r = user_reset_password.r;
  }

  return {
    success,
    url,
    id,
    r,
  };
}

export async function generate_reset_token_password_and_send_email_new_admin_clinic(
  email: string
) {
  let url = '';
  let success = false;
  let id, r;
  const user = await prisma.user.findFirst({
    where: { email },
    include: {
      user_data: true,
    },
  });

  if (user) {
    const user_reset_password = await prisma.user_reset_password.create({
      data: {
        u_id: user.u_id,
        r: uuidv4(),
      },
    });

    url = `${URL_FRONTED}/reset-password?r=${user_reset_password.r}&id=${user_reset_password.id}`;
    // Send email
    sendWelcomeEmailAdmin(email, {
      full_name: user.user_data.name,
      url_login: url,
    })
      .then()
      .catch();
    success = true;
    id = user_reset_password.id;
    r = user_reset_password.r;
  }

  return {
    success,
    url,
    id,
    r,
  };
}

export async function can_edit_password(id: string, r: string) {
  const reset = await prisma.user_reset_password.findFirst({
    where: { id, r },
  });

  return !!reset;
}

export async function resetPassword(
  id: string,
  r: string,
  new_password: string,
  confirmPassword: string
) {
  const reset = await prisma.user_reset_password.findFirst({
    where: { id, r },
  });

  const cad_edit = !!reset;
  if (cad_edit) {
    if (new_password !== confirmPassword) {
      throw new Error('Password not match');
    }

    const password = await bcrypt.hash(new_password, SALT_ROUNDS);
    const user = await prisma.user.update({
      where: { u_id: reset.u_id },
      data: {
        password,
      },
    });
    // Remove reset password
    await prisma.user_reset_password.deleteMany({
      where: { u_id: reset.u_id },
    });

    //await sendWelcomeEmailToUser(user.email);

    return true;
  }
  return false;
}
export const User = {
  create: create_user,
  createUser,
  getByEmail: get_user_by_email,
  login,
  verify_token,
  create_token,
  create_refresh_token,
  requestResetPassword: generate_reset_token_password_and_send_email,
  resetPassword,
};

export async function get_if_organization_has_premium(user_id: string) {
  const user = await prisma.user.findFirst({
    where: {
      u_id: user_id,
    },
    include: {
      organizations: true,
    },
  });

  if (!user.organizations) {
    return false;
  }

  return user.organizations?.premium || false;
}

export async function user_is_active(user_id: string) {
  const res = await prisma.user.findFirst({
    where: {
      u_id: user_id,
      active: true,
    },
  });

  return !!res;
}

export async function get_premium_status_of_organization_of_user(
  user_id: string
) {
  const user = await prisma.user.findFirst({
    where: {
      u_id: user_id,
    },
    include: {
      organizations: true,
    },
  });

  if (!user) {
    throw new Error('User has no access to any organization');
  }

  return user.organizations.premium;
}
