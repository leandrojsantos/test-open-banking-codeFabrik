import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
    ) { }

    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        const account = this.accountRepository.create(createAccountDto);
        return this.accountRepository.save(account);
    }

    async findAll(): Promise<Account[]> {
        return this.accountRepository.find();
    }

    async findOne(id: string): Promise<Account> {
        const account = await this.accountRepository.findOne({ where: { id } });
        if (!account) {
            throw new NotFoundException(`Account with ID ${id} not found`);
        }
        return account;
    }

    async updateBalance(id: string, amount: number): Promise<Account> {
        const account = await this.findOne(id);
        account.balance = Number(account.balance) + Number(amount);
        return this.accountRepository.save(account);
    }
}