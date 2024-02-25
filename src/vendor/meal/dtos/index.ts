import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

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
  @IsNumber()
  price: number;

  @ApiProperty({ type: 'string' })
  @IsString()
  currency: string;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  rate: number;

  @ApiProperty({ type: 'array', items: { type: 'string' } })
  @IsArray()
  tags: string[];
}
export class UpdateMealDto extends PartialType(CreateMealDto) { }
