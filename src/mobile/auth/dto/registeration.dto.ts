import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { GENDER } from '../../../common/constants/gender.constant';
import { Transform } from 'class-transformer';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsStrongPassword()
    password: string

    @IsNotEmpty()
    @IsString()
    phoneNumber: string

    @IsNotEmpty()
    @IsString()
    countryCode: string

    @ApiProperty()
    @IsEnum(GENDER)
    gender: string;

    @ApiProperty()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    dateOfBirth: Date;

    @IsOptional()
    isEmailVerified?: boolean
    
    @IsOptional()
    isPhoneVerified?: boolean
}
