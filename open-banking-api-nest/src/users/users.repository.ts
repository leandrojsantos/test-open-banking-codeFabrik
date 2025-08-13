import { EntityRepository, Repository } from 'typeorm';
import { User } from '@users/entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser(userData: {
        email: string;
        password: string;
        roles?: string[];
    }): Promise<User> {
        const user = this.create({
            email: userData.email,
            password: userData.password,
            roles: userData.roles || [],
        });

        return this.save(user);
    }
}