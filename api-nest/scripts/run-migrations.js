console.log('🚀 Starting migrations with NEW approach...');

// Approach DIFERENTE - usando importação alternativa
const typeorm = require('typeorm');
console.log('✅ TypeORM imported successfully');

// Configuração ABSOLUTAMENTE explícita
const config = {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'senhasegura',
    database: 'open_banking',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    synchronize: false,
    logging: true
};

console.log('📋 Configuration:', JSON.stringify({
    ...config,
    password: '***'
}, null, 2));

// Verificação EXTRA
if (typeof config.type === 'undefined') {
    console.error('❌ ERROR: type is undefined!');
    process.exit(1);
}

console.log(`✅ Database type: ${config.type}`);

async function runMigrations() {
    let dataSource;

    try {
        console.log('🔄 Creating DataSource...');

        // Approach DIFERENTE - usando a exportação principal
        const DataSource = typeorm.DataSource;
        dataSource = new DataSource(config);

        console.log('🔄 Initializing connection...');
        await dataSource.initialize();
        console.log('✅ Connected to database successfully!');

        console.log('🔄 Running migrations...');
        const migrations = await dataSource.runMigrations();
        console.log(`✅ ${migrations.length} migration(s) applied successfully`);

        console.log('🔄 Closing connection...');
        await dataSource.destroy();
        console.log('✅ Connection closed');

        console.log('🎉 MIGRATIONS COMPLETED SUCCESSFULLY!');
        process.exit(0);

    } catch (error) {
        console.error('❌ MIGRATION FAILED:', error.message);
        console.error('Stack:', error.stack);

        if (dataSource && dataSource.isInitialized) {
            try {
                await dataSource.destroy();
            } catch (e) {
                console.error('Error closing connection:', e.message);
            }
        }

        process.exit(1);
    }
}

runMigrations();