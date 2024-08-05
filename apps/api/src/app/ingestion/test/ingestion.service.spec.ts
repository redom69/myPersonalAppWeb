/* eslint-disable @typescript-eslint/no-namespace */
import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Readable, Writable } from 'stream';
import * as ADMZip from 'adm-zip';

import { UserTokenDto } from '../../my-account/dto/dto';
import {
  addAlarms,
  colorize,
  convertToMinutesAndSeconds,
  getData,
  getEval,
  getFormattedDate,
  hasDevice,
  hasPatient,
  IngestionService,
  processCsv,
} from '../ingestion.service';

import { prisma } from '@marsinet/server';
import { BlobServiceClient } from '@azure/storage-blob';

jest.mock('@azure/storage-blob', () => ({
  BlobServiceClient: {
    fromConnectionString: jest.fn().mockReturnValue({
      getContainerClient: jest.fn().mockReturnValue({
        listBlobsFlat: jest.fn().mockImplementation(() => {
          return {
            [Symbol.asyncIterator]: async function* () {
              yield* [];
            },
          };
        }),
        getBlockBlobClient: jest.fn().mockReturnValue({
          download: jest.fn().mockResolvedValue({
            readableStreamBody: Readable.from(['mock buffer data']),
          }),
          uploadData: jest.fn(),
        }),
      }),
    }),
  },
}));

jest.mock('adm-zip', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getEntries: jest.fn().mockReturnValue([
        {
          entryName: 'data.csv',
          getData: jest
            .fn()
            .mockReturnValue(
              Buffer.from(
                'timestamp,general.motors_en,general.steps_in_mode\n1234567890,1,100'
              )
            ),
        },
        {
          entryName: 'head.json',
          getData: jest
            .fn()
            .mockReturnValue(
              Buffer.from(
                '{"device_id": "123", "patient_id": "456", "components": [{"name": "esp", "software_version": "1.0.0"}]}'
              )
            ),
        },
      ]),
    };
  });
});

jest.mock('fs');
jest.mock('@marsinet/server', () => ({
  prisma: {
    ingestion: {
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    sessions: {
      create: jest.fn(),
    },
    patients: {
      update: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    devices: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    organization_has_device: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    user: {
      findFirst: jest.fn(),
    },
    alarms: {
      create: jest.fn(),
    },
    patient_data: {
      findMany: jest.fn(),
    },
  },
}));

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        buffer: Buffer;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        stream: Readable;
        destination: string;
        filename: string;
        path: string;
        fieldname: string;
      }
    }
  }
}

