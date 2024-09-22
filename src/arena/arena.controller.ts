import { Controller, Get, Post, Put, Delete, Request, UseGuards, Param, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';

class Arenas {
    @ApiProperty()
    userId: number;

    @ApiProperty()
    name: string;
    
    @ApiProperty()
    address: string;
}


@ApiTags('Arenas')
@Controller('api')
export class ArenaController {
    constructor(
        private authService: AuthService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('arenas')
    async getArenas() {
        return this.authService.getArenas();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('arenas/:id')
    async getArenaById(@Param('id') id: number) {
        return this.authService.getArena(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('arenas/user/:userId')
    async getArenasByUserId(@Param('userId') userId: number) {
        return this.authService.getArenasByUserId(Number(userId));
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Post('arenas')
    async createArena(@Body() body: Arenas ) {
        return this.authService.createArena(body);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Put('arenas/:id')
    async updateArena(@Param('id') id: number, @Body() body: Arenas) {
        return this.authService.updateArena(Number(id), body);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Delete('arenas/:id')
    async deleteArena(@Param('id') id: number) {
        return this.authService.deleteArena(Number(id));
    }

}
