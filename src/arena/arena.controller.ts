import { Controller, Get, Post, Put, Delete, UseGuards, Param, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ArenaService } from './arena.service';

class Arenas {
    @ApiProperty()
    userId: number;
    user: any;

    @ApiProperty()
    name: string;
    
    @ApiProperty()
    address: string;
}

@ApiTags('Arenas')
@Controller('api')
export class ArenaController {
    constructor(
        private arenaService: ArenaService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('arenas')
    async getArenas() {
        try {
            const arenas = await this.arenaService.arenas({});
            return {
                message: `${arenas.length} arenas encontradas`,
                data: arenas,
            };
        } catch (error) {
            return {
                message: 'Não foi possível encontrar arenas.',
                error: error.message,
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('arenas/:id')
    async getArenaById(@Param('id') id: number) {
        try {
            const arena = await this.arenaService.arena({ id: Number(id) });
            return {
                message: 'Arena encontrada.',
                data: arena,
            };
        } catch (error) {
            return {
                message: 'Não foi possível encontrar a arena.',
                error: error.message,
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('arenas/user/:userId')
    async getArenasByUserId(@Param('userId') userId: number) {
        try {
            const arenas = await this.arenaService.arenas({ where: { userId: Number(userId) } });
            return {
                message: `${arenas.length} arenas encontradas`,
                data: arenas,
            };
        } catch (error) {
            return {
                message: 'Não foi possível encontrar arenas.',
                error: error.message,
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Post('arenas')
    async createArena(@Body() body: Arenas ) {
        try {
            const arena = await this.arenaService.createArena({
                ...body,
            });
            return {
                message: 'Arena criada.',
                data: arena,
            };
        } catch (error) {
            return {
                message: 'Não foi possível criar a arena.',
                error: error.message,
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Put('arenas/:id')
    async updateArena(@Param('id') id: number, @Body() body: Arenas) {
        try {
            const arena = await this.arenaService.updateArena({
                where: { id: Number(id) },
                data: body,
            });
            return {
                message: 'Arena atualizada.',
                data: arena,
            };
        } catch (error) {
            return {
                message: 'Não foi possível atualizar a arena.',
                error: error.message,
            };
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Delete('arenas/:id')
    async deleteArena(@Param('id') id: number) {
        try {
            const arena = await this.arenaService.deleteArena({ id: Number(id) });
            return {
                message: 'Arena deletada.',
                data: arena,
            };
        } catch (error) {
            return {
                message: 'Não foi possível deletar a arena.',
                error: error.message,
            };
        }
    }

}
