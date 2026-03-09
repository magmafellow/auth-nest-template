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
  Query,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service.js';
import {
  createUserSchema,
  type UpdateUserDto,
  type CreateUserDto,
  updateUserSchema,
} from '../_zod/user.js';
import { ZodValidationPipe } from '../_pipes/validation.pipe.js';
import { Public } from '../_decorators/public.decorator.js';
import { Roles } from '../_decorators/roles.decorator.js';
import { RolesGuard } from '../_guargs/role.guard.js';
import { Role } from '../_types/role.enum.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  findAll(
    @Query('limit', new DefaultValuePipe(999), ParseIntPipe) limit: number,
  ) {
    return this.userService.findAll(limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateUserSchema)) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
