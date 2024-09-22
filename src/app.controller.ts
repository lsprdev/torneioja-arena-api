import { Controller, Get, Post, Put, Delete, Request, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiProperty } from "@nestjs/swagger";

class User {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

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

  @Post('api/signup')
  async signup(@Body() body: User ) {
    return this.authService.signup(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('api/login')
  async login(@Body() { email, password }: User) {
    return this.authService.login({ email, password });
  }
}

