import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export default new DataSource({
    // Prioriza variáveis de ambiente, sem valores padrão
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),

    // Configurações de paths (TS em desenvolvimento)
    entities: ['src/**/*.entity.ts'],
    migrations: ['migrations/*.ts'],

    // Configurações extras
    synchronize: false,
    logging: true
});