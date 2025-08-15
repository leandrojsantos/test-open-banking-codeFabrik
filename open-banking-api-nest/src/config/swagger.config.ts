import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('Open Banking API')
        .setDescription('Documentação da API Open Banking')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);

    // Ajuste o path para incluir o prefixo global
    SwaggerModule.setup('api/v1/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true, // Mantém o token no refresh
        },
    });
}