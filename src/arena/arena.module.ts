import { Module } from '@nestjs/common';
import { ArenaController } from './arena.controller';
import { ArenaService } from './arena.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ArenaService],
  controllers: [ArenaController],
  exports: [ArenaService],
})
export class ArenaModule {}
