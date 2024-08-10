import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  LoginDto,
  LoginResponseDto,
  OrganizationDto,
  RegisterDto,
  RegisterResponseDto,
  RequestResetPasswordDto,
  RequestResetPasswordResponseDto,
  ResetPasswordDto,
  ResetPasswordResponseDto,
} from './app.dtos';
import { User, prisma, sendEmailToAdmin, verifyAccount } from '@mypaw/server';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    try {
      const user = await User.login(loginDto.username, loginDto.password);

      const access_token = await User.create_token(user);
      const refresh_token = await User.create_refresh_token(user);

      // Devolver solo el token de acceso en la respuesta
      return {
        access_token,
        refresh_token,
      };
    } catch (error) {
      throw new HttpException(
        'Usuario y contraseña no válidos',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async emailVerification(email: string): Promise<boolean> {
    const user = await User.getByEmail(email);

    return !!user;
  }

  async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
    const userExist = await User.getByEmail(registerDto.email);

    if (userExist) {
      throw new HttpException('ya existe', HttpStatus.CONFLICT);
    }

    try {
      const { email, password } = registerDto;
      const userData = {
        name: registerDto.name,
        surnames: registerDto.surnames,
        phone: registerDto.phone,
        birth_date: registerDto.birth_date,
        nationality: registerDto.nationality,
      };

      const user = await User.createUser(
        email,
        password,
        userData,
        registerDto.organization_id
      );

      const access_token = await User.create_token(user);
      const refresh_token = await User.create_refresh_token(user);

      await verifyAccount(email).catch((error) => {
        console.log('Error sending email');
        console.log(error);
      });

      await sendEmailToAdmin(registerDto.organization_id).catch((error) => {
        console.log('Error sending admin email');
        console.log(error);
      });

      return {
        access_token,
        refresh_token,
      };
    } catch (error) {
      throw new HttpException(
        'Algo inesperado ocurrió',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async requestResetPassword(
    requestResetPasswordDto: RequestResetPasswordDto
  ): Promise<RequestResetPasswordResponseDto> {
    const response = await User.requestResetPassword(
      requestResetPasswordDto.username
    );

    return {
      success: response.success,
    };
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto
  ): Promise<ResetPasswordResponseDto> {
    const response = await User.resetPassword(
      resetPasswordDto.id,
      resetPasswordDto.r,
      resetPasswordDto.new_password,
      resetPasswordDto.confirm_new_password
    );

    if (!response) {
      throw new HttpException(
        'No se pudo cambiar la contraseña',
        HttpStatus.BAD_REQUEST
      );
    }
    return {
      success: response,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getOrganizationNameByCode(code: string): Promise<any> {
    const organization = await prisma.organizations.findFirst({
      where: {
        o_id: code,
      },
    });

    if (!organization) {
      throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
    }

    return { name: organization.name };
  }

  async getOrganizations(): Promise<OrganizationDto[]> {
    const organizations = await prisma.organizations.findMany();

    return organizations.map((organization) => ({
      o_id: organization.o_id,
      name: organization.name,
    }));
  }
}
