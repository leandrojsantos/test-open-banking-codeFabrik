import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UsersModule } from './src/users/users.module'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './src/common/filters/http-exception.filter'
import { LoggingInterceptor } from './src/common/interceptors/logging-interceptor';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            ignoreEnvFile: process.env.NODE_ENV === 'production',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST', 'db'),
                port: configService.get('DB_PORT', 5432),
                username: configService.get('DB_USER', 'postgres'),
                password: configService.get('DB_PASSWORD', 'senhasegura'),
                database: configService.get('DB_NAME', 'open_banking'),
                autoLoadEntities: true,
                synchronize: configService.get('NODE_ENV') === 'development',
                logging: configService.get('NODE_ENV') !== 'production',
                migrationsRun: true,
                migrations: ['dist/src/migrations/*{.ts,.js}'],

            }),
            dataSourceFactory: async (options) => {
                const dataSource = new DataSource(options!);
                await dataSource.initialize();
                await dataSource.runMigrations();
                return dataSource;
            },
        }),
        UsersModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
    ],
})
export class AppModule { }