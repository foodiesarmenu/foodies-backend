import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
    IsNotEmpty,
    IsBoolean,
    IsEnum,
    IsMongoId,
} from 'class-validator';
import { CITY } from '../../../common/constants/city.constants';
import { SchemaTypes, Types } from 'mongoose';


export class CreateRestaurantDto {
    @ApiProperty({ description: 'The name of the restaurant', type: String })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'The email of the restaurant', type: String })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'The address of the restaurant', type: String })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ description: 'The avatar of the restaurant', type: String })
    @IsString()
    @IsNotEmpty()
    avatar: string;

    @ApiProperty({ description: 'The phone number of the restaurant', type: String })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty({ description: 'The password of the restaurant', type: String })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ description: 'Whether the restaurant can deliver or not', type: Boolean })
    @IsBoolean()
    canDeliver: boolean;

    @ApiProperty({ description: 'The city of the restaurant', type: String, enum: CITY })
    @IsEnum(CITY)
    @IsNotEmpty()
    city: string;

    @ApiProperty({ description: 'The category of the restaurant', type: [SchemaTypes.ObjectId] })
    @IsMongoId({ each: true })
    category: Types.ObjectId[];

    @ApiProperty({ description: 'The status of the restaurant', type: String, default: 'active' })
    status: string;
}

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) { }
