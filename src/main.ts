import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UsersModule } from './users/users.module';
import { ArenaModule } from './arena/arena.module';
import { CourtModule } from './court/court.module';
import { ScheduleModule } from './schedule/schedule.module';

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
    .addTag('Users', 'CRUD de usuários')
    .addTag('Arenas', 'CRUD de arenas')
    .addTag('Courts', 'CRUD de quadras')
    .addTag('Schedule', 'CRUD de agendamentos')
    .build();
  
  const document = SwaggerModule.createDocument(app, config, {
    include: [UsersModule, ArenaModule, CourtModule, ScheduleModule,AppModule],
  });
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3002);
}
bootstrap();