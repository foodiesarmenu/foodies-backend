import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { CATEGORY } from 'src/common';

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({ enum: CATEGORY })
    @IsEnum(CATEGORY)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;
}


export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }
