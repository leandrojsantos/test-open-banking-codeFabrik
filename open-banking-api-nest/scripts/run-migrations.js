const { DataSource } = require('typeorm');
const path = require('path');
const configPath = path.resolve(__dirname, '../dist/ormconfig.js');
const config = require(configPath);

async function runMigrations() {
    const dataSource = new DataSource(config);
    try {
        console.log('Inicializando DataSource...');
        await dataSource.initialize();

        console.log('Executando migrações...');
        const results = await dataSource.runMigrations();
        console.log(`${results.length} migrações aplicadas`);

        return true;
    } catch (error) {
        console.error('Erro nas migrações:', error);
        return false;
    } finally {
        await dataSource.destroy();
    }
}

runMigrations().then(success => {
    process.exit(success ? 0 : 1);
});