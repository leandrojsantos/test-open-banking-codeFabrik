import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from '../accounts/account.entity';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 15, scale: 2 })
    amount: number;

    @Column()
    type: 'deposit' | 'withdrawal' | 'transfer';

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => Account, (account) => account.transactions)
    account: Account;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}