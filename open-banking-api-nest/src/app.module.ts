import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/../migrations/*{.ts,.js}'],
                synchronize: configService.get('NODE_ENV') !== 'production',
                logging: configService.get('NODE_ENV') !== 'production',
                autoLoadEntities: true,
            }),
            dataSourceFactory: async (options) => {
                if (!options) {
                    throw new Error('DataSource options are undefined');
                }
                const dataSource = await new DataSource(options).initialize();
                return dataSource;
            },
        }),
        UsersModule,
    ],
    providers: [
        {
            provide: DataSource,
            useFactory: (dataSource: DataSource) => dataSource,
            inject: ['DATA_SOURCE'],
        },
    ],
})
export class AppModule { }