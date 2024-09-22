import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Arena Já API')
    .setDescription('API para agendamentos de quadras.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('users', 'Operações com usuários')
    .build();
  
  const document = SwaggerModule.createDocument(app, config, {
    include: [UsersModule, AppModule],
  });
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3002);
}
bootstrap();