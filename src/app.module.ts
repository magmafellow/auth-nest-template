import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from "./prisma.service.js"; 
import { UserService } from "./user.service.js"; 
import { UserModule } from './user/user.module.js';
import { CatModule } from './cat/cat.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, CatModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService],
})
export class AppModule {}
