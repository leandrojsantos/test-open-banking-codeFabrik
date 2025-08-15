import { ValidationPipe } from '@nestjs/common';

export const getValidationPipe = () => new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
        enableImplicitConversion: true,
    },
});