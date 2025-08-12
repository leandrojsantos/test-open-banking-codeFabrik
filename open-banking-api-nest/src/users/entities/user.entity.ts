import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column('simple-array', { nullable: true })
    roles: string[];

    @OneToMany(() => Account, (account) => account.user)
    accounts: Account[];
}