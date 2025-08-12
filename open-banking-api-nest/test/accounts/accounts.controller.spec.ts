import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from '../../src/accounts/accounts.controller';
import { AccountsService } from '../../src/accounts/accounts.service';
import { CreateAccountDto } from '../../src/accounts/dto/create-account.dto';
import { Account } from '../../src/accounts/entities/account.entity';
import { JwtAuthGuard } from '../../src/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../src/common/guards/roles.guard';
import { CurrentUser } from '../../src/common/decorators/current-user.decorator';
import { User } from '../../src/users/entities/user.entity';

describe('AccountsController', () => {
    let controller: AccountsController;
    let accountsService: AccountsService;

    const mockUser: User = {
        id: 'user123',
        email: 'test@example.com',
    } as User;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AccountsController],
            providers: [
                {
                    provide: AccountsService,
                    useValue: {
                        create: jest.fn(),
                        findAllByUser: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(RolesGuard)
            .useValue({ canActivate: () => true })
            .compile();

        controller = module.get<AccountsController>(AccountsController);
        accountsService = module.get<AccountsService>(AccountsService);
    });

    describe('create', () => {
        it('should create an account', async () => {
            const createAccountDto: CreateAccountDto = { type: 'CHECKING' };
            const mockAccount = new Account();

            jest.spyOn(accountsService, 'create').mockResolvedValue(mockAccount);

            const result = await controller.create(createAccountDto, mockUser);
            expect(result).toBe(mockAccount);
            expect(accountsService.create).toHaveBeenCalledWith(createAccountDto, mockUser.id);
        });
    });

    describe('findAll', () => {
        it('should return user accounts', async () => {
            const mockAccounts = [new Account(), new Account()];

            jest.spyOn(accountsService, 'findAllByUser').mockResolvedValue(mockAccounts);

            const result = await controller.findAll(mockUser);
            expect(result).toEqual(mockAccounts);
            expect(accountsService.findAllByUser).toHaveBeenCalledWith(mockUser.id);
        });
    });

    describe('findOne', () => {
        it('should return a specific account', async () => {
            const accountId = 'account123';
            const mockAccount = new Account();

            jest.spyOn(accountsService, 'findOne').mockResolvedValue(mockAccount);

            const result = await controller.findOne(accountId, mockUser);
            expect(result).toBe(mockAccount);
            expect(accountsService.findOne).toHaveBeenCalledWith(accountId, mockUser.id);
        });
    });
});