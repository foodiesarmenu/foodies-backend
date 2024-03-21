import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateCartDTO {
    @ApiProperty()
    @IsNotEmpty()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cartItems: [string];

    @ApiProperty()
    @IsNotEmpty()
    quantity: Number;
    
    @ApiProperty()
    @IsNotEmpty()
    price: Number;

    @ApiProperty()
    @IsNotEmpty()
    totalProductDiscount: Number;

    @ApiProperty()
    @IsNotEmpty()
    totalPrice: Number;

    @ApiProperty()
    @IsNotEmpty()
    totalPriceAfterDiscount: Number;

    @ApiProperty()
    @IsNotEmpty()
    discount: Number;



}


export class UpdateCartDto extends PartialType(CreateCartDTO) { }
