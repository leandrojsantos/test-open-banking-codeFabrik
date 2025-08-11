import { EntityRepository, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Account } from '../accounts/entities/account.entity';

@EntityRepository(Transaction)
export class TransactionsRepository extends Repository<Transaction> {
    async createTransaction(
        account: Account,
        type: string,
        amount: number,
        description?: string,
        toAccountNumber?: string,
    ): Promise<Transaction> {
        const transaction = this.create({
            type,
            amount,
            description,
            account,
            toAccountNumber,
        });

        return this.save(transaction);
    }
}