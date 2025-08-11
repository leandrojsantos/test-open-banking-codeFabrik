import { IsEnum, IsNumber, IsPositive, IsString, IsOptional } from 'class-validator';
import { TransactionType } from '../enums/transaction-type.enum';

export class CreateTransactionDto {
    @IsEnum(TransactionType)
    type: TransactionType;

    @IsNumber()
    @IsPositive()
    amount: number;

    @IsString()
    @IsOptional()
    description?: string;
}