import { getTypeOrmConfig } from '@config/database.config'; // Caminho correto absorvido pelo alias no tsconfig.json
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: getTypeOrmConfig,
        }),

        UsersModule,                          // Importe o UsersModule
    ],
})
export class AppModule { }