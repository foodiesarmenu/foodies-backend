import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCouponeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  expires: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  descount: Number;

  }

export class UpdateCouponeDto extends PartialType(CreateCouponeDto) { }
