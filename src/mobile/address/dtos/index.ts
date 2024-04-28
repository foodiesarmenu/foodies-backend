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
  @IsString()
  @IsNotEmpty()
  buildingNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  streetName: string;

  @ApiProperty()
  @IsString()
  floorNumber: string;

  @ApiProperty()
  @IsString()
  apartmentNumber: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  note: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}

export class UpdateAddressDto extends PartialType(CreateAddressDto) { }
