import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
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
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { refreshAccessToken } from '@mypaw/server';

@ApiTags('User not authenticated')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Check if server is up' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Hello API' })
  getData() {
    return this.appService.getData();
  }

  // Login
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginDto, description: 'Login data', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    type: LoginResponseDto,
    description: 'Login response',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid username or password',
  })
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.appService.login(loginDto);
  }

  // refresh token
  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh token' })
  @ApiBody({
    description: 'Refresh token data',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: String,
    description: 'Refresh token response',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid refresh token',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Refresh token expired',
  })
  refreshToken(@Body() body: { refresh_token: string }) {
    return refreshAccessToken(body.refresh_token);
  }

  // Register
  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiBody({ type: RegisterDto, description: 'Register data', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RegisterResponseDto,
    description: 'Register response',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid data' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists',
  })
  register(@Body() registerDto: RegisterDto) {
    return this.appService.register(registerDto);
  }

  // Request reset password
  @Post('request-reset-password')
  @ApiOperation({ summary: 'Request reset password' })
  @ApiBody({
    type: RequestResetPasswordDto,
    description: 'Request reset password data',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RequestResetPasswordResponseDto,
    description: 'Request reset password response',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid email',
  })
  requestResetPassword(
    @Body() requestResetPasswordDto: RequestResetPasswordDto
  ): Promise<RequestResetPasswordResponseDto> {
    return this.appService.requestResetPassword(requestResetPasswordDto);
  }

  // Reset password
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password' })
  @ApiBody({
    type: ResetPasswordDto,
    description: 'Reset password data',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResetPasswordResponseDto,
    description: 'Reset password response',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid data' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto
  ): Promise<ResetPasswordResponseDto> {
    return this.appService.resetPassword(resetPasswordDto);
  }

  @Get('organization-name/:id')
  @ApiOperation({ summary: 'Get organization name by code' })
  @ApiParam({ name: 'id', type: String, description: 'Organization code' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: String,
    description: 'Organization name',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Organization not found',
  })
  getOrganizationNameByCode(@Param('id') id: string): Promise<string> {
    return this.appService.getOrganizationNameByCode(id);
  }

  @Get('organizations')
  @ApiOperation({ summary: 'Get organizations' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [OrganizationDto],
    description: 'Organizations',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Organizations not found',
  })
  getOrganizations(): Promise<OrganizationDto[]> {
    return this.appService.getOrganizations();
  }

  @Get('email-verification/:email')
  @ApiOperation({ summary: 'Email verification' })
  @ApiParam({ name: 'email', type: String, description: 'Email' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Email verification',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Email not found',
  })
  emailVerification(@Param('email') email: string): Promise<boolean> {
    return this.appService.emailVerification(email);
  }
}
