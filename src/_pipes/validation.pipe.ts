import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodType } from 'zod';
@Injectable()
export class MyValidationPipe implements PipeTransform<any, number> {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('In pipe: ', value);
    console.log('metadata.data: ', metadata.data);
    return parseInt(value);
  }
}

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      console.error(error)
      throw new BadRequestException('Validation failed');
    }
  }
}
