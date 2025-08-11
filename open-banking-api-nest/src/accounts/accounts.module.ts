import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { User } from '../users/entities/user.entity';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Account, User]),
        TransactionsModule,
    ],
    controllers: [AccountsController],
    providers: [AccountsService],
    exports: [AccountsService],
})
export class AccountsModule { }