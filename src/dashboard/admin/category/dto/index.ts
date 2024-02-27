import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
    IsNotEmpty,
    IsBoolean,
    IsEnum,
    IsMongoId,
} from 'class-validator';
import { CAT } from '../../../../common/constants/categories.constants';
import { SchemaTypes, Types } from 'mongoose';


export class CreateCatDTO {

    @ApiProperty({ description: 'The name of the category', type: String, enum: CAT })
    @IsEnum(CAT)
    @IsNotEmpty()
    name: string;

}

export class UpdateCategoryDTO extends PartialType(CreateCatDTO) { }


