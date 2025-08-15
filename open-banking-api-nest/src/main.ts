import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { getValidationPipe } from './config/validation.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configurações
  app.useGlobalPipes(getValidationPipe());
  app.setGlobalPrefix('api/v1');

  // Swagger
  setupSwagger(app);

  // CORS
  app.enableCors({
    origin: configService.get('CORS_ORIGIN') || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();