import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    lastName: string;
}