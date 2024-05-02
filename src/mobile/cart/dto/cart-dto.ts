import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { Size } from 'src/common';




export class CreateCartDTO {

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    meal: Types.ObjectId;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    restaurant: Types.ObjectId;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    size: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    quantity: number;

}

export class UpdateCartDTO extends PartialType(CreateCartDTO) { }


