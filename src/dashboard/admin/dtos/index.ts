import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { GENDER } from '../../../common/constants/gender.constant';

export class CreateAdminDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  countryCode: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])/gm, {
    message:
      'Password must be between 6 and 64 characters long with 1 special character and capital character each',
  })
  @MinLength(6)
  @MaxLength(64)
  password: string;

  @ApiProperty()
  @IsEnum(GENDER)
  gender: string;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dateOfBirth: Date;
}

export class UpdateAdminDto extends PartialType(CreateAdminDto) { }
