import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMealDto {



  @ApiProperty({ type: 'string' })
  @IsString()
  image: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  description: string;

  @ApiProperty({ type: 'number' })
  @IsString()
  price: number;

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  @IsArray()
  sizes: { size: string, price: number }[];

  @ApiProperty({ type: 'string' })
  @IsString()
  currency: string;

  @ApiProperty({ type: 'number' })
  @IsString()
  rate: number;

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
}
export class UpdateMealDto extends PartialType(CreateMealDto) { }
