import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { UsersService } from '../../src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../../src/users/dto/login-user.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
    let authService: AuthService;
    let usersService: UsersService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: {
                        validateUser: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('mockToken'),
                    },
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
        jwtService = module.get<JwtService>(JwtService);
    });

    describe('login', () => {
        it('should return user and token when credentials are valid', async () => {
            const mockUser = { id: '1', email: 'test@test.com', password: 'hashed' };
            const loginDto: LoginUserDto = { email: 'test@test.com', password: 'password' };

            jest.spyOn(usersService, 'validateUser').mockResolvedValue({
                user: mockUser,
                token: 'mockToken',
            });

            const result = await authService.login(loginDto);
            expect(result).toEqual({
                user: mockUser,
                token: 'mockToken',
            });
            expect(usersService.validateUser).toHaveBeenCalledWith(loginDto);
        });

        it('should throw UnauthorizedException when credentials are invalid', async () => {
            const loginDto: LoginUserDto = { email: 'test@test.com', password: 'wrong' };

            jest.spyOn(usersService, 'validateUser').mockRejectedValue(
                new UnauthorizedException('Invalid credentials'),
            );

            await expect(authService.login(loginDto)).rejects.toThrow(UnauthorizedException);
        });
    });
});