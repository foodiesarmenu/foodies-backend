import { IsOptional, IsString } from "class-validator";

export class AddressDto {
    @IsString()
    firstAddress: string;

    @IsString()
    secondAddress: string;

    @IsString()
    buildingNumber: string;

    @IsString()
    streetName: string;

    @IsString()
    floorNumber: string;

    @IsOptional()
    @IsString()
    apartmentNumber?: string;

    @IsOptional()
    @IsString()
    note?: string;
}