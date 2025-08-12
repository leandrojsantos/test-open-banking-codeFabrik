import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AppController } from './app.controller';
import { getTypeOrmConfig } from './config/database.config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getTypeOrmConfig, // Alterado para getTypeOrmConfig
        }),
        UsersModule,
        AuthModule,
        AccountsModule,
        TransactionsModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env', // Removido duplicado
        }),
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }