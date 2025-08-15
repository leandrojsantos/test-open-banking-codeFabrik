import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Initial database Open Banking API
 * Creates users, accounts, and transactions tables
 */
export class CreateInitialTables1698765432100 implements MigrationInterface {
  name = 'CreateInitialTables1698765432100';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Enable UUID extension
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // 2. Create tables
    await queryRunner.query(`
      CREATE TABLE users (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        email varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        "firstName" varchar(100) NOT NULL,
        "lastName" varchar(100) NOT NULL,
        roles text[] NOT NULL DEFAULT '{user}',
        "isActive" boolean NOT NULL DEFAULT true,
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now()
      );
      
      CREATE TABLE accounts (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "accountNumber" varchar(20) UNIQUE NOT NULL,
        type varchar(50) NOT NULL,
        balance numeric(15,2) NOT NULL DEFAULT 0,
        "isActive" boolean NOT NULL DEFAULT true,
        "userId" uuid REFERENCES users(id) ON DELETE CASCADE,
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now()
      );
      
      CREATE TABLE transactions (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        type varchar(50) NOT NULL,
        amount numeric(15,2) NOT NULL,
        description varchar(255),
        "accountId" uuid REFERENCES accounts(id) ON DELETE CASCADE,
        "toAccountNumber" varchar(20),
        "createdAt" timestamp NOT NULL DEFAULT now()
      );
    `);

    // 3. Create indexes (Opcional, mas recomendado)
    await queryRunner.query(`
      CREATE INDEX idx_account_user_id ON accounts("userId");
      CREATE INDEX idx_transaction_account_id ON transactions("accountId");
    `);

    // 4. Add constraints (Opcional)
    await queryRunner.query(`
      ALTER TABLE transactions ADD CONSTRAINT chk_amount CHECK (amount > 0);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop in reverse order with CASCADE
    await queryRunner.query(`DROP TABLE transactions CASCADE`);
    await queryRunner.query(`DROP TABLE accounts CASCADE`);
    await queryRunner.query(`DROP TABLE users CASCADE`);
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
  }
}