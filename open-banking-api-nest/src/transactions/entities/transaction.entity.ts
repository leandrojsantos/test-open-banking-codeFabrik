import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { TransactionType } from '../enums/transaction-type.enum';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: TransactionType })
    type: TransactionType;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    amount: number;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => Account, (account) => account.transactions)
    account: Account;

    @Column({ nullable: true })
    toAccountNumber: string;

    @CreateDateColumn()
    createdAt: Date;
}