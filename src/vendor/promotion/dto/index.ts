import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { SchemaTypes, Types } from "mongoose";


export class createPromotionDto {
    @ApiProperty({ type: 'string' })
    @IsString()
    title: string;

    @ApiProperty({ type: 'string' })
    @IsString()
    description: string;

    @ApiProperty({ type: 'string' })
    @IsString()
    image: string;

}

export class UpdatePromotionDto extends PartialType(createPromotionDto) { }
