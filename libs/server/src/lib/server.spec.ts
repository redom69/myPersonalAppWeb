import { async } from 'rxjs';
import {
  ERROR_PASSWORD_NOT_VALID,
  ERROR_USER_NOT_FOUND,
  UserData,
  can_edit_password,
  createUser,
  create_token,
  create_user,
  generate_reset_token_password_and_send_email,
  login,
  verify_token,
} from './server';
import { prisma } from './utils';

const email = 'user-without-data.test@marsinet.com';
const password = 'testing-password';
const password_invalid = 'password_invalid';

const userToCreate = {
  // username: 'new-user.test@marsinet.com',
  username: 'd.romero@alicunde.com',
  password: 'Mola2020',
  name: 'Damian',
  surnames: 'Romero',
  phone: '987654321',
  birth_date: new Date('2023-05-07T22:00:00.000Z'),
  nationality: 'ESPAÑOLA',
  street_name: 'Sevilla',
  street_number: '25',
  city: 'Marchena',
  state: 'Sevilla',
  postal_code: '41620',
  country: 'España',
  institution: 'JAJAJA',
};
describe('Testing user worflow login and create', () => {
  beforeAll(async () => {
    await prisma.$connect();
    await prisma.user.deleteMany({ where: { email } });
    await prisma.user.deleteMany({ where: { email: userToCreate.username } });
  });
  // it(`User with email: ${email} not exist`, async () => {
  //   expect(await get_user_by_email(email)).toBeNull();
  // });

  // it(`User with email: ${email} should exist`, async () => {
  //   const user = await get_user_by_email(email);
  //   expect(user).not.toBeNull();
  //   expect(user).toHaveProperty('email', email);
  //   expect(user).toHaveProperty('password');
  // });

  // it(`User password has been hased: ${email}`, async () => {
  //   const user = await get_user_by_email(email);
  //   expect(user).not.toBeNull();
  //   expect(user.password).not.toBe(password);
  // });

  it(`Login with user not exits: email ${email} and password ${password}`, async () => {
    expect(login(email, password)).rejects.toThrow(ERROR_USER_NOT_FOUND);
  });

  it(`Should create user with: email ${email} and password ${password}`, async () => {
    const user = await create_user({ email, password });
    expect(user).toHaveProperty('email', email);
    expect(user.password).not.toBe(password);
  });

  it.todo('User already exist');

  it(`Login with user no correct password: ${email} and password ${password_invalid}`, async () => {
    expect(login(email, password_invalid)).rejects.toThrow(
      ERROR_PASSWORD_NOT_VALID,
    );
  });

  it(`Login with user correct password: ${email} and password ${password}`, async () => {
    const user = await login(email, password);
    expect(user).toHaveProperty('email', email);
    expect(user).toHaveProperty('id');
    expect(user).not.toHaveProperty('password');
  });

  it(`Should get token`, async () => {
    const user = await login(email, password);
    const token = await create_token(user);
    expect(token).not.toBeNull();
  });

  it('Should verify token data', async () => {
    const user = await login(email, password);
    const token = await create_token(user);
    const decode = await verify_token(token);
    expect(decode).not.toBeNull();
    expect(decode).toHaveProperty('email', email);
    expect(decode).toHaveProperty('id');
  });

  it.todo('Should try change user password with recovery token. token expired');
  it.todo('Should try change user password with recovery token. success');
  it('Should register user with email and password', async () => {
    const { username, password } = userToCreate;
    const userData: UserData = {
      name: userToCreate.name,
      surnames: userToCreate.surnames,
      phone: userToCreate.phone,
      birth_date: userToCreate.birth_date,
      city: userToCreate.city,
      country: userToCreate.country,
      institution: userToCreate.institution,
      nationality: userToCreate.nationality,
      postal_code: userToCreate.postal_code,
      state: userToCreate.state,
      street_name: userToCreate.street_name,
      street_number: userToCreate.street_number,
    };
    expect(await createUser(username, password, userData)).toHaveProperty(
      'email',
      userToCreate.username,
    );
  });

  it('Should generate reset password token', async () => {
    const response = await generate_reset_token_password_and_send_email(
      userToCreate.username,
    );
    expect(response.success).toBeTruthy();

    const candEditPassword = can_edit_password(response.id, response.r);
    expect(candEditPassword).toBeTruthy();
  });
});
