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
} from '@nestjs/common';
import { CatService } from './cat.service.js';
import { CreateCatDto } from './dto/create-cat.dto.js';
import { UpdateCatDto } from './dto/update-cat.dto.js';
import { MyValidationPipe, ZodValidationPipe } from '../_pipes/validation.pipe.js';
import { type CreateCatDto_Zod, createCatSchema } from '../_zod/schemas.js';
import { LoggingInterceptor } from '../_interceptors/logging.interceptor.js';

@UseInterceptors(LoggingInterceptor)
@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  create(@Body() createCatDto: CreateCatDto_Zod) {
    return this.catService.create(createCatDto);
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
