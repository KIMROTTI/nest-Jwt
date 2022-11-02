import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateCatDto {
  // id: number;

  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  breed: string;
}