describe('IngestionService', () => {
  let service: IngestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngestionService],
    }).compile();

    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    service = module.get<IngestionService>(IngestionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('remove', () => {
    it('should remove ingestion entry', async () => {
      jest.spyOn(prisma.ingestion, 'delete').mockResolvedValue({
        id: '1',
      } as any);

      await service.remove('1');
      expect(prisma.ingestion.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw an exception if ingestion not found', async () => {
      jest
        .spyOn(prisma.ingestion, 'delete')
        .mockRejectedValue(
          new HttpException('Ingestion not found', HttpStatus.NOT_FOUND)
        );

      await expect(service.remove('1')).rejects.toThrow(
        new HttpException('Ingestion not found', HttpStatus.NOT_FOUND)
      );
    });
  });

  describe('upload', () => {
    it('should upload the file and create an ingestion entry', async () => {
      const mockFile: Express.Multer.File = {
        buffer: Buffer.from('mock file data'),
        originalname: 'test.zip',
        encoding: '7bit',
        mimetype: 'application/zip',
        size: 12345,
        destination: '',
        filename: '',
        path: '',
        fieldname: '',
        stream: new Readable(),
      };

      const mockUser: UserTokenDto = {
        u_id: 'user123',
        role: 'user',
        iat: 0,
        exp: 0,
        created_at: '',
        updated_at: '',
        email: '',
        o_id: '',
      };

      jest.spyOn(prisma.ingestion, 'create').mockResolvedValue({
        id: 'ingest123',
        u_id: 'user123',
        zip_data: 'test.zip',
        process: false,
        is_session: false,
        d_id: null,
      } as any);

      const mockBlobServiceClient = {
        getContainerClient: jest.fn().mockReturnValue({
          getBlockBlobClient: jest.fn().mockReturnValue({
            uploadData: jest.fn().mockResolvedValue(undefined),
          }),
        }),
      };

      (BlobServiceClient.fromConnectionString as jest.Mock).mockReturnValue(
        mockBlobServiceClient as any
      );

      const result = await service.upload(mockFile, mockUser);

      expect(result).toEqual({
        message: 'Archivos subidos exitosamente',
        ingest_id: 'ingest123',
        comprimido: 'test.zip',
      });

      expect(prisma.ingestion.create).toHaveBeenCalledWith({
        data: {
          u_id: mockUser.u_id,
          zip_data: mockFile.originalname,
          process: false,
          is_session: false,
          d_id: null,
        },
      });
      expect(
        mockBlobServiceClient.getContainerClient().getBlockBlobClient()
          .uploadData
      ).toHaveBeenCalledWith(mockFile.buffer);
    });

    it('should handle errors during upload', async () => {
      const mockFile: Express.Multer.File = {
        buffer: Buffer.from('mock file data'),
        originalname: 'test.zip',
        encoding: '7bit',
        mimetype: 'application/zip',
        size: 12345,
        destination: '',
        filename: '',
        path: '',
        fieldname: '',
        stream: new Readable(),
      };

      const mockUser: UserTokenDto = {
        u_id: 'user123',
        role: 'user',
        iat: 0,
        exp: 0,
        created_at: '',
        updated_at: '',
        email: '',
        o_id: '',
      };

      const mockBlobServiceClient = {
        getContainerClient: jest.fn().mockReturnValue({
          getBlockBlobClient: jest.fn().mockReturnValue({
            uploadData: jest
              .fn()
              .mockRejectedValue(new Error('Error during upload')),
          }),
        }),
      };

      (BlobServiceClient.fromConnectionString as jest.Mock).mockReturnValue(
        mockBlobServiceClient as any
      );

      await expect(service.upload(mockFile, mockUser)).rejects.toThrow(
        'Error during upload'
      );

      expect(
        mockBlobServiceClient.getContainerClient().getBlockBlobClient()
          .uploadData
      ).toHaveBeenCalledWith(mockFile.buffer);
    });
  });

  describe('downloadFile', () => {
    xit('should download the file and send it as a response', async () => {
      const mockFileName = 'test.zip';

      const mockRes = Object.assign(
        new Writable({
          write(chunk, encoding, callback) {
            callback();
          },
        }),
        {
          setHeader: jest.fn(),
          end: jest.fn(),
          on: jest.fn((event, callback) => {
            if (event === 'close') {
              callback();
            }
          }),
          once: jest.fn((event, callback) => {
            if (event === 'finish') {
              callback();
            }
          }),
          emit: jest.fn(),
        }
      );

      const mockBlobServiceClient = {
        getContainerClient: jest.fn().mockReturnValue({
          getBlockBlobClient: jest.fn().mockReturnValue({
            download: jest.fn().mockResolvedValue({
              readableStreamBody: Readable.from(['mock buffer data']),
            }),
          }),
        }),
      };

      (BlobServiceClient.fromConnectionString as jest.Mock).mockReturnValue(
        mockBlobServiceClient as any
      );

      await service.downloadFile(mockFileName, mockRes as any);

      expect(mockRes.setHeader).toHaveBeenCalledWith(
        'Content-Type',
        'application/zip'
      );
      expect(mockRes.end).toHaveBeenCalled();
      expect(
        mockBlobServiceClient.getContainerClient().getBlockBlobClient().download
      ).toHaveBeenCalled();
    });

    it('should handle errors during download', async () => {
      const mockFileName = 'test.zip';

      const mockRes = Object.assign(
        new Writable({
          write(chunk, encoding, callback) {
            callback();
          },
        }),
        {
          setHeader: jest.fn(),
          end: jest.fn(),
          on: jest.fn((event, callback) => {
            if (event === 'close') {
              callback();
            }
          }),
          once: jest.fn((event, callback) => {
            if (event === 'finish') {
              callback();
            }
          }),
          emit: jest.fn(),
        }
      );

      const mockBlobServiceClient = {
        getContainerClient: jest.fn().mockReturnValue({
          getBlockBlobClient: jest.fn().mockReturnValue({
            download: jest
              .fn()
              .mockRejectedValue(new Error('Error during download')),
          }),
        }),
      };

      (BlobServiceClient.fromConnectionString as jest.Mock).mockReturnValue(
        mockBlobServiceClient as any
      );

      await expect(
        service.downloadFile(mockFileName, mockRes as any)
      ).rejects.toThrow('Error al descargar el archivo');

      expect(
        mockBlobServiceClient.getContainerClient().getBlockBlobClient().download
      ).toHaveBeenCalledTimes(0);
    });
  });

  describe('downloadMultipleFiles', () => {
    xit('should download multiple files and send as a zip', async () => {
      const mockFileNames = ['file1.txt', 'file2.txt'];

      const mockRes = Object.assign(
        new Writable({
          write(chunk, encoding, callback) {
            callback();
          },
        }),
        {
          setHeader: jest.fn(),
          end: jest.fn(),
          on: jest.fn((event, callback) => {
            if (event === 'close') {
              callback();
            }
          }),
          once: jest.fn((event, callback) => {
            if (event === 'finish') {
              callback();
            }
          }),
          emit: jest.fn(),
        }
      );

      const mockBlobServiceClient = {
        getContainerClient: jest.fn().mockReturnValue({
          getBlockBlobClient: jest.fn().mockReturnValue({
            download: jest.fn().mockResolvedValue({
              readableStreamBody: Readable.from(['mock buffer data']),
            }),
          }),
        }),
      };

      (BlobServiceClient.fromConnectionString as jest.Mock).mockReturnValue(
        mockBlobServiceClient as any
      );

      await service.downloadMultipleFiles(mockFileNames, mockRes as any);

      expect(mockRes.setHeader).toHaveBeenCalledWith(
        'Content-Type',
        'application/zip'
      );
      expect(
        mockBlobServiceClient.getContainerClient().getBlockBlobClient().download
      ).toHaveBeenCalledTimes(mockFileNames.length);
    });

    it('should handle errors during download', async () => {
      const mockFileNames = ['file1.txt', 'file2.txt'];

      const mockRes = Object.assign(
        new Writable({
          write(chunk, encoding, callback) {
            callback();
          },
        }),
        {
          setHeader: jest.fn(),
          end: jest.fn(),
          on: jest.fn((event, callback) => {
            if (event === 'close') {
              callback();
            }
          }),
          once: jest.fn((event, callback) => {
            if (event === 'finish') {
              callback();
            }
          }),
          emit: jest.fn(),
        }
      );

      const mockBlobServiceClient = {
        getContainerClient: jest.fn().mockReturnValue({
          getBlockBlobClient: jest.fn().mockReturnValue({
            download: jest
              .fn()
              .mockRejectedValue(new Error('Error during download')),
          }),
        }),
      };

      (BlobServiceClient.fromConnectionString as jest.Mock).mockReturnValue(
        mockBlobServiceClient as any
      );

      await expect(
        service.downloadMultipleFiles(mockFileNames, mockRes as any)
      ).rejects.toThrow('Error while archiving files.');

      expect(
        mockBlobServiceClient.getContainerClient().getBlockBlobClient().download
      ).toHaveBeenCalledTimes(0);
    });
  });

  describe('getBlobContentAsBuffer', () => {
    it('should return blob content as buffer', async () => {
      const mockBlobName = 'test.txt';
      const mockBlobServiceClient = {
        getContainerClient: jest.fn().mockReturnValue({
          getBlobClient: jest.fn().mockReturnValue({
            download: jest.fn().mockResolvedValue({
              readableStreamBody: Readable.from(['mock buffer data']),
            }),
          }),
        }),
      };

      (BlobServiceClient.fromConnectionString as jest.Mock).mockReturnValue(
        mockBlobServiceClient as any
      );

      const result = await (service as any).getBlobContentAsBuffer(
        mockBlobName
      );

      expect(result).toEqual(Buffer.from('mock buffer data'));
    });

    it('should throw error if blob not found', async () => {
      const mockBlobName = 'test.txt';
      const mockBlobServiceClient = {
        getContainerClient: jest.fn().mockReturnValue({
          getBlobClient: jest.fn().mockReturnValue({
            download: jest.fn().mockRejectedValue(new Error('Blob not found')),
          }),
        }),
      };

      (BlobServiceClient.fromConnectionString as jest.Mock).mockReturnValue(
        mockBlobServiceClient as any
      );

      await expect(
        (service as any).getBlobContentAsBuffer(mockBlobName)
      ).rejects.toThrow('Access Denied or Blob Not Found');
    });
  });

  describe('streamToBuffer', () => {
    it('should convert stream to buffer', async () => {
      const mockStream = Readable.from(['mock buffer data']);

      const result = await (service as any).streamToBuffer(mockStream);

      expect(result).toEqual(Buffer.from('mock buffer data'));
    });
  });

  describe('processCompressedFile', () => {
    xit('should process compressed file and update ingestion entry', async () => {
      const mockFileName = 'test.zip';
      const mockIngestId = 'ingest123';

      jest
        .spyOn(service as any, 'getBlobContentAsBuffer')
        .mockResolvedValue(
          Buffer.from(
            'timestamp,general.motors_en,general.steps_in_mode\n1234567890,1,100'
          )
        );

      jest.spyOn(service, 'processJsonFromBlob').mockResolvedValue({
        espSoftwareVersion: '1.0.0',
        device_id: '123',
        patient_id: '456',
      });

      jest.spyOn(prisma.devices, 'findUnique').mockResolvedValue({
        structure_version: '0.9.0',
      } as any);

      jest.spyOn(prisma.sessions, 'create').mockResolvedValue({
        id: 'session123',
      } as any);

      jest.spyOn(prisma.ingestion, 'update').mockResolvedValue({} as any);

      await service.processCompressedFile(mockFileName, mockIngestId);

      expect(prisma.ingestion.update).toHaveBeenCalledWith({
        where: { id: mockIngestId },
        data: {
          process: true,
          is_session: true,
          error_msg: null,
          d_id: '123',
          session_id: 'session123',
        },
      });
    });

    it('should handle errors during processing of compressed file', async () => {
      const mockFileName = 'test.zip';
      const mockIngestId = 'ingest123';

      jest
        .spyOn(service as any, 'getBlobContentAsBuffer')
        .mockResolvedValue(
          Buffer.from(
            'timestamp,general.motors_en,general.steps_in_mode\n1234567890,1,100'
          )
        );

      jest.spyOn(service, 'processJsonFromBlob').mockResolvedValue({
        espSoftwareVersion: '1.0.0',
        device_id: '123',
        patient_id: '456',
      });

      jest.spyOn(prisma.devices, 'findUnique').mockResolvedValue({
        structure_version: '0.9.0',
      } as any);

      jest
        .spyOn(prisma.ingestion, 'update')
        .mockRejectedValueOnce(new Error('Patient not found in database'))
        .mockRejectedValueOnce(new Error('Error during processing'));

      await expect(
        service.processCompressedFile(mockFileName, mockIngestId)
      ).rejects.toThrow('Error during processing');

      expect(prisma.ingestion.update).toHaveBeenNthCalledWith(1, {
        where: { id: mockIngestId },
        data: {
          process: false,
          error_msg: 'Patient not found in database',
          d_id: '123',
        },
      });

      expect(prisma.ingestion.update).toHaveBeenNthCalledWith(2, {
        where: { id: mockIngestId },
        data: {
          process: false,
          error_msg: 'Patient not found in database',
          d_id: null,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return paginated ingestions with patient names', async () => {
      const mockUser: UserTokenDto = {
        u_id: 'user123',
        role: 'user',
        iat: 0,
        exp: 0,
        created_at: '',
        updated_at: '',
        email: '',
        o_id: 'org123',
      };

      const mockIngestions = [
        {
          id: 'ingest1',
          u_id: 'user123',
          zip_data: '17062024-082136.zip',
          process: false,
          is_session: false,
          d_id: 'device1',
          created_at: new Date(),
          sessions_ingestion_session_idTosessions: {
            p_id: 'patient2',
            id: 'session2',
          },
        },
        {
          id: 'ingest2',
          u_id: 'user123',
          zip_data: '17062024-082137.zip',
          process: false,
          is_session: false,
          d_id: 'device2',
          created_at: new Date(),
          sessions_ingestion_session_idTosessions: {
            p_id: 'patient1',
            id: 'session1',
          },
        },
      ];

      jest.spyOn(prisma.organization_has_device, 'findMany').mockResolvedValue([
        {
          d_id: 'device1',
          o_id: 'org123',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          d_id: 'device2',
          o_id: 'org123',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      jest
        .spyOn(prisma.ingestion, 'findMany')
        .mockResolvedValue(mockIngestions as any);

      jest.spyOn(prisma.patient_data, 'findMany').mockResolvedValue([
        {
          p_id: 'patient1',
          name: 'Patient One',
          created_at: new Date(),
          updated_at: new Date(),
          surnames: 'df',
          legal_guardian_email_1: 'da',
          legal_guardian_email_2: 'd',
          phone: '1',
          legal_guardian_name_1: '12',
          legal_guardian_name_2: '11',
        },
        {
          p_id: 'patient2',
          name: 'Patient Two',
          created_at: new Date(),
          updated_at: new Date(),
          surnames: 'df',
          legal_guardian_email_1: 'da',
          legal_guardian_email_2: 'd',
          phone: '1',
          legal_guardian_name_1: '12',
          legal_guardian_name_2: '11',
        },
      ]);

      const result = await service.findAll(mockUser);

      expect(result.data).toEqual([
        {
          ...mockIngestions[0],
          p_name: 'Patient One',
          session_id: 'session1',
          sessions_ingestion_session_idTosessions: undefined,
        },
        {
          ...mockIngestions[1],
          p_name: 'Patient Two',
          session_id: 'session2',
          sessions_ingestion_session_idTosessions: undefined,
        },
      ]);
      expect(result.totalRecords).toEqual(2);
      expect(result.totalPages).toEqual(1);
      expect(result.currentPage).toEqual(1);
      expect(result.pageSize).toEqual(10);
    });
  });

  describe('processJsonFromBlob', () => {
    it('should process JSON content correctly', async () => {
      const mockJsonContent = JSON.stringify({
        device_id: 'device123',
        patient_id: 'patient123',
        components: [
          {
            name: 'esp',
            software_version: '1.0.0',
          },
        ],
      });

      const result = await service.processJsonFromBlob(mockJsonContent);

      expect(result).toEqual({
        espSoftwareVersion: '1.0.0',
        device_id: 'device123',
        patient_id: 'patient123',
      });
    });

    it('should handle invalid JSON content', async () => {
      const mockJsonContent = 'invalid-json';

      await expect(
        service.processJsonFromBlob(mockJsonContent)
      ).rejects.toThrow('Error al procesar el JSON');
    });

    it('should handle missing components array', async () => {
      const mockJsonContent = JSON.stringify({
        device_id: 'device123',
        patient_id: 'patient123',
        components: [],
      });

      const result = await service.processJsonFromBlob(mockJsonContent);

      expect(result).toEqual({
        espSoftwareVersion: '',
        device_id: 'device123',
        patient_id: 'patient123',
      });
    });
  });
  describe('processCsv', () => {
    xit('should process CSV data correctly', async () => {
      const mockCsvContent = `
        timestamp,general.motors_en,general.steps_in_mode,motors.motor1.ang_ref,motors.motor2.ang_ref
        20:31:18,1,100,10,20
      `;

      const result = await processCsv(mockCsvContent);

      expect(result).toEqual({
        motorsAng: [
          {
            timestamp: '20:31:18',
            motorsAngRef1: 0.1,
            motorsAngRef2: 0.2,
            motorsAngRef3: 0,
            motorsAngRef4: 0,
            motorsMotor1Mille: 0,
            motorsMotor1Orbis: 0,
            motorsMotor2Mille: 0,
            motorsMotor2Orbis: 0,
            motorsMotor3Mille: 0,
            motorsMotor3Orbis: 0,
            motorsMotor4Mille: 0,
            motorsMotor4Orbis: 0,
          },
        ],
        sessionData: [
          {
            timestamp: '20:31:18',
            motorsEn: 1,
            timeWalking: 1,
          },
        ],
        batteryData: [
          {
            timestamp: '20:31:18',
            capacity: undefined,
          },
        ],
        motorVoltageData: [
          {
            timestamp: '20:31:18',
            current1: undefined,
            current2: undefined,
            current3: undefined,
            current4: undefined,
          },
        ],
        temperatureData: [
          {
            timestamp: '20:31:18',
            motorTemperature1: undefined,
            motorTemperature2: undefined,
            motorTemperature3: undefined,
            motorTemperature4: undefined,
            environmentTemperature: undefined,
          },
        ],
        torqueData: [
          {
            timestamp: '20:31:18',
            motorTorque1: undefined,
            motorTorque2: undefined,
            motorTorque3: undefined,
            motorTorque4: undefined,
          },
        ],
        config_patient: {
          timestamp: '20:31:18',
        },
        motorsInt: [
          {
            timestamp: '20:31:18',
            motorsInt1: undefined,
            motorsInt2: undefined,
            motorsInt3: undefined,
            motorsInt4: undefined,
          },
        ],
        elevCtrl: [
          {
            timestamp: '20:31:18',
            elevCtrl: undefined,
          },
        ],
        elevSens: [
          {
            timestamp: '20:31:18',
            elevSens: undefined,
          },
        ],
        globalPosition: [
          {
            timestamp: '20:31:18',
            globalPosition: undefined,
          },
        ],
        energyMonitor: [
          {
            timestamp: '20:31:18',
            energyMonitorExo: undefined,
            energyMonitorWf: undefined,
          },
        ],
      });
    });

    it('should handle empty CSV data', async () => {
      const mockCsvContent = '';

      await expect(processCsv(mockCsvContent)).rejects.toThrow(
        'Error al procesar el CSV'
      );
    });
  });

  describe('findOne', () => {
    xit('should return ingestion entry and processed data', async () => {
      jest.spyOn(prisma.ingestion, 'findUnique').mockResolvedValue({
        zip_data: 'test.zip',
      } as any);
      jest
        .spyOn(service as any, 'getBlobContentAsBuffer')
        .mockResolvedValue(Buffer.from('test'));

      const mockZip = new (ADMZip as jest.Mock)();
      jest.spyOn(mockZip, 'getEntries').mockReturnValue([]);

      const result = await service.findOne('1');
      expect(result).toEqual({
        motorsAng: [],
        sessionData: [],
        batteryData: [],
        motorVoltageData: [],
        temperatureData: [],
        torqueData: [],
        config_patient: {},
        motorsInt: [],
        elevCtrl: [],
        elevSens: [],
        globalPosition: [],
        energyMonitor: [],
      });
    });

    it('should throw an exception if ingestion not found', async () => {
      jest.spyOn(prisma.ingestion, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(
        new HttpException('File not found', HttpStatus.NOT_FOUND)
      );
    });
  });
  describe('getData', () => {
    it('should extract evaluationData and userData correctly', () => {
      const row = {
        'config_patient.height': 170,
        'config_patient.weight': 70,
        'config_patient.shoe_size': 42,
        'config_patient.femur_len_1': 50,
        'config_patient.tibia_len_1': 45,
        'config_patient.ankle_len': 10,
        'evaluation_data.other_clinical_evaluations': '1;2',
      };

      const { evaluationData, userData } = getData(row);

      expect(userData).toEqual({
        height: 170,
        weight: 70,
        hip_width: 0,
        shoe_size: 42,
        femur_len_L: 50,
        femur_len_R: 0,
        tibia_len_L: 45,
        tibia_len_R: 0,
        ankle_len_L: 10,
        ankle_len_R: 0,
        walker_len: 0,
      });

      expect(evaluationData).toEqual({
        hasChest: 1,
        effort: 2,
      });
    });
  });

  describe('Utility Functions', () => {
    describe('hasDevice', () => {
      it('should return true if device exists', async () => {
        const mockDeviceId = 'device1';

        jest.spyOn(prisma.devices, 'findUnique').mockResolvedValue({
          d_id: mockDeviceId,
        } as any);

        const result = await hasDevice(mockDeviceId);
        expect(result).toBe(true);
      });

      it('should return false if device does not exist', async () => {
        const mockDeviceId = 'device2';

        jest.spyOn(prisma.devices, 'findUnique').mockResolvedValue(null);

        const result = await hasDevice(mockDeviceId);
        expect(result).toBe(false);
      });

      it('should handle errors gracefully', async () => {
        const mockDeviceId = 'device3';

        jest
          .spyOn(prisma.devices, 'findUnique')
          .mockRejectedValue(new Error('Database error'));

        const result = await hasDevice(mockDeviceId);
        expect(result).toBe(false);
      });
    });

    describe('getEval', () => {
      it('should calculate the evaluation correctly', () => {
        const sessionData = {
          totalSteps: {
            autofwd: { steps: 100, averageCadencia: 1.5 },
            autobwd: { steps: 80, averageCadencia: 1.2 },
            intfwd: { steps: 90, averageCadencia: 1.3 },
            intbwd: { steps: 70, averageCadencia: 1.1 },
          },
          flexors: {
            flexos_hip: 10,
            flexos_knee: 15,
          },
          intentionThreshold: {
            hipFlexL: 5,
            kneeFlexL: 6,
            hipFlexR: 4,
            kneeFlexR: 3,
          },
          evaluationData: {
            hasChest: 1,
            effort: 2,
          },
        };

        const evalScore = getEval(sessionData);
        expect(evalScore).toBe('27.42');
      });
    });

    describe('convertToMinutesAndSeconds', () => {
      it('should convert decimal minutes to minutes and seconds', () => {
        const decimalMinutes = 1.75;
        const result = convertToMinutesAndSeconds(decimalMinutes);
        expect(result).toBe(1.75);
      });

      it('should handle exact minutes correctly', () => {
        const decimalMinutes = 2.0;
        const result = convertToMinutesAndSeconds(decimalMinutes);
        expect(result).toBe(2.0);
      });

      it('should handle zero correctly', () => {
        const decimalMinutes = 0;
        const result = convertToMinutesAndSeconds(decimalMinutes);
        expect(result).toBe(0);
      });

      it('should handle less than a minute correctly', () => {
        const decimalMinutes = 0.5;
        const result = convertToMinutesAndSeconds(decimalMinutes);
        expect(result).toBe(0.5);
      });
    });

    describe('addAlarms', () => {
      it('should add alarms correctly', async () => {
        const alarms = [
          { timestamp: '2024-08-01T12:00:00Z', event_id: 0, value: 'Test1' },
          { timestamp: '2024-08-01T12:05:00Z', event_id: 1, value: 'Test2' },
        ];
        const version = '1.0.0';
        const ingestion_id = 'ingestion123';

        jest.spyOn(prisma.alarms, 'create').mockResolvedValue({} as any);

        await addAlarms(alarms, version, ingestion_id);

        expect(prisma.alarms.create).toHaveBeenCalledTimes(2);
        expect(prisma.alarms.create).toHaveBeenCalledWith({
          data: {
            timestamp: new Date(alarms[0].timestamp),
            value: alarms[0].value,
            event_id: String(alarms[0].event_id),
            event_type: 'MNT',
            version: String(version),
            params: {},
            i_id: ingestion_id,
          },
        });
        expect(prisma.alarms.create).toHaveBeenCalledWith({
          data: {
            timestamp: new Date(alarms[1].timestamp),
            value: alarms[1].value,
            event_id: String(alarms[1].event_id),
            event_type: 'WARNING',
            version: String(version),
            params: {},
            i_id: ingestion_id,
          },
        });
      });
    });

    describe('colorize', () => {
      it('should colorize text correctly', () => {
        const text = 'Hello World';
        const colorCode = 31; // Red
        const bold = true;
        const coloredText = colorize(text, colorCode, bold);

        expect(coloredText).toBe('\x1b[1m\x1b[31mHello World\x1b[0m');
      });
    });

    describe('hasPatient', () => {
      it('should return true if patient exists', async () => {
        const patientId = 'patient123';

        jest.spyOn(prisma.patients, 'findUnique').mockResolvedValue({} as any);

        const result = await hasPatient(patientId);
        expect(result).toBe(true);
      });

      it('should return false if patient does not exist', async () => {
        const patientId = 'patient123';

        jest.spyOn(prisma.patients, 'findUnique').mockResolvedValue(null);

        const result = await hasPatient(patientId);
        expect(result).toBe(false);
      });
    });
    describe('hasDevice', () => {
      it('should return true if device exists', async () => {
        const mockDeviceId = 'device1';

        jest.spyOn(prisma.devices, 'findUnique').mockResolvedValue({
          d_id: mockDeviceId,
        } as any);

        const result = await hasDevice(mockDeviceId);
        expect(result).toBe(true);
      });

      it('should return false if device does not exist', async () => {
        const mockDeviceId = 'device2';

        jest.spyOn(prisma.devices, 'findUnique').mockResolvedValue(null);

        const result = await hasDevice(mockDeviceId);
        expect(result).toBe(false);
      });

      it('should handle errors gracefully', async () => {
        const mockDeviceId = 'device3';

        jest
          .spyOn(prisma.devices, 'findUnique')
          .mockRejectedValue(new Error('Database error'));

        const result = await hasDevice(mockDeviceId);
        expect(result).toBe(false);
      });
    });

    describe('getFormattedDate', () => {
      it('should format date correctly', () => {
        const date = new Date('2024-08-01T12:34:56Z');
        const formattedDate = getFormattedDate(date);

        expect(formattedDate).toBe('12:34:56');
      });
    });
  });
});
