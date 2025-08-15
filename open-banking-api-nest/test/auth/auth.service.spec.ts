import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from '../../src/accounts/accounts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from '../../src/accounts/entities/account.entity';
import { User } from '@users/entities/user.entity';
import { AccountsRepository } from '../../src/accounts/accounts.repository';
import { CreateAccountDto } from '../../src/accounts/dto/create-account.dto';

describe('AccountsService', () => {
    let service: AccountsService;
    let accountsRepository: AccountsRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AccountsService,
                {
                    provide: getRepositoryToken(Account),
                    useClass: AccountsRepository,
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: {},
                },
            ],
        }).compile();

        service = module.get<AccountsService>(AccountsService);
        accountsRepository = module.get<AccountsRepository>(getRepositoryToken(Account));
    });

    describe('create', () => {
        it('should create an account successfully', async () => {
            const createAccountDto: CreateAccountDto = { type: 'CHECKING' };
            const userId = 'user123';
            const mockAccount = new Account();

            jest.spyOn(accountsRepository, 'createAccount').mockResolvedValue(mockAccount);

            const result = await service.create(createAccountDto, userId);
            expect(result).toBe(mockAccount);
        });
    });

    describe('findAllByUser', () => {
        it('should return accounts for user', async () => {
            const userId = 'user123';
            const mockAccounts = [new Account(), new Account()];

            jest.spyOn(accountsRepository, 'findByUser').mockResolvedValue(mockAccounts);

            const result = await service.findAllByUser(userId);
            expect(result).toEqual(mockAccounts);
            expect(accountsRepository.findByUser).toHaveBeenCalledWith(userId);
        });
    });
});