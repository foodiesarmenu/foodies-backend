import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsBoolean,
} from 'class-validator';
import { SchemaTypes, Types } from 'mongoose';


export class CreatePromotionDto {
    @ApiProperty({ description: 'The description of the promotion', type: String })
    @IsString()
    @IsNotEmpty()
    description: string;

   
    @ApiProperty({ description: 'The image link of the promotion', type: String })
    @IsString()
    @IsNotEmpty()
    iamge: string;


    @ApiProperty({ description: 'The id of the restaurant', type: String })
    @IsString()
    @IsNotEmpty()
    restaurantId: Types.ObjectId;


    @ApiProperty({ description: 'Whether the promotion is available or not', type: Boolean })
    IsDeleted: boolean;

}

export class UpdatePromotionDto extends PartialType(CreatePromotionDto) { }
