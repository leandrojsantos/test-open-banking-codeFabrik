import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Account } from '../accounts/entities/account.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionType } from './enums/transaction-type.enum';
import { TransferDto } from './dto/transfer.dto';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
    ) { }

    async create(createTransactionDto: CreateTransactionDto, accountId: string): Promise<Transaction> {
        const account = await this.accountRepository.findOne({ where: { id: accountId } });

        if (!account) {
            throw new NotFoundException('Account not found');
        }

        const transaction = this.transactionRepository.create({
            ...createTransactionDto,
            account,
        });

        // Atualizar saldo da conta
        if (createTransactionDto.type === TransactionType.DEPOSIT) {
            account.balance += createTransactionDto.amount;
        } else if (createTransactionDto.type === TransactionType.WITHDRAWAL) {
            if (account.balance < createTransactionDto.amount) {
                throw new BadRequestException('Insufficient funds');
            }
            account.balance -= createTransactionDto.amount;
        }

        await this.accountRepository.save(account);
        return this.transactionRepository.save(transaction);
    }

    async transfer(transferDto: TransferDto, fromAccountId: string): Promise<{ fromTransaction: Transaction; toTransaction: Transaction }> {
        const fromAccount = await this.accountRepository.findOne({ where: { id: fromAccountId } });
        const toAccount = await this.accountRepository.findOne({ where: { accountNumber: transferDto.toAccountNumber } });

        if (!fromAccount || !toAccount) {
            throw new NotFoundException('One or both accounts not found');
        }

        if (fromAccount.balance < transferDto.amount) {
            throw new BadRequestException('Insufficient funds');
        }

        // Atualizar saldos
        fromAccount.balance -= transferDto.amount;
        toAccount.balance += transferDto.amount;

        await this.accountRepository.save([fromAccount, toAccount]);

        // Criar transações
        const fromTransaction = this.transactionRepository.create({
            type: TransactionType.TRANSFER_OUT,
            amount: transferDto.amount,
            description: `Transfer to ${toAccount.accountNumber}`,
            account: fromAccount,
            toAccountNumber: toAccount.accountNumber,
        });

        const toTransaction = this.transactionRepository.create({
            type: TransactionType.TRANSFER_IN,
            amount: transferDto.amount,
            description: `Transfer from ${fromAccount.accountNumber}`,
            account: toAccount,
            toAccountNumber: fromAccount.accountNumber,
        });

        await this.transactionRepository.save([fromTransaction, toTransaction]);

        return { fromTransaction, toTransaction };
    }

    async findAllByAccount(accountId: string): Promise<Transaction[]> {
        return this.transactionRepository.find({
            where: { account: { id: accountId } },
            order: { createdAt: 'DESC' },
        });
    }
}