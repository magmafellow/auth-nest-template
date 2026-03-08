import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateUserDto, UpdateUserDto } from '../_zod/user.js';
import { TDefaultResponse } from '../_types/response.js';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<TDefaultResponse & { data: any }> {
    // return `Created new user \n\n ${JSON.stringify(createUserDto, null, 4)}`;
    try {
      const r = await this.prisma.user.create({ data: createUserDto });
      return {
        statusCode: 200,
        message: 'Successfuly created user',
        isError: false,
        data: r,
      };
    } catch (error: unknown) {
      throw new BadRequestException('Database creation failed', {
        cause: error,
        description:
          'Database creation failed - await this.prisma.user.create({ data: createUserDto })',
      });
    }
  }

  async findAll(limit: number) {
    // console.log('taken limit: ', limit)
    try {
      const r = await this.prisma.user.findMany({ take: limit });
      return {
        statusCode: 200,
        message: `Successfuly found all user with limit=${limit}`,
        isError: false,
        data: r,
      };
    } catch (error: any) {
      throw new BadRequestException('Database find all failed', {
        cause: error,
        description:
          'Database find all failed - await this.prisma.user.findMany({ take: limit })',
      });
    }
  }

  async findOne(id: number) {
    try {
      const r = await this.prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
      });
      return {
        statusCode: 200,
        message: 'Successfuly found user',
        isError: false,
        data: r,
      };
    } catch (error: any) {
      throw new BadRequestException('Database find failed', {
        cause: error,
        description:
          'Database find failed - await this.prisma.user.findUniqueOrThrow({...})',
      });
    }
  }
  async findOneByUsername(username: string) {
    try {
      const r = await this.prisma.user.findUniqueOrThrow({
        where: {
          username,
        },
      });
      return {
        statusCode: 200,
        message: 'Successfuly found user by username',
        isError: false,
        data: r,
      };
    } catch (error: any) {
      throw new BadRequestException('Database find by username failed', {
        cause: error,
        description:
          'Database find by username failed - await this.prisma.user.findUniqueOrThrow({...})',
      });
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const r = await this.prisma.user.update({
        data: updateUserDto,
        where: { id },
      });
      return {
        statusCode: 200,
        message: 'Successfuly updated user',
        isError: false,
        data: r,
      };
    } catch (error: unknown) {
      throw new BadRequestException('Database update failed', {
        cause: error,
        description:
          'Database creation failed - await this.prisma.user.update({...})',
      });
    }
  }

  async remove(id: number) {
    try {
      const r = await this.prisma.user.delete({ where: { id } });
      return {
        statusCode: 200,
        message: 'Successfuly removed user',
        isError: false,
        data: r,
      };
    } catch (error) {
      throw new BadRequestException('Database removal failed', {
        cause: error,
        description:
          'Database removal failed - this.prisma.user.delete({ where: { id } })',
      });
    }
  }
}
