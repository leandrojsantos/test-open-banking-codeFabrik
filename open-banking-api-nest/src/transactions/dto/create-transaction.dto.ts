import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

export class CreateTransactionDto {
    @IsNotEmpty()
    accountId: string;

    @IsNumber()
    amount: number;

    @IsString()
    type: TransactionType;

    @IsString()
    description?: string;
}