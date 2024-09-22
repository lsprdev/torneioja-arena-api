import { Controller, Get, Post, Put, Delete, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
  ) {}

  @Get('/')
  async index() {
    return {
      message: 'API desenvolvida por @lsprdev',
      data: {
        version: '1.0.0',
      },
    };
  }

  // create a new user
  @Post('api/signup')
  async signup(@Request() req) {
    return this.authService.signup(req.body);
  }

  // login with an existing user
  @UseGuards(LocalAuthGuard)
  @Post('api/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/users')
  async users(@Request() req) {
    return this.authService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/user/:id')
  async user(@Request() req) {
    return this.authService.getUser(req.params.id);
  }

}
