import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

// Configuração dinâmica para Docker
export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST, // 'db' (nome do serviço no compose)
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'], // Caminho das migrations
    synchronize: false, // CRÍTICO: desativar em produção!
    migrationsRun: false, // Controlaremos manualmente
});