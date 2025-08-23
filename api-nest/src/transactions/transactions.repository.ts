import { EntityRepository, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionType } from './entities/transaction.entity';

@EntityRepository(Transaction)
export class TransactionsRepository extends Repository<Transaction> {
    async createTransaction(
        amount: number,
        type: TransactionType,
        account: any,
        description?: string
    ): Promise<Transaction> {
        const transaction = this.create({
            amount,
            type,
            account,
            description
        });
        return this.save(transaction);
    }
}