import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './src/auth/auth.module';
import { UsersModule } from './src/users/users.module';
import { AccountsModule } from './src/accounts/accounts.module';
import { TransactionsModule } from './src/transactions/transactions.module';
import { getTypeOrmConfig } from '@config/database.config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: getTypeOrmConfig,
        }),
        AuthModule,
        UsersModule,
        AccountsModule,
        TransactionsModule,
    ],
})
export class AppModule { }