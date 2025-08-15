require('dotenv').config();

module.exports = {
    type: 'postgres',
    // Primeiro tenta pegar do .env, depois usa valor padrão
    host: process.env.DB_HOST || 'db',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'senhasegura',
    database: process.env.DB_NAME || 'open_banking',

    // Configurações de paths
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],

    // Configurações de segurança
    synchronize: false, // NUNCA true em produção
    logging: process.env.NODE_ENV !== 'production',
    migrationsTableName: 'migrations_history',

    // Configurações de pool de conexão
    extra: {
        connectionLimit: 10,
        connectTimeout: 5000
    }
};