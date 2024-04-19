import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsEnum, IsArray, IsBoolean, IsNumber, IsString, IsDate } from 'class-validator';
import { Types } from 'mongoose';
import { AddressDto } from 'src/common';

class OrderItemDto {
    @IsNotEmpty()
    meal: Types.ObjectId;

    @IsOptional()
    @IsNumber()
    quantity?: number;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsNumber()
    totalPrice?: number;
}

export class CreateOrderDto {

    @ApiProperty()
    @IsArray()
    @IsOptional()
    orderItems?: OrderItemDto[];

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    orderTotalPrice?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    totalPriceAfterDiscount?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    discount?: number;

    @ApiProperty()
    @IsOptional()
    restaurant: Types.ObjectId;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    noOfOrderItems?: number;

    @ApiProperty()
    @IsEnum(['cash', 'card'])
    @IsOptional()
    paymentMethod?: string;

    @ApiProperty()
    @IsOptional()
    @Type(() => AddressDto)
    deliveryAddress?: AddressDto;


}