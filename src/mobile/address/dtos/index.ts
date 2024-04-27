import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstAddress: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  secondAddress: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  buildingNumber: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  streetName: string;

  @ApiProperty()
  @IsNumber()
  floorNumber: number;

  @ApiProperty()
  @IsString()
  apartmentNumber: string;

  @ApiProperty()
  @IsString()
  note: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isPrimary?: boolean;
}

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
