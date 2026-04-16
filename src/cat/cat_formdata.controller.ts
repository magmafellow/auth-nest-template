import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UploadedFiles,
} from '@nestjs/common';
import { CatService } from './cat.service.js';
import { CreateCatDto } from './dto/create-cat.dto.js';
import { UpdateCatDto } from './dto/update-cat.dto.js';
import {
  MyValidationPipe,
  ZodValidationPipe,
} from '../_pipes/validation.pipe.js';
import { type CreateCatDto_Zod, createCatSchema } from '../_zod/schemas.js';
import { LoggingInterceptor } from '../_interceptors/logging.interceptor.js';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { Public } from '../../src/_decorators/public.decorator.js';

@UseInterceptors(LoggingInterceptor)
@Controller('cat_formdata')
export class CatController_formdata {
  constructor(private readonly catService: CatService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  create(@Body() createCatDto: CreateCatDto_Zod) {
    return this.catService.create(createCatDto);
  }

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 300000 }),
          // new FileTypeValidator({ fileType: '' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return file.size;
  }

  @Public()
  @Post('upload_multiple')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 3 },
      { name: 'background' },
      { name: 'foreground' },
    ]),
  )
  uploadFileMultiple(
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      name?: Express.Multer.File[];
    },
  ) {
    console.log('files: ', files);
    return 'Y';
  }

  
  @Get()
  findAll() {
    return this.catService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MyValidationPipe) id: number) {
    return this.catService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catService.remove(+id);
  }
}
