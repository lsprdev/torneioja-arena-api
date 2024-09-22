import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArenaModule } from './arena/arena.module';
import { CourtModule } from './court/court.module';
import { ScheduleModule } from './schedule/schedule.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, ArenaModule, CourtModule, ScheduleModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
