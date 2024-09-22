import { Controller, Get, Post, Put, Delete, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AppService } from '../app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('api')
export class UsersController {
    constructor(
        private authService: AuthService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('users')
    async users(@Request() req) {
        return this.authService.getUsers();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('users/:id')
    async user(@Request() req) {
        return this.authService.getUser(req.params.id);
    }

}
