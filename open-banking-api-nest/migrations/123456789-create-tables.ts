import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables123456789 implements MigrationInterface {
    name = 'CreateTables123456789';

    public async up(queryRunner: QueryRunner): Promise<void> {
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE transactions`);
        await queryRunner.query(`DROP TABLE accounts`);
        await queryRunner.query(`DROP TABLE users`);
    }
}