import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  AddPatientDTO,
  emailsDTO,
  PatientDto,
  PatientTable,
  PatientView,
  RemovePatientOrgDTO,
  Session,
  UpdatePatientDto,
} from './dto/dto';
import { UserTokenDto } from '../my-account/dto/dto';

import { prisma } from '@mypaw/server';
import { processSessions } from '@mypaw/commons';

@Injectable()
export class PatientService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private cleanUndefined(obj: Record<string, any>) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});
  }

  async create(
    createPatientDto: PatientDto,
    user: UserTokenDto
  ): Promise<PatientDto> {
    try {
      await prisma.$transaction(async (prisma) => {
        // Crear paciente

        await prisma.patients.create({
          data: {
            p_id: createPatientDto.p_id,
            sex: createPatientDto.sex,
            birth_date: new Date(createPatientDto.birth_date),
            pathology: createPatientDto.pathology,
            treatment: createPatientDto.treatment,
            affection: createPatientDto.affectation,
            city: createPatientDto.city,
            nationality: createPatientDto.nationality,
            total_sessions: 0,
            total_steps: 0,
            last_session: null,
          },
        });

        // Configuración del paciente
        await prisma.config_patient.create({
          data: {
            p_id: createPatientDto.p_id,
            version: createPatientDto.version,
            weight: createPatientDto.weight,
            height: createPatientDto.height,
            chest_size: createPatientDto.chest_size,
            shoe_size: createPatientDto.shoe_size,
            femur_len_r: createPatientDto.femur_len_r,
            femur_len_l: createPatientDto.femur_len_l,
            tibia_len_r: createPatientDto.tibia_len_r,
            tibia_len_l: createPatientDto.tibia_len_l,
            walker_len: createPatientDto.walker_len,
            hip_width: createPatientDto.hip_width,
            flexos_hip: createPatientDto.flexos_hip,
            flexos_knee: createPatientDto.flexos_knee,
            abd: createPatientDto.abd,
            corset: createPatientDto.corset,
            ankle_lock: createPatientDto.ankle_lock,
            u_id: user.u_id,
          },
        });

        // Datos del paciente
        await prisma.patient_data.create({
          data: {
            p_id: createPatientDto.p_id,
            name: createPatientDto.name,
            surnames: createPatientDto.surnames,
            legal_guardian_email_1: createPatientDto.legal_guardian_email_1,
            legal_guardian_email_2: createPatientDto.legal_guardian_email_2,
            phone: createPatientDto.phone,
            legal_guardian_name_1: createPatientDto.legal_guardian_name_1,
            legal_guardian_name_2: createPatientDto.legal_guardian_name_2,
          },
        });

        // Crear relaciones con organizaciones
        if (createPatientDto.o_ids && createPatientDto.o_ids.length > 0) {
          await Promise.all(
            createPatientDto.o_ids.map((o_id) =>
              prisma.organization_has_patient.create({
                data: {
                  o_id: o_id,
                  p_id: createPatientDto.p_id,
                },
              })
            )
          );
        }
      });

      return createPatientDto;
    } catch (error) {
      throw new HttpException(
        `Error al crear el paciente y sus datos asociados: ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
    user: UserTokenDto
  ) {
    try {
      await prisma.$transaction(async (prisma) => {
        const configPatient = await prisma.config_patient.findUnique({
          where: { p_id: id },
        });

        if (!configPatient) {
          throw new HttpException(
            'Paciente no encontrado',
            HttpStatus.NOT_FOUND
          );
        }

        if (updatePatientDto.version <= configPatient.version) {
          throw new HttpException(
            'La versión proporcionada es menor o igual a la versión actual. Por favor, verifica e intenta de nuevo.',
            HttpStatus.BAD_REQUEST
          );
        }

        const patientUpdateData = {
          sex: updatePatientDto.sex,
          birth_date: updatePatientDto.birth_date
            ? new Date(updatePatientDto.birth_date)
            : undefined,
          city: updatePatientDto.city,
          nationality: updatePatientDto.nationality,
          pathology: updatePatientDto.pathology,
          treatment: updatePatientDto.treatment,
          affection: updatePatientDto.affectation,
        };

        await prisma.patients.update({
          where: { p_id: id },
          data: this.cleanUndefined(patientUpdateData),
        });

        const configPatientUpdateData = {
          version: updatePatientDto.version,
          weight: updatePatientDto.weight,
          height: updatePatientDto.height,
          chest_size: updatePatientDto.chest_size,
          shoe_size: updatePatientDto.shoe_size,
          femur_len_r: updatePatientDto.femur_len_r,
          femur_len_l: updatePatientDto.femur_len_l,
          tibia_len_r: updatePatientDto.tibia_len_r,
          tibia_len_l: updatePatientDto.tibia_len_l,
          walker_len: updatePatientDto.walker_len,
          hip_width: updatePatientDto.hip_width,
          flexos_hip: updatePatientDto.flexos_hip,
          flexos_knee: updatePatientDto.flexos_knee,
          abd: updatePatientDto.abd,
          corset: updatePatientDto.corset,
          ankle_lock: updatePatientDto.ankle_lock,
          u_id: user.u_id,
        };

        await prisma.config_patient.update({
          where: { p_id: id },
          data: this.cleanUndefined(configPatientUpdateData),
        });

        const patientDataUpdateData = {
          name: updatePatientDto.name,
          surnames: updatePatientDto.surnames,
          legal_guardian_email_1: updatePatientDto.legal_guardian_email_1,
          legal_guardian_email_2: updatePatientDto.legal_guardian_email_2,
          phone: updatePatientDto.phone,
          legal_guardian_name_1: updatePatientDto.legal_guardian_name_1,
          legal_guardian_name_2: updatePatientDto.legal_guardian_name_2,
        };

        await prisma.patient_data.update({
          where: { p_id: id },
          data: this.cleanUndefined(patientDataUpdateData),
        });

        if (updatePatientDto.o_ids) {
          if (updatePatientDto.o_ids.length === 0) {
            await prisma.organization_has_patient.deleteMany({
              where: { p_id: id },
            });
          } else {
            await prisma.organization_has_patient.deleteMany({
              where: { p_id: id },
            });

            await Promise.all(
              updatePatientDto.o_ids.map((o_id) =>
                prisma.organization_has_patient.create({
                  data: {
                    p_id: id,
                    o_id: o_id,
                  },
                })
              )
            );
          }
        }
      });
      return updatePatientDto;
    } catch (error) {
      throw new HttpException(
        `Paciente no actualizado: ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async remove(id: string) {
    try {
      const transaction = await prisma.$transaction([
        prisma.organization_has_patient.deleteMany({
          where: { p_id: id },
        }),
        prisma.config_patient.delete({
          where: { p_id: id },
        }),
        prisma.patient_data.delete({
          where: { p_id: id },
        }),
        prisma.patients.delete({
          where: { p_id: id },
        }),
      ]);

      return transaction[1];
    } catch (error) {
      throw new HttpException(
        `Error al eliminar el paciente: ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async findAll(user): Promise<PatientTable[]> {
    const userOId = user.o_id;
    const userRole = user.role;

    let patientIds = [];

    if (userRole !== 'admin') {
      const organizationPatients =
        await prisma.organization_has_patient.findMany({
          where: {
            o_id: userOId,
          },
          select: {
            p_id: true,
          },
        });

      patientIds = organizationPatients.map((op) => op.p_id);
    }

    const patients = await prisma.patients.findMany({
      where: {
        ...(patientIds.length > 0 && { p_id: { in: patientIds } }),
      },
      select: {
        p_id: true,
        last_session: true,
        total_sessions: true,
        total_steps: true,
        organization_has_patient: {
          select: {
            organizations: {
              select: {
                name: true,
                o_id: true,
              },
            },
          },
        },
      },
    });

    if (patients.length === 0) {
      throw new NotFoundException('No se encontró el paciente.');
    }

    const patientDataResults = await prisma.patient_data.findMany();
    const patientDataMap = patientDataResults.reduce((acc, data) => {
      acc[data.p_id] = data;
      return acc;
    }, {});

    const patientTableData = patients.map((patient) => {
      const data = patientDataMap[patient.p_id];
      return {
        p_id: patient.p_id,
        name: data?.name ?? 'Desconocido',
        surnames: data?.surnames ?? 'Desconocido',
        institutions: patient.organization_has_patient.map(
          (orgPatient) => orgPatient.organizations.name
        ),
        total_session: patient.total_sessions,
        last_session: patient.last_session,
        total_steps: patient.total_steps,
      };
    });

    return patientTableData;
  }

  async findOne(id: string, user): Promise<PatientView> {
    if (user.role !== 'admin') {
      const orgPatient = await prisma.organization_has_patient.findFirst({
        where: {
          p_id: id,
          o_id: user.o_id,
        },
      });

      if (!orgPatient) {
        throw new NotFoundException(
          'El paciente no pertenece a su organización.'
        );
      }
    }

    const patient = await prisma.patients.findUnique({
      where: { p_id: id },
      include: {
        patient_data: true,
        config_patient: true,
        organization_has_patient: {
          include: {
            organizations: true,
          },
        },
      },
    });

    if (!patient) {
      throw new NotFoundException('No se encontró el paciente.');
    }

    const sessions = await prisma.sessions.findMany({
      where: { p_id: id },
    });

    const processedSessions = processSessions(sessions);

    // Construir PatientView a partir de los datos recopilados
    const patientView: PatientView = {
      birth_date: patient.birth_date,
      sex: patient.sex,
      pathology: patient.pathology,
      affectation: patient.affection,
      treatment: patient.treatment,
      city: patient.city,
      nationality: patient.nationality,
      o_ids: patient.organization_has_patient.map(
        (ophp) => ophp.organizations.o_id
      ),
      ...patient.patient_data,
      ...patient.config_patient,
      weight_unit: patient.config_patient?.weight_units ?? 'kg',
      height_unit: patient.config_patient?.height_units ?? 'cm',
      sessions: processedSessions as Session[],
      corset: patient.config_patient?.corset,
      ankle_lock: patient.config_patient?.ankle_lock,
    };

    return patientView;
  }

  async findAllConfig(user): Promise<PatientDto[]> {
    // Inicializa una variable para el where condicional basado en el rol
    let whereCondition = {};

    // Si el usuario no es 'marsinet', filtra por su organización
    if (user.role !== 'admin') {
      whereCondition = {
        organization_has_patient: {
          some: {
            o_id: user.o_id,
          },
        },
      };
    }

    const patients = await prisma.patients.findMany({
      where: whereCondition, // Usa la condición aquí
      include: {
        config_patient: true,
        patient_data: true,
        organization_has_patient: {
          select: {
            organizations: {
              select: {
                o_id: true,
              },
            },
          },
        },
      },
    });

    if (!patients.length) {
      throw new NotFoundException('No se encontraron pacientes.');
    }

    const patientConfigs = patients.map((patient) => ({
      p_id: patient.p_id,
      birth_date: patient.birth_date,
      sex: patient.sex,
      pathology: patient.pathology,
      affectation: patient.affection,
      treatment: patient.treatment,
      city: patient.city,
      nationality: patient.nationality,
      name: patient.patient_data?.name ?? '',
      surnames: patient.patient_data?.surnames ?? '',
      phone: patient.patient_data?.phone ?? '',
      legal_guardian_email_1:
        patient.patient_data?.legal_guardian_email_1 ?? '',
      legal_guardian_email_2:
        patient.patient_data?.legal_guardian_email_2 ?? '',
      legal_guardian_name_1: patient.patient_data?.legal_guardian_name_1,
      legal_guardian_name_2: patient.patient_data?.legal_guardian_name_2,
      weight: patient.config_patient?.weight ?? 0,
      height: patient.config_patient?.height ?? 0,
      weight_unit: patient.config_patient?.weight_units ?? 'kg',
      height_unit: patient.config_patient?.height_units ?? 'cm',
      shoe_size: patient.config_patient?.shoe_size ?? 0,
      femur_len_r: patient.config_patient?.femur_len_r ?? 0,
      femur_len_l: patient.config_patient?.femur_len_l ?? 0,
      tibia_len_r: patient.config_patient?.tibia_len_r ?? 0,
      tibia_len_l: patient.config_patient?.tibia_len_l ?? 0,
      walker_len: patient.config_patient?.walker_len ?? 0,
      hip_width: patient.config_patient?.hip_width ?? 0,
      chest_size: patient.config_patient?.chest_size ?? '',
      flexos_hip: patient.config_patient?.flexos_hip ?? 0,
      flexos_knee: patient.config_patient?.flexos_knee ?? 0,
      abd: patient.config_patient?.abd ?? 0,
      corset: patient.config_patient?.corset,
      ankle_lock: patient.config_patient?.ankle_lock,
      user_id: patient.config_patient?.u_id ?? null,
      version: patient.config_patient?.version ?? 1,
      o_ids: patient.organization_has_patient.map(
        (orgPatient) => orgPatient.organizations.o_id
      ),
    }));
    return patientConfigs;
  }

  async addPatientToOrganization(dto: AddPatientDTO) {
    try {
      const patient = await prisma.patients.findUnique({
        where: { p_id: dto.p_id },
      });

      if (!patient) {
        throw new NotFoundException('Patient not found.');
      }

      const emails = [dto.email1];
      if (dto.email2) emails.push(dto.email2);

      for (const email of emails) {
        const organization = await prisma.user.findUnique({
          where: { email: email },
          include: {
            organizations: true,
          },
        });

        if (!organization.organizations) {
          throw new NotFoundException('Organization not found.');
        }

        // Check if the relationship already exists
        const existingRelation =
          await prisma.organization_has_patient.findFirst({
            where: {
              o_id: organization.o_id,
              p_id: patient.p_id,
            },
          });

        if (!existingRelation) {
          await prisma.organization_has_patient.create({
            data: {
              p_id: patient.p_id,
              o_id: organization.o_id,
            },
          });
        }
      }

      return true;
    } catch (error) {
      throw new HttpException(
        `Error al agregar el paciente a la organización: ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async syncPatientsWithOrganization(user: UserTokenDto, dto: emailsDTO) {
    try {
      const emails = [dto.email1];
      if (dto.email2) emails.push(dto.email2);

      for (const email of emails) {
        const organization = await prisma.user.findUnique({
          where: { email: email },
          include: {
            organizations: true,
          },
        });

        if (!organization.organizations) {
          throw new NotFoundException('Organization not found.');
        }

        const patients = await prisma.patients.findMany({
          where: {
            organization_has_patient: {
              none: {
                o_id: organization.o_id,
              },
            },
          },
        });

        for (const patient of patients) {
          const existingRelation =
            await prisma.organization_has_patient.findFirst({
              where: {
                o_id: organization.o_id,
                p_id: patient.p_id,
              },
            });

          if (!existingRelation) {
            await prisma.organization_has_patient.create({
              data: {
                p_id: patient.p_id,
                o_id: organization.o_id,
              },
            });
          }
        }

        console.log('Patients synced with organization');
      }

      return true;
    } catch (error) {
      throw new HttpException(
        `Error al sincronizar los pacientes con la organización: ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async removePatientFromOrganization(dto: RemovePatientOrgDTO) {
    try {
      const patient = await prisma.patients.findUnique({
        where: { p_id: dto.p_id },
      });

      if (!patient) {
        throw new NotFoundException('Patient not found.');
      }

      const organization = await prisma.organizations.findUnique({
        where: { o_id: dto.o_id },
      });

      if (!organization) {
        throw new NotFoundException('Organization not found.');
      }

      await prisma.organization_has_patient.deleteMany({
        where: {
          p_id: dto.p_id,
          o_id: dto.o_id,
        },
      });

      return true;
    } catch (error) {
      throw new HttpException(
        `Error al eliminar el paciente de la organización: ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
