import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';

describe('AccountsService', () => {
    let service: AccountsService;
    let repository: Repository<Account>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AccountsService,
                {
                    provide: getRepositoryToken(Account),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<AccountsService>(AccountsService);
        repository = module.get<Repository<Account>>(getRepositoryToken(Account));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should successfully create an account', async () => {
            const createAccountDto: CreateAccountDto = {
                accountNumber: '123456789',
                type: 'checking',
                ownerId: 'user-1',
            };

            const savedAccount = {
                id: '1',
                ...createAccountDto,
                balance: 0,
                createdAt: new Date(),
            };

            jest.spyOn(repository, 'create').mockReturnValue(savedAccount);
            jest.spyOn(repository, 'save').mockResolvedValue(savedAccount);

            const result = await service.create(createAccountDto);
            expect(result).toEqual(savedAccount);
            expect(repository.create).toHaveBeenCalledWith(createAccountDto);
            expect(repository.save).toHaveBeenCalledWith(savedAccount);
        });
    });

    describe('findAll', () => {
        it('should return an array of accounts', async () => {
            const accounts = [
                { id: '1', accountNumber: '123456789', type: 'checking', ownerId: 'user-1', balance: 0, createdAt: new Date() },
                { id: '2', accountNumber: '987654321', type: 'savings', ownerId: 'user-2', balance: 100, createdAt: new Date() },
            ];

            jest.spyOn(repository, 'find').mockResolvedValue(accounts);

            const result = await service.findAll();
            expect(result).toEqual(accounts);
            expect(repository.find).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a single account by id', async () => {
            const account = { id: '1', accountNumber: '123456789', type: 'checking', ownerId: 'user-1', balance: 0, createdAt: new Date() };

            jest.spyOn(repository, 'findOne').mockResolvedValue(account);

            const result = await service.findOne('1');
            expect(result).toEqual(account);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
        });

        it('should throw an error if account not found', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);

            await expect(service.findOne('non-existing-id')).rejects.toThrow('Account not found');
        });
    }
    );

    describe('update', () => {
        it('should update an account', async () => {
            const updateAccountDto = { accountNumber: '123456789', type: 'checking' };
            const existingAccount = { id: '1', ...updateAccountDto, ownerId: 'user-1', balance: 0, createdAt: new Date() };
            const updatedAccount = { ...existingAccount, ...updateAccountDto };

            jest.spyOn(repository, 'findOne').mockResolvedValue(existingAccount);
            jest.spyOn(repository, 'save').mockResolvedValue(updatedAccount);

            const result = await service.update('1', updateAccountDto);
            expect(result).toEqual(updatedAccount);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
            expect(repository.save).toHaveBeenCalledWith(updatedAccount);
        });

        it('should throw an error if account to update does not exist', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);

            await expect(service.update('non-existing-id', {})).rejects.toThrow('Account not found');
        });
    }
    );

    describe('remove', () => {
        it('should remove an account', async () => {
            const account = { id: '1', accountNumber: '123456789', type: 'checking', ownerId: 'user-1', balance: 0, createdAt: new Date() };

            jest.spyOn(repository, 'findOne').mockResolvedValue(account);
            jest.spyOn(repository, 'remove').mockResolvedValue(account);

            const result = await service.remove('1');
            expect(result).toEqual(account);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
            expect(repository.remove).toHaveBeenCalledWith(account);
        });

        it('should throw an error if account to remove does not exist', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);

            await expect(service.remove('non-existing-id')).rejects.toThrow('Account not found');
        });
    }
    );
});