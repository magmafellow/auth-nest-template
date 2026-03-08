import { Module } from '@nestjs/common';
import { CatService } from './cat.service.js';
import { CatController } from './cat.controller.js';

@Module({
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
