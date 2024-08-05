import {
  Controller,
  Post,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  UseGuards,
  Delete,
  Body,
  Res,
} from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { UUID } from 'crypto';
import { AuthenticatedGuard, GetUser } from '../guards/authenticated.guard';
import { UserTokenDto } from '../my-account/dto/dto';
import 'multer';

@ApiTags('Ingestion')
@ApiBearerAuth()
@Controller('ingestion')
@UseGuards(AuthenticatedGuard)
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  /**
   Download a group of files of an ingestion.
    * @param name The name of the file to download.
    * @returns The file of the ingestion.
    * @throws Error if the file is not found.
    * @throws Error if the ingestion is not found.
    */
  @Post('files')
  @ApiOperation({ summary: 'Download a group of files of an ingestion' })
  @ApiBody({
    schema: {
      type: 'array',
      items: {
        type: 'string',
      },
      description: 'Array of file names to download',
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Download a group of files of an ingestion',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Files are required',
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async downloadGroupFiles(@Body() files: string[], @Res() res: any) {
    if (!files || files.length === 0) {
      throw new HttpException('Files are required', HttpStatus.BAD_REQUEST);
    }

    return await this.ingestionService.downloadMultipleFiles(files, res);
  }

  /**
   * Upload a compressed file with a csv and a json file.
   * @param file The compressed file to upload.
   * @returns The ingestion object.
   */

  @Post('upload')
  @UseInterceptors(FileInterceptor('compressedFile'))
  @ApiOperation({
    summary: 'Upload a compressed file with a csv and a json file',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Upload a compressed file with a csv and a json file',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'File is required.',
  })
  async uploadFiles(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: UserTokenDto
  ) {
    if (!file) {
      throw new HttpException('File is required.', HttpStatus.BAD_REQUEST);
    }

    return await this.ingestionService.upload(file, user);
  }

  /**
   * Process the content of the compressed file.
   * @param file The compressed file to process.
   * @param ingest_id The ingestion ID.
   * @returns The ingestion object.
   * @throws Error if the file is not found.
   * @throws Error if the ingestion is not found.
   * @throws Error if the ingestion is already processed.
   * @throws Error if the ingestion is not valid.
   */
  @Get('/process/:file/:id')
  @ApiOperation({ summary: 'Process the content of the compressed file' })
  @ApiParam({
    name: 'file',
    required: true,
    description: 'The compressed file to process',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ingestion',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Process the content of the compressed file',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'File is required.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Missing device ID or patient ID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Device or Patient not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error processing file',
  })
  async processCsv(@Param('file') file: string, @Param('id') ingest_id: UUID) {
    try {
      return await this.ingestionService.processCompressedFile(file, ingest_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Retrieve all ingestions.
   * @param page The page number.
   * @param limit The number of items per page.
   * @returns An array of all ingestions.
   * @throws Error if the page is not a number.
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all ingestions' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'The page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'The number of items per page',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'The search term',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieve all ingestions',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Page is not a number',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Limit is not a number',
  })
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @GetUser() user: UserTokenDto,
    @Query('search') search?: string
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    return this.ingestionService.findAll(user, pageNum, limitNum, search);
  }

  /**
   * Retrieve an ingestion by ID.
   * @param id The unique identifier of the ingestion.
   * @returns The ingestion object.
   * @throws Error if the ingestion is not found.
   */
  @Get(':fileName')
  @ApiOperation({
    summary: 'Retrieve an ingestion by fileName to visualize it',
  })
  @ApiParam({
    name: 'fileName',
    required: true,
    description: 'The file name of the ingestion',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieve an ingestion by ID',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ingestion ID is required',
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async findOne(@Param('fileName') fileName: string, @Res() res: any) {
    try {
      const processedData = await this.ingestionService.findOne(fileName);
      res.json(processedData);
    } catch (error) {
      throw new HttpException(
        'Error al descargar y descomprimir los archivos',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Delete an ingestion by ID.
   * @param id The unique identifier of the ingestion.
   * @returns The ingestion object.
   * @throws Error if the ingestion is not found.
   * @throws Error if the ingestion is already processed.
   * @throws Error if the ingestion is not valid.
   * @throws Error if the ingestion is not found.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ingestion by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the ingestion',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete an ingestion by ID',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ingestion ID is required',
  })
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.ingestionService.remove(id);
  }

  /**
   * Download the file of an ingestion.
   * @param name The name of the file to download.
   * @returns The file of the ingestion.
   * @throws Error if the file is not found.
   * @throws Error if the ingestion is not found.
   */
  @Get('download/:name')
  @ApiOperation({ summary: 'Download the file of an ingestion' })
  @ApiParam({
    name: 'name',
    required: true,
    description: 'The name of the file to download',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Download the file of an ingestion',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'File is required',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'File not found',
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async downloadFile(@Param('name') name: string, @Res() res: any) {
    return await this.ingestionService.downloadFile(name, res);
  }

  @Get('download-file-by-day/:date')
  async downloadFilesByDate(@Param('date') date: string) {
    try {
      await this.ingestionService.downloadAndUnzipFiles(date);
    } catch (error) {
      console.error('Error al descargar y descomprimir los archivos', error);
      throw new HttpException(
        'Error al descargar y descomprimir los archivos',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
