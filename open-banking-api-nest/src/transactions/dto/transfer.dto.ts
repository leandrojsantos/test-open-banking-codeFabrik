import { IsString, IsNumber, IsPositive } from 'class-validator';

export class TransferDto {
    @IsString()
    toAccountNumber: string;

    @IsNumber()
    @IsPositive()
    amount: number;

    @IsString()
    description?: string;
}