import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
    @ApiProperty({
        description: 'JWT access token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    accessToken: string;

    @ApiProperty({
        description: 'Token expiration time',
        example: '1d',
    })
    expiresIn: string;

    @ApiProperty({
        description: 'User ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    userId: string;
}