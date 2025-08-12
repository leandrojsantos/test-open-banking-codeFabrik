import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { LoginUserDto } from '../../src/users/dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

describe('UsersService', () => {
    let service: UsersService;
    let userRepository: Repository<User>;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('mockToken'),
                    },
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
        jwtService = module.get<JwtService>(JwtService);
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const createUserDto: CreateUserDto = {
                email: 'test@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
            };

            const mockUser = new User();
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
            jest.spyOn(userRepository, 'create').mockReturnValue(mockUser);
            jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser);

            const result = await service.create(createUserDto);
            expect(result).toBe(mockUser);
        });

        it('should throw ConflictException if email exists', async () => {
            const createUserDto: CreateUserDto = {
                email: 'existing@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
            };

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(new User());

            await expect(service.create(createUserDto)).rejects.toThrow(ConflictException);
        });
    });

    describe('validateUser', () => {
        it('should return user and token for valid credentials', async () => {
            const loginUserDto: LoginUserDto = {
                email: 'test@example.com',
                password: 'password123',
            };

            const mockUser = new User();
            mockUser.email = loginUserDto.email;
            mockUser.password = await bcrypt.hash(loginUserDto.password, 10);

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

            const result = await service.validateUser(loginUserDto);
            expect(result.user).toBeDefined();
            expect(result.token).toBe('mockToken');
        });

        it('should throw NotFoundException for invalid email', async () => {
            const loginUserDto: LoginUserDto = {
                email: 'nonexistent@example.com',
                password: 'password123',
            };

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

            await expect(service.validateUser(loginUserDto)).rejects.toThrow(NotFoundException);
        });

        it('should throw UnauthorizedException for invalid password', async () => {
            const loginUserDto: LoginUserDto = {
                email: 'test@example.com',
                password: 'wrongpassword',
            };

            const mockUser = new User();
            mockUser.email = loginUserDto.email;
            mockUser.password = await bcrypt.hash('password123', 10);

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

            await expect(service.validateUser(loginUserDto)).rejects.toThrow(UnauthorizedException);
        });
    });

    describe('findOne', () => {
        it('should return a user', async () => {
            const userId = 'user123';
            const mockUser = new User();

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

            const result = await service.findOne(userId);
            expect(result).toBe(mockUser);
        });

        it('should throw NotFoundException if user not found', async () => {
            const userId = 'nonexistent';

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

            await expect(service.findOne(userId)).rejects.toThrow(NotFoundException);
        });
    });
});