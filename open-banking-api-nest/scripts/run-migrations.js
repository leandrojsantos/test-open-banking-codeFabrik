const { DataSource } = require('typeorm');
const dbConfig = require('../dist/ormconfig');

async function runMigrations() {
    const dataSource = new DataSource(dbConfig);

    try {
        await dataSource.initialize();
        console.log('Conexão com o banco estabelecida');

        const results = await dataSource.runMigrations();
        console.log(`${results.length} migrações executadas com sucesso`);

        process.exit(0);
    } catch (error) {
        console.error('Falha nas migrações:', error);
        process.exit(1);
    } finally {
        await dataSource.destroy();
    }
}

runMigrations();