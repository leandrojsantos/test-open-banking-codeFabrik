import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
        .setTitle('Open Banking API')
        .setDescription('Documentação da API Open Banking')
        .setVersion('1.0')
        .addBearerAuth()
        .addServer('/api/v1')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/v1/docs', app, document, {
        customSiteTitle: 'Open Banking API',
        swaggerOptions: {
            persistAuthorization: true,
            displayRequestDuration: true,
            filter: true,
        },
    });
}