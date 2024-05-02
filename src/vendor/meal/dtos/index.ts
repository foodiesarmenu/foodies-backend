import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { SchemaTypes, Types } from 'mongoose';
import { Size } from 'src/common';

export class CreateMealDto {



  @ApiProperty({ type: 'string' })
  @IsString()
  image: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ type: SchemaTypes.ObjectId })
  restaurant: Types.ObjectId;

  @ApiProperty({ type: 'string' })
  @IsString()
  description: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  currency: string;

  @ApiProperty({ type: 'number' })
  @IsString()
  @IsOptional()
  rate?: number;

  @ApiProperty({ type: 'number' })
  @IsString()
  calories: number;

  @ApiProperty({ type: 'number' })
  @IsString()
  protein: number;

  @ApiProperty({ type: 'number' })
  @IsString()
  fat: number;

  @ApiProperty({ type: 'number' })
  @IsString()
  carbohydrates: number;

  @ApiProperty({ type: 'array', items: { type: 'string' } })
  @IsArray()
  tags: string[];

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  @IsArray()
  sizes: { size: Size, price: number }[]; // 
}
export class UpdateMealDto extends PartialType(CreateMealDto) { }
