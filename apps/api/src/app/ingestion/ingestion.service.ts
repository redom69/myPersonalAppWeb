/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@mypaw/server';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as checkVersion from '../../utils/checkVersion.js';
import { BlobServiceClient } from '@azure/storage-blob';
import { JsonObject } from '@prisma/client/runtime/library.js';
import Papa from 'papaparse';
import ADMZip from 'adm-zip';
import { UserTokenDto } from '../my-account/dto/dto';
import archiver from 'archiver';
import * as fs from 'fs';
import * as path from 'path';

enum Corset {
  smallFlat = 'Small Flat',
  smallCurve = 'Small Curve',
  bigFlat = 'Big Flat',
  bigCurve = 'Big Curve',
}

@Injectable()
export class IngestionService {
  private azureStorageConnectionString =
    process.env.azureStorageConnectionString;
  private containerName = 'ingestion-csv-data';

  private async getBlobContentAsBuffer(blobName: string): Promise<Buffer> {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      this.azureStorageConnectionString
    );
    const containerClient = blobServiceClient.getContainerClient(
      this.containerName
    );
    try {
      const blobClient = containerClient.getBlobClient(blobName);

      const downloadBlockBlobResponse = await blobClient.download(0);

      const content = await this.streamToBuffer(
        downloadBlockBlobResponse.readableStreamBody
      );

      return content;
    } catch (error) {
      throw new HttpException(
        'Access Denied or Blob Not Found',
        HttpStatus.NOT_FOUND
      );
    }
  }

  public async downloadAndUnzipFiles(prefix: string): Promise<void> {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      this.azureStorageConnectionString
    );
    const containerClient = blobServiceClient.getContainerClient(
      this.containerName
    );

    try {
      const blobNames: string[] = [];

      for await (const blob of containerClient.listBlobsFlat({ prefix })) {
        blobNames.push(blob.name);
      }

      if (blobNames.length === 0) {
        throw new Error('No files found for the given date.');
      }

      const outputFolder = path.join('/Users/daniel-hdez/Documents', prefix);

      if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
      }

      for (const blobName of blobNames) {
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const downloadBlockBlobResponse = await blockBlobClient.download(0);

        const fileBuffer = await this.streamToBuffer(
          downloadBlockBlobResponse.readableStreamBody
        );

        const zip = new ADMZip(fileBuffer);
        const zipEntries = zip.getEntries();

        zipEntries.forEach((zipEntry) => {
          const filePath = path.join(outputFolder, zipEntry.entryName);
          fs.writeFileSync(filePath, zipEntry.getData());
        });
      }
    } catch (error) {
      console.error('Error al descargar y descomprimir los archivos', error);
      throw new Error('Error al descargar y descomprimir los archivos');
    }
  }

  private async streamToBuffer(readableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readableStream.on('data', (data) => {
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
      });
      readableStream.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream.on('error', reject);
    });
  }

  async remove(id: string): Promise<void> {
    const ingetsion = await prisma.ingestion.delete({
      where: { id },
    });

    if (!ingetsion) {
      throw new HttpException('Ingestion not found', HttpStatus.NOT_FOUND);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async upload(file: Express.Multer.File, user: UserTokenDto): Promise<any> {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      this.azureStorageConnectionString
    );
    const containerClient = blobServiceClient.getContainerClient(
      this.containerName
    );

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    await this.uploadBlob(containerClient, file.originalname, file);
    await delay(1000);

    const ingest = await prisma.ingestion.create({
      data: {
        u_id: user.u_id,
        zip_data: file.originalname,
        process: false,
        is_session: false,
        d_id: null,
      },
    });

    return {
      message: `Archivos subidos exitosamente`,
      ingest_id: ingest.id,
      comprimido: file.originalname,
    };
  }

  async downloadFile(compressedFile: string, res: any) {
    try {
      if (!compressedFile) {
        throw new HttpException('File is required.', HttpStatus.BAD_REQUEST);
      }
      const file = await this.getBlobContentAsBuffer(compressedFile);
      if (!file) {
        throw new HttpException('File not found.', HttpStatus.NOT_FOUND);
      }
      res.setHeader('Content-Type', 'application/zip');
      res.send(file);
      res.end();
    } catch (error) {
      console.error('Error al descargar el archivo', error);
      throw new HttpException(
        'Error al descargar el archivo',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Asynchronously downloads multiple files and returns them in a compressed zip format.
   *
   * @param fileNames Array of file names to download.
   * @returns A zip file containing all requested files.
   * @throws {HttpException} Throws an HttpException if input validation fails or if there is an internal server error.
   */
  async downloadMultipleFiles(fileNames: string[], res: any) {
    if (!fileNames.length) {
      throw new HttpException('Files are required.', HttpStatus.BAD_REQUEST);
    }

    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    });

    archive.pipe(res);

    res.setHeader('Content-Type', 'application/zip');

    archive.on('error', (err) => {
      console.error('Error with archiving:', err);
      throw new HttpException(
        'Error while archiving files.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    });

    try {
      for (const fileName of fileNames) {
        const fileBuffer = await this.getBlobContentAsBuffer(fileName);
        if (fileBuffer) {
          archive.append(fileBuffer, { name: fileName });
        }
      }

      await archive.finalize();
    } catch (error) {
      console.error('Error retrieving file or during archiving:', error);
      throw new HttpException(
        'Error while archiving files.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async processCompressedFile(compressedFile: string, ingest_id: any) {
    let error_msg = 'Ingestion no procesada';

    const file = await this.getBlobContentAsBuffer(compressedFile);

    try {
      const zip = new ADMZip(file);
      const zipEntries = zip.getEntries();

      let json_file = '';
      let csv_file = '';

      if (zipEntries.length !== 2) {
        error_msg = 'The zip file must contain a JSON and a CSV file';
        await prisma.ingestion.update({
          where: { id: ingest_id },
          data: {
            error_msg: error_msg,
          },
        });
        throw new HttpException(error_msg, HttpStatus.BAD_REQUEST);
      }

      zipEntries.forEach(async (zipEntry) => {
        const fileName = zipEntry.entryName;
        const fileContent = zipEntry.getData().toString('utf8');
        if (fileName.endsWith('.csv') && fileName.includes('data')) {
          csv_file = fileContent;
        } else if (fileName.endsWith('.json') && fileName.includes('head')) {
          json_file = fileContent;
        }
      });

      const { espSoftwareVersion, device_id, patient_id } =
        await this.processJsonFromBlob(json_file);

      const sessionData: any = await processCsvContentInReverse(csv_file);

      addAlarms(sessionData.alarms, espSoftwareVersion, ingest_id);

      if (!sessionData) {
        error_msg = 'No se ha procesado bien el archivo';

        await prisma.ingestion.update({
          where: { id: ingest_id },
          data: {
            error_msg: error_msg,
            process: false,
            is_session: false,
            d_id: device_id?.toString() || null,
          },
        });

        throw new HttpException(error_msg, HttpStatus.BAD_REQUEST);
      }

      if (!device_id && !patient_id) {
        await prisma.ingestion.update({
          where: { id: ingest_id },
          data: {
            process: false,
            error_msg: 'Missing device ID and patient ID',
            d_id: device_id?.toString() || null,
          },
        });
        throw new HttpException(
          'Missing device ID and patient ID',
          HttpStatus.BAD_REQUEST
        );
      }

      if (!device_id) {
        await prisma.ingestion.update({
          where: { id: ingest_id },
          data: {
            process: false,
            error_msg: 'Device ID not found in JSON',
            d_id: device_id?.toString() || null,
          },
        });
        throw new HttpException(
          'Device ID not found in JSON',
          HttpStatus.BAD_REQUEST
        );
      }

      if (!patient_id) {
        await prisma.ingestion.update({
          where: { id: ingest_id },
          data: {
            process: false,
            error_msg: 'Patient ID not found in JSON',
            d_id: device_id?.toString() || null,
          },
        });
        throw new HttpException(
          'Patient ID not found in JSON',
          HttpStatus.BAD_REQUEST
        );
      }

      const hasDeviceFlag = await hasDevice(device_id.toString());
      const hasPatientFlag = await hasPatient(patient_id.toString());

      if (!hasDeviceFlag) {
        await prisma.ingestion.update({
          where: { id: ingest_id },
          data: {
            process: false,
            error_msg: 'Device not found in database',
            d_id: device_id?.toString() || null,
          },
        });
        throw new HttpException('Device not found', HttpStatus.NOT_FOUND);
      }

      if (!hasPatientFlag) {
        await prisma.ingestion.update({
          where: { id: ingest_id },
          data: {
            process: false,
            error_msg: 'Patient not found in database',
            d_id: device_id?.toString() || null,
          },
        });
        throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
      }

      if (ingest_id.u_id !== null) {
        const user = await prisma.user.findFirst({
          where: {
            u_id: ingest_id.u_id,
          },
        });

        addDeviceToOrganization(device_id.toString(), user.o_id);
      }

      const existingDevice = await prisma.devices.findUnique({
        where: {
          d_id: device_id.toString(),
        },
        select: {
          structure_version: true,
        },
      });

      const currentVersion = existingDevice.structure_version;

      if (
        checkVersion.isVersionGreaterThan(espSoftwareVersion, currentVersion)
      ) {
        await prisma.devices.update({
          where: {
            d_id: device_id.toString(),
          },
          data: {
            structure_version: String(espSoftwareVersion),
          },
        });
      }

      let sessionId = null;

      if (sessionData.isSession) {
        // Create sesion
        const session = await prisma.sessions.create({
          data: {
            end_time: sessionData.date.timeLast,
            cadence_automatic_backward:
              sessionData.totalSteps.autobwd !== undefined
                ? Math.round(sessionData.totalSteps.autobwd.averageCadencia)
                : 0,
            cadence_intention_forward:
              sessionData.totalSteps.intfwd !== undefined
                ? Math.round(sessionData.totalSteps.intfwd.averageCadencia)
                : 0,
            cadence_automatic_forward:
              sessionData.totalSteps.autofwd !== undefined
                ? Math.round(sessionData.totalSteps.autofwd.averageCadencia)
                : 0,

            cadence_intention_backward:
              sessionData.totalSteps.intbwd !== undefined
                ? Math.round(sessionData.totalSteps.intbwd.averageCadencia)
                : 0,
            time_total: Math.round(sessionData.tiempoMotor.totalTimeSession),
            steps_total: sessionData.totalSteps.total,
            d_id: device_id.toString(),
            p_id: patient_id.toString(),
            start_time: sessionData.date.tiempoInicial,
            steps_automatic_backward:
              sessionData.totalSteps.autobwd !== undefined
                ? sessionData.totalSteps.autobwd.steps
                : 0,
            steps_intention_backward:
              sessionData.totalSteps.intbwd !== undefined
                ? sessionData.totalSteps.intbwd.steps
                : 0,
            steps_automatic_forward:
              sessionData.totalSteps.autofwd !== undefined
                ? sessionData.totalSteps.autofwd.steps
                : 0,
            steps_intention_forward:
              sessionData.totalSteps.intfwd !== undefined
                ? sessionData.totalSteps.intfwd.steps
                : 0,

            time_automatic_backward:
              sessionData.totalSteps.autobwd !== undefined
                ? Math.round(sessionData.totalSteps.autobwd.time)
                : 0,
            time_intention_backward:
              sessionData.totalSteps.intbwd !== undefined
                ? Math.round(sessionData.totalSteps.intbwd.time)
                : 0,
            time_automatic_forward:
              sessionData.totalSteps.autofwd !== undefined
                ? Math.round(sessionData.totalSteps.autofwd.time)
                : 0,
            time_intentiton_forward:
              sessionData.totalSteps.intfwd !== undefined
                ? Math.round(sessionData.totalSteps.intfwd.time)
                : 0,

            date: sessionData.date.tiempoInicial,
            flexos_ankle:
              sessionData.flexors.flexos_ankle !== undefined
                ? sessionData.flexors.flexos_ankle
                : 0,
            flexos_hip:
              sessionData.flexors.flexos_hip !== undefined
                ? sessionData.flexors.flexos_hip
                : 0,
            flexos_knee:
              sessionData.flexors.flexos_knee !== undefined
                ? sessionData.flexors.flexos_knee
                : 0,
            effort:
              sessionData.evaluationData.effort !== undefined
                ? sessionData.evaluationData.effort
                : 0,
            threshold_hipl:
              sessionData.intentionThreshold.hipFlexL !== undefined
                ? sessionData.intentionThreshold.hipFlexL
                : 0,
            threshold_kneel:
              sessionData.intentionThreshold.kneeFlexL !== undefined
                ? sessionData.intentionThreshold.kneeFlexL
                : 0,
            threshold_hipr:
              sessionData.intentionThreshold.hipFlexR !== undefined
                ? sessionData.intentionThreshold.hipFlexR
                : 0,
            threshold_kneer:
              sessionData.intentionThreshold.kneeFlexR !== undefined
                ? sessionData.intentionThreshold.kneeFlexR
                : 0,
            threshold_anklel:
              sessionData.intentionThreshold.ankleFlexL !== undefined
                ? sessionData.intentionThreshold.ankleFlexL
                : 0,
            threshold_ankler:
              sessionData.intentionThreshold.ankleFlexR !== undefined
                ? sessionData.intentionThreshold.ankleFlexR
                : 0,
            has_chest:
              sessionData.evaluationData.hasChest !== undefined
                ? sessionData.evaluationData.hasChest
                : 0,
            timeWalking: sessionData.tiempoMotor.timeWalking,
            timeUse: sessionData.tiempoMotor.timeOfUse,
            timeSession: sessionData.tiempoMotor.timeOfSession,
            evaluation: parseInt(getEval(sessionData)),
          },
        });

        sessionId = session.id;

        // Get all sessions from patient
        const sessions = await prisma.sessions.findMany({
          where: {
            p_id: patient_id.toString(),
          },
          orderBy: {
            date: 'asc',
          },
        });

        const uniqueSessionDates = new Set();

        sessions.forEach((session) => {
          const datePart = session.date.toISOString().split('T')[0];
          uniqueSessionDates.add(datePart);
        });

        const numberOfUniqueSessionDays = uniqueSessionDates.size;

        // Calculate total steps
        const totalsteps = await prisma.patients.findUnique({
          where: {
            p_id: patient_id.toString(),
          },
          select: {
            total_steps: true,
          },
        });

        //Assign new session to patient
        await prisma.patients.update({
          where: {
            p_id: patient_id.toString(),
          },
          data: {
            total_sessions: numberOfUniqueSessionDays,
            last_session: sessionData ? sessionData.date.tiempoInicial : null,
            total_steps: sessionData
              ? sessionData.totalSteps.total + totalsteps.total_steps
              : totalsteps.total_steps,
          },
        });
        console.log(colorize('Session created', 32, true));
      }

      await prisma.ingestion.update({
        where: { id: ingest_id },
        data: {
          process: true,
          is_session: true,
          error_msg: null,
          d_id: device_id.toString(),
          session_id: sessionId || null,
        },
      });
    } catch (error) {
      await prisma.ingestion.update({
        where: { id: ingest_id },
        data: {
          process: false,
          error_msg:
            error.message || 'Error desconocido al procesar el archivo',
          d_id: null,
        },
      });
      throw new HttpException(
        `Error interno: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return { process: true };
  }

  private async uploadBlob(
    containerClient,
    blobName: string,
    file: Express.Multer.File
  ): Promise<void> {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(file.buffer);
  }

  async processJsonFromBlob(jsonContent: string): Promise<JsonObject> {
    try {
      const jsonObject = JSON.parse(jsonContent);

      let espSoftwareVersion = '';

      const espComponent = jsonObject.components.find(
        (component) => component.name === 'esp'
      );
      if (espComponent) {
        espSoftwareVersion = espComponent.software_version.toString();
      }

      return {
        espSoftwareVersion,
        device_id: jsonObject.device_id,
        patient_id: jsonObject.patient_id,
      };
    } catch (error) {
      throw new HttpException(
        'Error al procesar el JSON',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async findAll(
    user: UserTokenDto,
    page = 1,
    pageSize = 10,
    search?: string
  ): Promise<any> {
    const skip = (page - 1) * pageSize;

    // Construir la cláusula where para zip_data
    const zipDataClause = search
      ? {
          zip_data: {
            contains: search,
          },
        }
      : {};

    // Encontrar d_ids relevantes en caso de búsqueda por serial
    let deviceIds: string[] = [];
    if (search) {
      const devices = await prisma.devices.findMany({
        where: {
          serial: {
            contains: search.toLowerCase(),
            mode: 'insensitive',
          },
        },
        select: {
          d_id: true,
        },
      });
      deviceIds = devices.map((device) => device.d_id);
    }

    // Obtener los d_id asociados a la organización del usuario si el rol no es 'admin'
    let organizationDeviceIds: string[] = [];
    if (user.role !== 'admin') {
      organizationDeviceIds = await prisma.organization_has_device
        .findMany({
          where: {
            o_id: user.o_id,
          },
          select: {
            d_id: true,
          },
        })
        .then((records) => records.map((record) => record.d_id));
    }

    // Construir la cláusula where para d_id basada en los dispositivos de la organización
    const dIdClause =
      user.role !== 'admin'
        ? {
            d_id: {
              in: organizationDeviceIds.map((d_id) => d_id.toLowerCase()),
            },
          }
        : {};

    // Combinar ambas cláusulas where
    const combinedWhereClause = search
      ? {
          OR: [
            zipDataClause,
            {
              d_id: {
                in: deviceIds.map((d_id) => d_id.toLowerCase()),
              },
            },
          ],
        }
      : dIdClause;

    // Obtener todos los registros que coinciden con los criterios de búsqueda
    const allIngestions = await prisma.ingestion.findMany({
      where: combinedWhereClause,
      orderBy: {
        created_at: 'desc',
      },
      include: {
        sessions_ingestion_session_idTosessions: {
          select: {
            p_id: true,
            id: true,
          },
        },
      },
    });

    // Función para extraer y comparar la parte de la fecha y hora del zip_data
    const compareZipData = (a: string, b: string): number => {
      const extractDatePart = (zipData: string) => {
        let match = zipData.match(/(\d{8}-\d{6})\.zip$/); // 17062024-082136.zip
        if (!match) {
          match = zipData.match(/-(\d{8}-\d{6})\.zip$/); // -17062024-082136.zip
        }
        if (!match) {
          match = zipData.match(/\d{7}-(\d{8}-\d{6})\.zip$/); // 2400002-17062024-082136.zip
        }

        return match ? match[1] : '';
      };

      const dateA = extractDatePart(a);
      const dateB = extractDatePart(b);

      // Verificar si la parte de la fecha extraída no es vacía
      if (dateA === '' || dateB === '') {
        return 0; // Considerarlos iguales si alguno de los dos es inválido
      }

      const formatToDate = (dateStr: string) => {
        const [ddmmyy, hhmmss] = dateStr.split('-');
        const day = ddmmyy.substring(0, 2);
        const month = ddmmyy.substring(2, 4);
        const year = `20${ddmmyy.substring(4, 6)}`;
        const hours = hhmmss.substring(0, 2);
        const minutes = hhmmss.substring(2, 4);
        const seconds = hhmmss.substring(4, 6);
        return new Date(
          `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`
        );
      };

      const dateObjA = formatToDate(dateA);
      const dateObjB = formatToDate(dateB);

      return dateObjB.getTime() - dateObjA.getTime();
    };

    // Ordenar ingestions por zip_data usando la función de comparación personalizada
    allIngestions.sort((a, b) => compareZipData(a.zip_data, b.zip_data));

    // Obtener los p_id únicos de las sesiones
    const pIds = Array.from(
      new Set(
        allIngestions
          .flatMap((ingestion) =>
            ingestion.sessions_ingestion_session_idTosessions?.p_id
              ? [ingestion.sessions_ingestion_session_idTosessions.p_id]
              : []
          )
          .filter(Boolean)
      )
    );

    // Obtener los nombres de los pacientes
    const patients = await prisma.patient_data.findMany({
      where: {
        p_id: { in: pIds },
      },
      select: {
        p_id: true,
        name: true,
      },
    });

    // Crear un mapa de p_id a nombres de pacientes
    const patientMap = patients.reduce(
      (map, patient) => {
        map[patient.p_id] = patient.name ? patient.name : 'Unknown';
        return map;
      },
      {} as Record<string, string>
    );

    // Agregar el nombre del paciente a las ingestas y eliminar la clave sessions_ingestion_session_idTosessions
    const ingestionsWithPatientNames = allIngestions.map((ingestion) => {
      const session = ingestion.sessions_ingestion_session_idTosessions;
      return {
        ...ingestion,
        p_name: session ? patientMap[session.p_id] : null,
        session_id: session ? session.id : null,
        sessions_ingestion_session_idTosessions: undefined,
      };
    });

    // Calcular el total de registros y el total de páginas
    const totalRecords = ingestionsWithPatientNames.length;
    const totalPages = Math.ceil(totalRecords / pageSize);

    // Realizar la paginación en el conjunto completo filtrado y ordenado
    const paginatedIngestions = ingestionsWithPatientNames.slice(
      skip,
      skip + pageSize
    );

    return {
      data: paginatedIngestions,
      totalRecords,
      totalPages,
      currentPage: page,
      pageSize,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async findOne(id: string): Promise<any> {
    const ingestion = await prisma.ingestion.findUnique({
      where: { id },
    });

    if (!ingestion) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }

    const file = await this.getBlobContentAsBuffer(ingestion.zip_data);

    try {
      const zip = new ADMZip(file);
      const zipEntries = zip.getEntries();

      let csv_file = '';

      zipEntries.forEach(async (zipEntry) => {
        const fileName = zipEntry.entryName;
        const fileContent = zipEntry.getData().toString('utf8');
        if (fileName.endsWith('.csv') && fileName.includes('data')) {
          csv_file = fileContent;
        }
      });

      if (!csv_file) {
        throw new HttpException('File not found.', HttpStatus.NOT_FOUND);
      }
      const processedData = await processCsv(csv_file);
      return processedData;
    } catch (error) {
      console.error('Error processing the CSV file', error);
      throw new HttpException(
        'Error processing the CSV file',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

async function processCsvContentInReverse(csvData: string) {
  try {
    const results = Papa.parse(csvData, {
      header: true,
      delimiter: ',',
      dynamicTyping: true,
      skipEmptyLines: true,
    });

    let consolidatedEvaluationData = {};
    let consolidatedUserData = {};
    let prevState = null;
    const alarmsArray = [];
    const MotionMode = ['auto', 'int'];
    const WalkDirection = ['fwd', 'bwd'];
    let modeDirection = '';
    let timeConfigInit = null;
    let timeConfigEnd = null;
    const timeSession = { first: null, last: null };
    const timeUse = { first: null, last: null };

    let motorOnTime = 0; // Tiempo total con el motor encendido
    let motorOffTime = 0; // Tiempo total con el motor apagado
    let prevTimestamp = null; // Almacena el timestamp anterior
    let lastSessionStartTimestamp = null;
    let hipFlexL = Infinity;
    let hipFlexR = Infinity;
    let kneeFlexL = Infinity;
    let kneeFlexR = Infinity;
    let ankleFlexL = Infinity;
    let ankleFlexR = Infinity;
    let hipAbdL = Infinity;
    let hipAbdR = Infinity;
    let maxHipFlexLThreshold = -Infinity;
    let maxHipFlexRThreshold = -Infinity;
    let maxKneeFlexLThreshold = -Infinity;
    let maxKneeFlexRThreshold = -Infinity;
    let maxAnkleFlexLThreshold = -Infinity;
    let maxAnkleFlexRThreshold = -Infinity;

    const totalSteps: any = {
      total: 0,
    };
    let step = 0;

    const tiempoInicial =
      results.data.length > 0
        ? normalizeTimestamp(results.data[results.data.length - 1]['timestamp'])
        : null;

    const timeLast =
      results.data.length > 0
        ? normalizeTimestamp(results.data[0]['timestamp'])
        : null;

    results.data.reverse().forEach((row: any) => {
      const { evaluationData, userData } = getData(row);
      consolidatedEvaluationData = {
        ...consolidatedEvaluationData,
        ...evaluationData,
      };
      consolidatedUserData = { ...consolidatedUserData, ...userData };

      const timestamp = normalizeTimestamp(row['timestamp']);

      if (!lastSessionStartTimestamp && row['general.motors_en'] === 1) {
        lastSessionStartTimestamp = timestamp; // Capturar el timestamp de la primera instancia de motors_en = 1
      }

      if (row['general.steps_in_mode'] && row['general.steps_in_mode'] > step) {
        step = row['general.steps_in_mode'];
      }

      // Logica para el tiempo de session
      if (
        row['general.state'] === 1 ||
        row['general.state'] === 6 ||
        row['general.state'] === 7
      ) {
        if (timeSession.first === null) {
          timeSession.first = timestamp;
          timeSession.last = timestamp;
        }
        if (timeConfigInit === null) {
          timeConfigInit = timestamp;
        }
        timeConfigEnd = timestamp;
        timeSession.last = timestamp;
      }

      //Logica para el tiempo de uso 1 motor_en y ultimo motor_en = 1
      if (row['general.motors_en'] === 1) {
        if (timeUse.first === null) {
          timeUse.first = timestamp;
          timeUse.last = timestamp;
        }
        timeUse.last = timestamp;
      }

      // Suponiendo que getData también devuelve un objeto alarm con event_id y value
      if (row['alarm.event_id'] && row['alarm.value']) {
        alarmsArray.push({
          timestamp: timestamp,
          event_id: row['alarm.event_id'],
          value: row['alarm.value'],
        });
      }

      // Calcula el tiempo encendido/apagado
      const currentTimestamp = new Date(timestamp).getTime();

      if (prevTimestamp !== null) {
        const timeDiff = Math.abs(currentTimestamp - prevTimestamp); // Diferencia de tiempo en milisegundos

        if (prevState === 0) {
          // Si el estado anterior era apagado
          motorOffTime += timeDiff;
        } else if (prevState === 1) {
          // Si el estado anterior era encendido
          motorOnTime += timeDiff;
        }
      }

      prevState = row['general.motors_en'];
      prevTimestamp = currentTimestamp; // Actualiza el timestamp para la próxima iteración

      if (
        row['config_mode.mode'] !== undefined &&
        row['config_mode.mode'] !== null
      ) {
        modeDirection = `${MotionMode[row['config_mode.mode']]}${WalkDirection[row['config_mode.direction']]}`;

        let differenceMinutes = 0;
        if (timeConfigInit !== null && timeConfigEnd !== null) {
          // Convert both Date objects to milliseconds
          const timeConfigInitMs: number = new Date(timeConfigInit).getTime();
          const timeConfigEndMs: number = new Date(timeConfigEnd).getTime();

          // Calculate the difference in milliseconds
          const differenceMilliseconds: number =
            timeConfigInitMs - timeConfigEndMs;

          // Convert the difference to minutes
          differenceMinutes = differenceMilliseconds / 1000 / 60;
        } else {
          differenceMinutes = 0;
        }

        if (!(modeDirection in totalSteps)) {
          totalSteps[modeDirection] = {
            steps: step,
          };
          totalSteps.total += step;
        }
        totalSteps[modeDirection].time = !isNaN(totalSteps[modeDirection].time)
          ? differenceMinutes + totalSteps[modeDirection].time
          : differenceMinutes;

        step = 0;
        timeConfigInit = null;
        timeConfigEnd = null;
      }
      if (maxHipFlexLThreshold === -Infinity) maxHipFlexLThreshold = 0;
      if (maxHipFlexRThreshold === -Infinity) maxHipFlexRThreshold = 0;
      if (maxKneeFlexLThreshold === -Infinity) maxKneeFlexLThreshold = 0;
      if (maxKneeFlexRThreshold === -Infinity) maxKneeFlexRThreshold = 0;
      if (maxAnkleFlexLThreshold === -Infinity) maxAnkleFlexLThreshold = 0;
      if (maxAnkleFlexRThreshold === -Infinity) maxAnkleFlexRThreshold = 0;
      // Actualiza las variables si se encuentran valores más pequeños
      if (
        row['config_patient.flexors.hip_flex_L'] &&
        row['config_patient.flexors.hip_flex_L'] < hipFlexL
      ) {
        hipFlexL = row['config_patient.flexors.hip_flex_L'];
      }
      if (
        row['config_patient.flexors.hip_flex_R'] &&
        row['config_patient.flexors.hip_flex_R'] < hipFlexR
      ) {
        hipFlexR = row['config_patient.flexors.hip_flex_R'];
      }
      if (
        row['config_patient.flexors.knee_flex_L'] &&
        row['config_patient.flexors.knee_flex_L'] < kneeFlexL
      ) {
        kneeFlexL = row['config_patient.flexors.knee_flex_L'];
      }
      if (
        row['config_patient.flexors.knee_flex_R'] &&
        row['config_patient.flexors.knee_flex_R'] < kneeFlexR
      ) {
        kneeFlexR = row['config_patient.flexors.knee_flex_R'];
      }

      if (
        row['config_patient.flexors.ankle_flex_L'] &&
        row['config_patient.flexors.ankle_flex_L'] < ankleFlexL
      ) {
        ankleFlexL = row['config_patient.flexors.ankle_flex_L'];
      }
      if (
        row['config_patient.flexors.ankle_flex_R'] &&
        row['config_patient.flexors.ankle_flex_R'] < ankleFlexR
      ) {
        ankleFlexR = row['config_patient.flexors.ankle_flex_R'];
      }
      if (
        row['config_patient.flexors.hip_abd_L'] &&
        row['config_patient.flexors.hip_abd_L'] < hipAbdL
      ) {
        hipAbdL = row['config_patient.flexors.hip_abd_L'];
      }
      if (
        row['config_patient.flexors.hip_abd_R'] &&
        row['config_patient.flexors.hip_abd_R'] < hipAbdR
      ) {
        hipAbdR = row['config_patient.flexors.hip_abd_R'];
      }
    });

    if ('autofwd' in totalSteps) {
      totalSteps['autofwd'].averageCadencia =
        totalSteps['autofwd'].time > 0
          ? totalSteps['autofwd'].steps / totalSteps['autofwd'].time
          : 0;
      totalSteps['autofwd'].time = convertToMinutesAndSeconds(
        totalSteps['autofwd'].time
      );
    }
    if ('autobwd' in totalSteps) {
      totalSteps['autobwd'].averageCadencia =
        totalSteps['autobwd'].time > 0
          ? totalSteps['autobwd'].steps / totalSteps['autobwd'].time
          : 0;
      totalSteps['autobwd'].time = convertToMinutesAndSeconds(
        totalSteps['autobwd'].time
      );
    }
    if ('intfwd' in totalSteps) {
      totalSteps['intfwd'].averageCadencia =
        totalSteps['intfwd'].time > 0
          ? totalSteps['intfwd'].steps / totalSteps['intfwd'].time
          : 0;
      totalSteps['intfwd'].time = convertToMinutesAndSeconds(
        totalSteps['intfwd'].time
      );
    }
    if ('intbwd' in totalSteps) {
      totalSteps['intbwd'].averageCadencia =
        totalSteps['intbwd'].time > 0
          ? totalSteps['intbwd'].steps / totalSteps['intbwd'].time
          : 0;
      totalSteps['intbwd'].time = convertToMinutesAndSeconds(
        totalSteps['intbwd'].time
      );
    }

    motorOnTime = motorOnTime / 60000;
    motorOffTime = motorOffTime / 60000;
    if (hipFlexL === Infinity) hipFlexL = 0;
    if (hipFlexR === Infinity) hipFlexR = 0;
    if (kneeFlexL === Infinity) kneeFlexL = 0;
    if (kneeFlexR === Infinity) kneeFlexR = 0;
    if (ankleFlexL === Infinity) ankleFlexL = 0;
    if (ankleFlexR === Infinity) ankleFlexR = 0;
    if (hipAbdL === Infinity) hipAbdL = 0;
    if (hipAbdR === Infinity) hipAbdR = 0;
    if (maxHipFlexLThreshold === -Infinity) maxHipFlexLThreshold = 0;
    if (maxHipFlexRThreshold === -Infinity) maxHipFlexRThreshold = 0;
    if (maxKneeFlexLThreshold === -Infinity) maxKneeFlexLThreshold = 0;
    if (maxKneeFlexRThreshold === -Infinity) maxKneeFlexRThreshold = 0;
    if (maxAnkleFlexLThreshold === -Infinity) maxAnkleFlexLThreshold = 0;
    if (maxAnkleFlexRThreshold === -Infinity) maxAnkleFlexRThreshold = 0;

    if (!('autofwd' in totalSteps)) {
      totalSteps['autofwd'] = { steps: 0, time: 0, averageCadencia: 0 };
    }
    if (!('autobwd' in totalSteps)) {
      totalSteps['autobwd'] = { steps: 0, time: 0, averageCadencia: 0 };
    }
    if (!('intfwd' in totalSteps)) {
      totalSteps['intfwd'] = { steps: 0, time: 0, averageCadencia: 0 };
    }
    if (!('intbwd' in totalSteps)) {
      totalSteps['intbwd'] = { steps: 0, time: 0, averageCadencia: 0 };
    }
    console.log(totalSteps);

    return {
      totalSteps,
      intentionThreshold: {
        hipFlexL: maxHipFlexLThreshold,
        hipFlexR: maxHipFlexRThreshold,
        kneeFlexL: maxKneeFlexLThreshold,
        kneeFlexR: maxKneeFlexRThreshold,
        ankleFlexL: maxAnkleFlexLThreshold,
        ankleFlexR: maxAnkleFlexRThreshold,
      },
      evaluationData: consolidatedEvaluationData,
      user_data: consolidatedUserData,
      isSession: totalSteps.total > 0,
      alarms: alarmsArray,
      date: {
        tiempoInicial: new Date(tiempoInicial),
        timeLast: new Date(timeLast),
      },
      tiempoMotor: {
        timeOn: Math.abs(motorOnTime),
        timeOff: Math.abs(motorOffTime),
        totalTimeSession:
          Math.abs(
            Number(new Date(timeLast)) -
              Number(new Date(lastSessionStartTimestamp))
          ) / 60000,
        timeWalking:
          totalSteps['autofwd'].time +
          totalSteps['autobwd'].time +
          totalSteps['intfwd'].time +
          totalSteps['intbwd'].time,
        timeOfUse: Math.abs(motorOnTime),
        timeOfSession:
          (new Date(timeSession.first).getTime() -
            new Date(timeSession.last).getTime()) /
          1000 /
          60,
      },
      flexors: {
        hipAbdL: hipAbdL,
        hipAbdR: hipAbdR,
        hipFlexL: hipFlexL,
        hipFlexR: hipFlexR,
        kneeFlexL: kneeFlexL,
        kneeFlexR: kneeFlexR,
        ankleFlexL: ankleFlexL,
        ankleFlexR: ankleFlexR,
      },
    };
  } catch (error) {
    throw new HttpException(
      'Error al procesar el CSV',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

export async function processCsv(fileContent: string) {
  if (!fileContent) {
    throw new HttpException(
      'Error al procesar el CSV',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
  const results = Papa.parse(fileContent, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  if (results.data.length === 0) {
    throw new HttpException(
      'Error al procesar el CSV',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }

  const motorsAng = [];
  const sessionData = [];
  const batteryData = [];
  const motorVoltageData = [];
  const temperatureData = [];
  const torqueData = [];
  const config_patient = {};
  const motorsInt = [];
  const elevCtrl = [];
  const elevSens = [];
  const globalPosition = [];
  const energyMonitor = [];

  const transformRow = (row) => {
    const timestamp = getFormattedDate(
      new Date(normalizeTimestamp(row['timestamp']))
    );

    motorsAng.push({
      timestamp,
      motorsAngRef1: row['motors.motor1.ang_ref'] / 100,
      motorsAngRef2: row['motors.motor2.ang_ref'] / 100,
      motorsAngRef3: row['motors.motor3.ang_ref'] / 100,
      motorsAngRef4: row['motors.motor4.ang_ref'] / 100,
      motorsMotor1Mille: row['motors.motor1.ang_sens_1'] / 100,
      motorsMotor2Mille: row['motors.motor2.ang_sens_1'] / 100,
      motorsMotor3Mille: row['motors.motor3.ang_sens_1'] / 100,
      motorsMotor4Mille: row['motors.motor4.ang_sens_1'] / 100,
      motorsMotor1Orbis: row['motors.motor1.ang_sens_2'] / 100,
      motorsMotor2Orbis: row['motors.motor2.ang_sens_2'] / 100,
      motorsMotor3Orbis: row['motors.motor3.ang_sens_2'] / 100,
      motorsMotor4Orbis: row['motors.motor4.ang_sens_2'] / 100,
    });

    sessionData.push({
      timestamp,
      motorsEn: row['general.motors_en'],
      timeWalking: [1, 6, 7].includes(row['general.state']) ? 1 : 0,
    });

    batteryData.push({
      timestamp,
      capacity: row['general.battery'],
    });

    elevCtrl.push({
      timestamp,
      elevCtrl: row['general.elev_ctrl'],
    });

    elevSens.push({
      timestamp,
      elevSens: row['general.elev_sens'],
    });

    globalPosition.push({
      timestamp,
      globalPosition: row['general.global_position'],
    });

    energyMonitor.push({
      timestamp,
      energyMonitorExo: row['general.energy_monitors.exo'],
      energyMonitorWf: row['general.energy_monitors.wf'],
    });

    motorVoltageData.push({
      timestamp,
      current1: row['motors.motor1.curr'],
      current2: row['motors.motor2.curr'],
      current3: row['motors.motor3.curr'],
      current4: row['motors.motor4.curr'],
    });

    motorsInt.push({
      timestamp,
      motorsInt1: row['motors.motor1.intention'],
      motorsInt2: row['motors.motor2.intention'],
      motorsInt3: row['motors.motor3.intention'],
      motorsInt4: row['motors.motor4.intention'],
    });

    temperatureData.push({
      timestamp,
      motorTemperature1: row['motors.motor1.temp'] / 100,
      motorTemperature2: row['motors.motor2.temp'] / 100,
      motorTemperature3: row['motors.motor3.temp'] / 100,
      motorTemperature4: row['motors.motor4.temp'] / 100,
      environmentTemperature: row['general.temp_env'] / 100,
    });

    torqueData.push({
      timestamp,
      motorTorque1: row['motors.motor1.torque'] / 100,
      motorTorque2: row['motors.motor2.torque'] / 100,
      motorTorque3: row['motors.motor3.torque'] / 100,
      motorTorque4: row['motors.motor4.torque'] / 100,
    });

    config_patient['timestamp'] = timestamp;
    if (row['config_patient.height']) {
      Object.assign(config_patient, {
        height: row['config_patient.height'],
        weight: row['config_patient.weight'],
        shoe: row['config_patient.shoe_size'],
        femur_len_l: row['config_patient.femur_len_1'],
        tibia_len_l: row['config_patient.tibia_len_1'],
        ankle_len: row['config_patient.ankle_len'],
        walker_len: row['config_patient.walker_len'],
        hip_abd_l: row['config_patient.flexors.hip_abd_L'],
        hip_abd_r: row['config_patient.flexors.hip_abd_R'],
        flexor_hip_flex_l: row['config_patient.flexors.hip_flex_L'],
        flexor_hip_flex_r: row['config_patient.flexors.hip_flex_R'],
        flexor_knee_flex_l: row['config_patient.flexors.knee_flex_L'],
        flexor_knee_flex_r: row['config_patient.flexors.knee_flex_R'],
        flexor_ankle_flex_l: row['config_patient.flexors.ankle_flex_L'],
        flexor_ankle_flex_r: row['config_patient.flexors.ankle_flex_R'],
        corset: Corset[row['config_patient.corset']],
        anckle_lock: row['config_patient.anckle_lock'] === 1,
      });
    }
  };

  results.data.forEach(transformRow);

  return {
    motorsAng,
    sessionData,
    batteryData,
    motorVoltageData,
    temperatureData,
    torqueData,
    config_patient,
    motorsInt,
    elevCtrl,
    elevSens,
    globalPosition,
    energyMonitor,
  };
}

export async function hasPatient(id) {
  try {
    const response = await prisma.patients.findUnique({
      where: {
        p_id: id,
      },
    });

    return response !== null && response !== undefined;
  } catch (error) {
    return false;
  }
}

enum AlarmType {
  MNT = 0,
  WARNING = 1,
  ERROR = 2,
}
export async function addAlarms(alarms, version, ingestion_id) {
  try {
    for (const alarm of alarms) {
      let eventType: string;

      switch (alarm.event_id) {
        case AlarmType.MNT:
          eventType = 'MNT';
          break;
        case AlarmType.WARNING:
          eventType = 'WARNING';
          break;
        case AlarmType.ERROR:
          eventType = 'ERROR';
          break;
        default:
          eventType = 'UNKNOWN'; // Si no coincide con ningún caso, asignar un valor por defecto
          break;
      }

      await prisma.alarms.create({
        data: {
          timestamp: new Date(alarm.timestamp),
          value: alarm.value,
          event_id: String(alarm.event_id),
          event_type: eventType,
          version: String(version),
          params: {},
          i_id: ingestion_id,
        },
      });
    }
  } catch (error) {
    console.error('Error al agregar alarmas', error);
  }
}

export async function hasDevice(id) {
  try {
    const response = await prisma.devices.findUnique({
      where: {
        d_id: id,
      },
    });

    return response !== null && response !== undefined;
  } catch (error) {
    return false;
  }
}

async function addDeviceToOrganization(device_id, organization_id) {
  try {
    const existingRelation = await prisma.organization_has_device.findUnique({
      where: {
        o_id_d_id: {
          o_id: organization_id,
          d_id: device_id,
        },
      },
    });

    if (!existingRelation) {
      await prisma.organization_has_device.create({
        data: {
          o_id: organization_id,
          d_id: device_id,
        },
      });
    }
  } catch (error) {
    console.error('Error al agregar dispositivo a la organización:', error);
    throw error;
  }
}

export function getEval(sessionData) {
  /*    Cantidad de pasos en automático Delante 5,0%
        Detrás  5,0%
    Cantidad de pasos en intención  Delante 10,0%
      Detrás    10,0%
    Cadencia auto   Delante 5,0%
      Detrás    5,0%
    Cadencia intención  Delante 10,0%
      Detrás    10,0%
    Flexos**    Cadera  5,0%
      Rodilla   5,0%
    Umbral  Cadera dcha 2,5%
      Rodilla dcha  2,5%
      Cadera izda   2,5%
      Rodilla izda  2,5%
    Terapeuta   Peto/abdominal***   5,0%
      Esfuerzo/colaboración 15,0%
    */
  const stepsAutoFwd =
    sessionData.totalSteps.autofwd !== undefined
      ? sessionData.totalSteps.autofwd.steps * 0.05
      : 0;
  const stepsAutoBwd =
    sessionData.totalSteps.autobwd !== undefined
      ? sessionData.totalSteps.autobwd.steps * 0.05
      : 0;
  const stepsIntFwd =
    sessionData.totalSteps.intfwd !== undefined
      ? sessionData.totalSteps.intfwd.steps * 0.1
      : 0;
  const stepsIntBwd =
    sessionData.totalSteps.intbwd !== undefined
      ? sessionData.totalSteps.intbwd.steps * 0.1
      : 0;
  const cadenceAutoBwd =
    sessionData.totalSteps.autobwd !== undefined
      ? sessionData.totalSteps.autobwd.averageCadencia * 0.05
      : 0;
  const cadenceAutoFwd =
    sessionData.totalSteps.autofwd !== undefined
      ? sessionData.totalSteps.autofwd.averageCadencia * 0.05
      : 0;
  const cadenceIntBwd =
    sessionData.totalSteps.intbwd !== undefined
      ? sessionData.totalSteps.intbwd.averageCadencia * 0.1
      : 0;
  const cadenceIntFwd =
    sessionData.totalSteps.intfwd !== undefined
      ? sessionData.totalSteps.intfwd.averageCadencia * 0.1
      : 0;

  const flexosHip =
    sessionData.flexors.flexos_hip !== undefined
      ? sessionData.flexors.flexos_hip * 0.05
      : 0;

  const flexosKnee =
    sessionData.flexors.flexos_knee !== undefined
      ? sessionData.flexors.flexos_knee * 0.05
      : 0;
  const thresholdHipL =
    sessionData.intentionThreshold.hipFlexL !== undefined
      ? sessionData.intentionThreshold.hipFlexL * 0.025
      : 0;
  const thresholdKneeL =
    sessionData.intentionThreshold.kneeFlexL !== undefined
      ? sessionData.intentionThreshold.kneeFlexL * 0.025
      : 0;
  const thresholdHipR =
    sessionData.intentionThreshold.hipFlexR !== undefined
      ? sessionData.intentionThreshold.hipFlexR * 0.025
      : 0;
  const thresholdKneeR =
    sessionData.intentionThreshold.kneeFlexL !== undefined
      ? sessionData.intentionThreshold.kneeFlexR * 0.025
      : 0;
  const chest =
    sessionData.evaluationData.hasChest !== undefined
      ? sessionData.evaluationData.hasChest * 0.05
      : 0;
  const effort =
    sessionData.evaluationData.effort !== undefined
      ? sessionData.evaluationData.effort * 0.15
      : 0;

  return (
    stepsAutoFwd +
    stepsAutoBwd +
    stepsIntFwd +
    stepsIntBwd +
    cadenceAutoBwd +
    cadenceAutoFwd +
    cadenceIntBwd +
    cadenceIntFwd +
    flexosHip +
    flexosKnee +
    thresholdHipL +
    thresholdKneeL +
    thresholdHipR +
    thresholdKneeR +
    chest +
    effort
  ).toFixed(2);
}

export function getData(row: any): {
  evaluationData: any;
  userData: any;
} {
  let evaluationData = {};
  let userData = {};
  if (row['config_patient.height']) {
    userData = {
      height: row['config_patient.height'],
      weight: row['config_patient.weight'],
      hip_width: 0,
      shoe_size: row['config_patient.shoe_size'],
      femur_len_L: row['config_patient.femur_len_1'],
      femur_len_R: 0,
      tibia_len_L: row['config_patient.tibia_len_1'],
      tibia_len_R: 0,
      ankle_len_L: row['config_patient.ankle_len'],
      ankle_len_R: 0,
      walker_len: 0,
    };
  }
  if (row['evaluation_data.other_clinical_evaluations']) {
    const clinicEval =
      row['evaluation_data.other_clinical_evaluations'].split(';');

    evaluationData = {
      hasChest: parseInt(clinicEval[0]),
      effort: parseInt(clinicEval[1]),
    };
  }

  return { evaluationData, userData };
}

export function getFormattedDate(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export function convertToMinutesAndSeconds(decimalMinutes) {
  const minutes = Math.floor(decimalMinutes);
  const seconds = Math.round((decimalMinutes - minutes) * 60);

  return minutes + seconds / 60;
}

function normalizeTimestamp(timestamp: string | number): string {
  if (timestamp === undefined || timestamp === null) {
    return '';
  }

  const timestampStr = timestamp.toString();
  if (timestampStr.includes(':')) {
    return timestampStr;
  } else {
    return timestampStr.replace(/(\d\d)\.(\d\d)\.(\d\d)/, '$1:$2:$3');
  }
}

export function colorize(text, colorCode, bold = false) {
  const resetCode = '\x1b[0m';
  const boldCode = bold ? '\x1b[1m' : '';
  return `${boldCode}\x1b[${colorCode}m${text}${resetCode}`;
}
