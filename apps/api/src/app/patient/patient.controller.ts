import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import {
  AddPatientDTO,
  emailsDTO,
  PatientDto,
  PatientTable,
  PatientView,
  RemovePatientOrgDTO,
  UpdatePatientDto,
} from './dto/dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticatedGuard, GetUser } from '../guards/authenticated.guard';
import { UserTokenDto } from '../my-account/dto/dto';

@ApiTags('Patients')
@ApiBearerAuth()
@Controller('patient')
@UseGuards(AuthenticatedGuard)
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiBody({ type: PatientDto, description: 'Patient data' })
  @ApiResponse({
    description: 'Patient created successfully.',
    status: HttpStatus.CREATED,
    type: PatientDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error creating patient.',
  })
  create(
    @Body() createPatientDto: PatientDto,
    @GetUser() user: UserTokenDto
  ): Promise<PatientDto> {
    return this.patientService.create(createPatientDto, user);
  }

  @Post(':id')
  @ApiOperation({ summary: 'Update patient data' })
  @ApiBody({ type: UpdatePatientDto, description: 'Patient data' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique patient identifier',
  })
  @ApiResponse({
    description: 'Update patient data',
    status: HttpStatus.OK,
    type: UpdatePatientDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Error updating patient data because the version is lower or equal.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Patient not found.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Patient not updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
    @GetUser() user: UserTokenDto
  ): Promise<UpdatePatientDto> {
    return this.patientService.update(id, updatePatientDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a patient' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique patient identifier',
  })
  @ApiResponse({
    description: 'Patient deleted successfully.',
    status: HttpStatus.OK,
    type: PatientDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error deleting patient.',
  })
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }

  @Get()
  @ApiOperation({ summary: 'List all patients' })
  @ApiResponse({
    description: 'List of patients',
    type: PatientTable,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Patients not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error retrieving patients.',
  })
  findAll(@GetUser() user: UserTokenDto) {
    return this.patientService.findAll(user);
  }

  @Get('/config')
  @ApiOperation({ summary: 'List all the configuration of the patients' })
  @ApiResponse({
    description: 'List of patients',
    type: [PatientDto],
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Patients not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error retrieving patients.',
  })
  getConfig(@GetUser() user: UserTokenDto): Promise<PatientDto[]> {
    return this.patientService.findAllConfig(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get patient data' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique patient identifier',
  })
  @ApiResponse({
    description: 'Patient data',
    status: HttpStatus.OK,
    type: PatientView,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Patient not found in your organization.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Patient not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error retrieving patient.',
  })
  findOne(@Param('id') id: string, @GetUser() user: UserTokenDto) {
    return this.patientService.findOne(id, user);
  }

  @Post('organization/add-patient')
  @ApiOperation({ summary: 'Add a patient to an organization' })
  @ApiBody({
    type: AddPatientDTO,
    description: 'Emails of the legal guardian of the patient',
  })
  @ApiResponse({
    description: 'Patient added to the organization successfully.',
    status: HttpStatus.OK,
    type: Boolean,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error adding patient to the organization.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Patient not found.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Email not found.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Organization not found.',
  })
  addPatientToOrganization(@Body() addPatientDTO: AddPatientDTO) {
    return this.patientService.addPatientToOrganization(addPatientDTO);
  }

  @Put('organization/sync-patients')
  @ApiOperation({ summary: 'Sync patients with the organization' })
  @ApiResponse({
    description: 'Patients synced with the organization successfully.',
    status: HttpStatus.OK,
    type: Boolean,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error syncing patients with the organization.',
  })
  syncPatientsWithOrganization(
    @GetUser() user: UserTokenDto,
    @Body() emails: emailsDTO
  ) {
    return this.patientService.syncPatientsWithOrganization(user, emails);
  }

  @Delete('organization/remove-patient/:id')
  @ApiOperation({ summary: 'Remove a patient from an organization' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique patient identifier',
  })
  @ApiResponse({
    description: 'Patient removed from the organization successfully.',
    status: HttpStatus.OK,
    type: Boolean,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error removing patient from the organization.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Patient not found.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Organization not found.',
  })
  removePatientFromOrganization(
    @Body() removePatientOrgDTO: RemovePatientOrgDTO
  ) {
    return this.patientService.removePatientFromOrganization(
      removePatientOrgDTO
    );
  }
}
