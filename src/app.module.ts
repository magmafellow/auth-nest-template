import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service.js';
import { UserService } from './user.service.js';
import { UserModule } from './user/user.module.js';
import { CatModule } from './cat/cat.module.js';
import { AuthModule } from './auth/auth.module.js';
import { LoggerMiddleware } from './_middleware/logger.middleware.js';
import { CatController } from './cat/cat.controller.js';
import { CatController_formdata } from './cat/cat_formdata.controller.js';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, CatModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/{*splat}',
      )
      .forRoutes(
        'ordinary_cats',
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats_formdata', method: RequestMethod.ALL },
        CatController,
        CatController_formdata,
      );
  }
}
