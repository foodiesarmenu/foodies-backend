import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';




export class CreateCartDTO {

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    meal: Types.ObjectId;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    restaurantId: Types.ObjectId;

}


