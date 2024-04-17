import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateCouponDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  expires: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  discount: number;

}

export class UpdateCouponDto extends PartialType(CreateCouponDto) { }
