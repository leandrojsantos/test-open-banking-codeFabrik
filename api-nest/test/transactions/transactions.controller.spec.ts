import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from '../../src/transactions/transactions.controller';
import { TransactionsService } from '../../src/transactions/transactions.service';
import { CreateTransactionDto } from '../../src/transactions/dto/create-transaction.dto';
import { TransferDto } from '../../src/transactions/dto/transfer.dto';
import { User } from '@users/entities/user.entity';

describe('TransactionsController', () => {
    let controller: TransactionsController;
    let transactionsService: TransactionsService;

    const mockUser: User = {
        id: 'user123',
        email: 'test@example.com',
        password: 'hashed',
        firstName: 'Test',
        lastName: 'User',
        accounts: [],
        roles: [],
    } as User;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TransactionsController],
            providers: [
                {
                    provide: TransactionsService,
                    useValue: {
                        create: jest.fn(),
                        transfer: jest.fn(),
                        findAllByAccount: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<TransactionsController>(TransactionsController);
        transactionsService = module.get<TransactionsService>(TransactionsService);
    });

    describe('create', () => {
        it('should create a transaction', async () => {
            const accountId = 'account123';
            const createDto: CreateTransactionDto = {
                type: 'DEPOSIT',
                amount: 100,
            };

            await controller.create(accountId, createDto, mockUser);
            expect(transactionsService.create).toHaveBeenCalledWith(createDto, accountId);
        });
    });

    describe('transfer', () => {
        it('should process a transfer', async () => {
            const accountId = 'account123';
            const transferDto: TransferDto = {
                toAccountNumber: '987654',
                amount: 50,
            };

            await controller.transfer(accountId, transferDto, mockUser);
            expect(transactionsService.transfer).toHaveBeenCalledWith(transferDto, accountId);
        });
    });
});