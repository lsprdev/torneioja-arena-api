import { Module } from '@nestjs/common';
import { ArenaController } from './arena.controller';
import { ArenaService } from './arena.service';

@Module({
  controllers: [ArenaController],
  providers: [ArenaService]
})
export class ArenaModule {}
