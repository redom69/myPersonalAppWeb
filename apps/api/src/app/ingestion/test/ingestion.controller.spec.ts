import { Test, TestingModule } from '@nestjs/testing';
import { UUID } from 'crypto';
import { HttpException } from '@nestjs/common';

import { IngestionController } from '../ingestion.controller';
import { IngestionService } from '../ingestion.service';
import { UserTokenDto } from '../../my-account/dto/dto';

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
}));

describe('IngestionController', () => {
  let ingestionController: IngestionController;
  let ingestionService: IngestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngestionController],
      providers: [
        {
          provide: IngestionService,
          useValue: {
            downloadMultipleFiles: jest.fn(),
            upload: jest.fn(),
            processCompressedFile: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
            downloadFile: jest.fn(),
            downloadAndUnzipFiles: jest.fn(),
          },
        },
      ],
    }).compile();

    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    jest.spyOn(console, 'error').mockImplementation(() => undefined);

    ingestionController = module.get<IngestionController>(IngestionController);
    ingestionService = module.get<IngestionService>(IngestionService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(ingestionController).toBeDefined();
  });

  describe('downloadGroupFiles', () => {
    it('should throw an exception if files array is not provided', async () => {
      await expect(
        ingestionController.downloadGroupFiles([], {} as any)
      ).rejects.toThrow(HttpException);
    });

    it('should call ingestionService.downloadMultipleFiles with the correct parameters', async () => {
      const files = ['file1.csv', 'file2.csv'];
      const res = {};

      await ingestionController.downloadGroupFiles(files, res as any);

      expect(ingestionService.downloadMultipleFiles).toHaveBeenCalledWith(
        files,
        res
      );
    });
  });

  describe('uploadFiles', () => {
    it('should throw an exception if file is not provided', async () => {
      await expect(
        ingestionController.uploadFiles(
          null as any,
          { u_id: '123' } as UserTokenDto
        )
      ).rejects.toThrow(HttpException);
    });

    it('should call ingestionService.upload with the correct parameters', async () => {
      const file = { originalname: 'test.zip' } as Express.Multer.File;
      const user = { u_id: '123' } as UserTokenDto;

      await ingestionController.uploadFiles(file, user);

      expect(ingestionService.upload).toHaveBeenCalledWith(file, user);
    });
  });

  describe('processCsv', () => {
    it('should call ingestionService.processCompressedFile with the correct parameters', async () => {
      const file = 'test.zip';
      const id: UUID = '123e4567-e89b-12d3-a456-426614174000' as UUID;

      await ingestionController.processCsv(file, id);

      expect(ingestionService.processCompressedFile).toHaveBeenCalledWith(
        file,
        id
      );
    });

    it('should throw an exception if processing fails', async () => {
      const file = 'test.zip';
      const id: UUID = '123e4567-e89b-12d3-a456-426614174000' as UUID;
      jest
        .spyOn(ingestionService, 'processCompressedFile')
        .mockRejectedValue(new Error('Processing failed'));

      await expect(ingestionController.processCsv(file, id)).rejects.toThrow(
        HttpException
      );
    });
  });

  describe('findAll', () => {
    it('should call ingestionService.findAll with the correct parameters', async () => {
      const page = '1';
      const limit = '10';
      const user = { u_id: '123' } as UserTokenDto;

      await ingestionController.findAll(page, limit, user);

      expect(ingestionService.findAll).toHaveBeenCalledWith(
        user,
        1,
        10,
        undefined
      );
    });

    it('should use default values if page and limit are not provided', async () => {
      const user = { u_id: '123' } as UserTokenDto;

      await ingestionController.findAll('', '', user);

      expect(ingestionService.findAll).toHaveBeenCalledWith(
        user,
        1,
        10,
        undefined
      );
    });

    it('should handle invalid page and limit values gracefully', async () => {
      const user = { u_id: '123' } as UserTokenDto;

      await ingestionController.findAll('invalid', 'invalid', user);

      expect(ingestionService.findAll).toHaveBeenCalledWith(
        user,
        1,
        10,
        undefined
      );
    });
  });

  describe('findOne', () => {
    it('should call ingestionService.findOne with the correct parameters', async () => {
      const fileName = 'test.zip';
      const res = {
        json: jest.fn(),
      };

      await ingestionController.findOne(fileName, res as any);

      expect(ingestionService.findOne).toHaveBeenCalledWith(fileName);
    });

    it('should return processed data', async () => {
      const fileName = 'test.zip';
      const processedData = { data: 'some data' };
      jest.spyOn(ingestionService, 'findOne').mockResolvedValue(processedData);
      const res = {
        json: jest.fn(),
      };

      await ingestionController.findOne(fileName, res as any);

      expect(res.json).toHaveBeenCalledWith(processedData);
    });

    it('should throw an exception if finding file fails', async () => {
      const fileName = 'test.zip';
      jest
        .spyOn(ingestionService, 'findOne')
        .mockRejectedValue(new Error('File not found'));

      await expect(
        ingestionController.findOne(fileName, {} as any)
      ).rejects.toThrow(HttpException);
    });
  });

  describe('remove', () => {
    it('should call ingestionService.remove with the correct parameters', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';

      await ingestionController.remove(id);

      expect(ingestionService.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('downloadFile', () => {
    it('should call ingestionService.downloadFile with the correct parameters', async () => {
      const name = 'test.zip';
      const res = {};

      await ingestionController.downloadFile(name, res as any);

      expect(ingestionService.downloadFile).toHaveBeenCalledWith(name, res);
    });
  });

  describe('downloadGroupFiles', () => {
    it('should throw an exception if files array is not provided', async () => {
      await expect(
        ingestionController.downloadGroupFiles([], {} as any)
      ).rejects.toThrow(HttpException);
    });

    it('should call ingestionService.downloadMultipleFiles with the correct parameters', async () => {
      const files = ['file1.csv', 'file2.csv'];
      const res = {};

      await ingestionController.downloadGroupFiles(files, res as any);

      expect(ingestionService.downloadMultipleFiles).toHaveBeenCalledWith(
        files,
        res
      );
    });
  });

  describe('downloadFilesByDate', () => {
    it('should call ingestionService.downloadAndUnzipFiles with the correct date', async () => {
      const date = '2023-07-30';
      jest
        .spyOn(ingestionService, 'downloadAndUnzipFiles')
        .mockResolvedValueOnce(undefined);

      await ingestionController.downloadFilesByDate(date);

      expect(ingestionService.downloadAndUnzipFiles).toHaveBeenCalledWith(date);
    });

    it('should throw an HttpException if there is an error', async () => {
      const date = '2023-07-30';
      jest
        .spyOn(ingestionService, 'downloadAndUnzipFiles')
        .mockRejectedValueOnce(new Error('Test error'));

      await expect(
        ingestionController.downloadFilesByDate(date)
      ).rejects.toThrow(HttpException);

      expect(console.error).toHaveBeenCalledWith(
        'Error al descargar y descomprimir los archivos',
        expect.any(Error)
      );
    });
  });
});
