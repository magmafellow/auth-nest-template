import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma.service.js';
import { User, Prisma } from '../generated/prisma/client.js';
import { CreateUserDto } from '../_zod/user.js';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return `Created new user \n\n ${JSON.stringify(createUserDto, null, 4)}`;
  }

  async findAll() {
    return this.prisma.user.findMany({ take: 10 });
  }

  findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
