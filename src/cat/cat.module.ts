import { Module } from '@nestjs/common';
import { CatService } from './cat.service.js';
import { CatController } from './cat.controller.js';
import { CatController_formdata } from './cat_formdata.controller.js';

@Module({
  controllers: [CatController, CatController_formdata],
  providers: [CatService],
})
export class CatModule {}
