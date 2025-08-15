import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService {
    constructor(private configService: ConfigService) { }

    createDataSource() {
        return new DataSource({
            type: 'postgres',
            host: this.configService.get('DB_HOST', 'db'), // Valor padrão 'db'
            port: this.configService.get<number>('DB_PORT', 5432),
            username: this.configService.get('DB_USER', 'postgres'),
            password: this.configService.get('DB_PASSWORD', 'senhasegura'),
            database: this.configService.get('DB_NAME', 'open_banking'),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/../migrations/*{.ts,.js}'],
            synchronize: this.configService.get('NODE_ENV') === 'development',
            logging: this.configService.get('NODE_ENV') !== 'production',
            migrationsRun: false,
            poolSize: this.configService.get<number>('DB_POOL_SIZE', 10),
            extra: {
                ssl: this.configService.get('DB_SSL') === 'true' ? {
                    rejectUnauthorized: false
                } : false
            }
        });
    }
}

export const dataSource = new TypeOrmConfigService(new ConfigService()).createDataSource();