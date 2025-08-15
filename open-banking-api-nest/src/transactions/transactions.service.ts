import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Account } from '../accounts/entities/account.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
    ) { }

    async create(createTransactionDto: CreateTransactionDto) {
        const account = await this.accountRepository.findOne({
            where: { id: createTransactionDto.accountId },
        });

        if (!account) {
            throw new Error('Account not found');
        }

        const transaction = this.transactionRepository.create({
            ...createTransactionDto,
            account,
        });

        return this.transactionRepository.save(transaction);
    }

    async findAllByAccount(accountId: string) {
        return this.transactionRepository.find({
            where: { account: { id: accountId } },
            relations: ['account'],
        });
    }
}