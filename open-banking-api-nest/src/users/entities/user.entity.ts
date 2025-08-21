import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Account } from '../../../src/accounts/entities/account.entity';

@Entity()
export class User {                           // Export obrigatório!
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })                   // Email único
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Account, (account) => account.user)
    accounts: Account[];

    @Column("simple-array", { default: "" })
    roles: string[];
}