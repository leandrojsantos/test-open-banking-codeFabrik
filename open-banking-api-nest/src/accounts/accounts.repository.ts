import { EntityRepository, Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { User } from '../users/entities/user.entity';
import { generateAccountNumber } from '../common/utils/account.utils';
import { AccountType } from './enums/account-type.enum';

@EntityRepository(Account)
export class AccountsRepository extends Repository<Account> {
    async createAccount(
        createAccountDto: CreateAccountDto,
        user: User,
    ): Promise<Account> {
        const { type = AccountType.CHECKING } = createAccountDto;

        const account = this.create({
            accountNumber: generateAccountNumber(),
            type,
            user,
            balance: 0,
        });

        return this.save(account);
    }

    async findByUser(userId: string): Promise<Account[]> {
        return this.find({ where: { user: { id: userId } } });
    }

    async findByIdAndUser(id: string, userId: string): Promise<Account | null> {
        return this.findOne({ where: { id, user: { id: userId } } });
    }
}