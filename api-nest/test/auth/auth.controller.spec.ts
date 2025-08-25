import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { LoginUserDto } from '../../src/users/dto/login-user.dto';
import { LoginResponseDto } from '../../src/auth/dto/login-response.dto';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        login: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    describe('login', () => {
        it('should return login response', async () => {
            const loginDto: LoginUserDto = {
                email: 'test@example.com',
                password: 'password123',
            };

            const mockResponse: LoginResponseDto = {
                accessToken: 'mockToken',
                expiresIn: '1d',
                userId: '123',
            };

            jest.spyOn(authService, 'login').mockResolvedValue({
                user: { id: '123', email: 'test@example.com' },
                token: 'mockToken',
            });

            const result = await controller.login(loginDto);
            expect(result).toEqual(mockResponse);
            expect(authService.login).toHaveBeenCalledWith(loginDto);
        });
    });
});