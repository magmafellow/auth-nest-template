import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service.js';
import { User as UserModel } from './generated/prisma/client.js';

@Controller()
export class AppController {
  constructor(private readonly UserService: UserService) {}

  @Get('')
  async getPostById(): Promise<any> {
    return `Main3`;
  }
}
