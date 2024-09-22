import { Controller, Get, Post, Put, Delete, Request, UseGuards, Param } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('api')
export class UsersController {
    constructor(
        private authService: AuthService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('users')
    async getUsers() {
        return this.authService.getUsers();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('users/:id')
    async getUserById(@Param('id') id: number) {
        return this.authService.getUser(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Put('users/:id')
    async updateUser(@Param('id') id: number, @Request() { body }) {
        return this.authService.updateUser(Number(id), body);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Delete('users/:id')
    async deleteUser(@Param('id') id: number) {
        return this.authService.deleteUser(Number(id));
    }
}

