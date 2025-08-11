import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, password, firstName, lastName } = createUserDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        try {
            await this.save(user);
            return user;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}