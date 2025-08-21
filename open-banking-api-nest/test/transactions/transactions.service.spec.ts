import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from '../../src/transactions/transactions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transaction } from '../../src/transactions/entities/transaction.entity';
import { Account } from '../../src/accounts/entities/account.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from '../../src/transactions/dto/create-transaction.dto';
import { TransferDto } from '../../src/transactions/dto/transfer.dto';
import { TransactionType } from '../../src/transactions/enums/transaction-type.enum';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('TransactionsService', () => {
    let service: TransactionsService;
    let transactionRepo: Repository<Transaction>;
    let accountRepo: Repository<Account>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TransactionsService,
                {
                    provide: getRepositoryToken(Transaction),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Account),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<TransactionsService>(TransactionsService);
        transactionRepo = module.get<Repository<Transaction>>(getRepositoryToken(Transaction));
        accountRepo = module.get<Repository<Account>>(getRepositoryToken(Account));
    });

    describe('create', () => {
        it('should create a deposit transaction', async () => {
            const createDto: CreateTransactionDto = {
                type: TransactionType.DEPOSIT,
                amount: 100,
            };
            const accountId = 'account123';
            const mockAccount = new Account();
            mockAccount.id = accountId;
            mockAccount.balance = 0;

            jest.spyOn(accountRepo, 'findOne').mockResolvedValue(mockAccount);
            jest.spyOn(transactionRepo, 'create').mockReturnValue(new Transaction());
            jest.spyOn(transactionRepo, 'save').mockResolvedValue(new Transaction());
            jest.spyOn(accountRepo, 'save').mockResolvedValue(mockAccount);

            const result = await service.create(createDto, accountId);
            expect(result).toBeInstanceOf(Transaction);
            expect(mockAccount.balance).toBe(100);
        });

        it('should throw error for insufficient funds on withdrawal', async () => {
            const createDto: CreateTransactionDto = {
                type: TransactionType.WITHDRAWAL,
                amount: 100,
            };
            const accountId = 'account123';
            const mockAccount = new Account();
            mockAccount.id = accountId;
            mockAccount.balance = 50;

            jest.spyOn(accountRepo, 'findOne').mockResolvedValue(mockAccount);

            await expect(service.create(createDto, accountId)).rejects.toThrow(BadRequestException);
        });
    });

    describe('transfer', () => {
        it('should complete a transfer between accounts', async () => {
            const transferDto: TransferDto = {
                toAccountNumber: '987654',
                amount: 50,
            };
            const fromAccountId = 'account123';

            const fromAccount = new Account();
            fromAccount.id = fromAccountId;
            fromAccount.balance = 100;
            fromAccount.accountNumber = '123456';

            const toAccount = new Account();
            toAccount.id = 'account456';
            toAccount.balance = 0;
            toAccount.accountNumber = '987654';

            jest.spyOn(accountRepo, 'findOne')
                .mockResolvedValueOnce(fromAccount) // First call for fromAccount
                .mockResolvedValueOnce(toAccount); // Second call for toAccount

            jest.spyOn(transactionRepo, 'create').mockReturnValue(new Transaction());
            jest.spyOn(transactionRepo, 'save').mockResolvedValue(new Transaction());
            jest.spyOn(accountRepo, 'save').mockResolvedValue(new Account());

            const result = await service.transfer(transferDto, fromAccountId);
            expect(result.fromTransaction).toBeDefined();
            expect(result.toTransaction).toBeDefined();
        });

        it('should throw error if accounts not found', async () => {
            const transferDto: TransferDto = {
                toAccountNumber: '987654',
                amount: 50,
            };
            const fromAccountId = 'account123';

            jest.spyOn(accountRepo, 'findOne').mockResolvedValue(null);

            await expect(service.transfer(transferDto, fromAccountId)).rejects.toThrow(NotFoundException);
        });
    });
});