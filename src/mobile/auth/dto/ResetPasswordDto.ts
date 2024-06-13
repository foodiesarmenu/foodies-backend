import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
    MaxLength,
} from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({ example: 'currentPassword' })
    @IsNotEmpty()
    @IsString()
    currentPassword: string;

    @ApiProperty({ example: 'newPassword' })
    @MinLength(6)
    @MaxLength(64)
    @IsNotEmpty()
    @IsString()
    @Matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])/gm,
        {
            message: 'Password must be 6-64 characters long with 1 digit, 1 lowercase, 1 uppercase, and 1 special character',
        }
    )
    newPassword: string;

    @ApiProperty({ example: 'confirmPassword' })
    @IsNotEmpty()
    @IsString()
    confirmPassword: string;
}