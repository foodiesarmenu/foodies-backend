import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsOptional, IsBoolean } from 'class-validator';
import { Types } from 'mongoose';

export class CreateFavoriteDto {


    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsMongoId()
    restaurant: Types.ObjectId;

}