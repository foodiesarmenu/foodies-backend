import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, IsBoolean, IsEnum } from 'class-validator';
import { CITY } from '../../../common/constants/cities.constants';

export class AddRestaurantDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;


  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsEnum(CITY)
  city: string;

  @ApiProperty()
  @IsBoolean()
  canDeliver: boolean;
}
