import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from '@/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService
  ) { }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  handleLogin(@Request() req) {
    return this.authService.login(req.user)
  }

  @Post('register')
  @Public()
  register(@Body() registerDto: CreateAuthDto) {
    return this.authService.register(registerDto)
  }

  @Get('mail')
  @Public()
  testMail() {
    this.mailerService
      .sendMail({
        to: 'dobinhhuy69@gmail.com', // list of receivers
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        template: "register",
        context: {
          name: "Do Quoc Huy",
          activationCode: 123456789
        }
      })
    return "Đỗ Quốc Huy"
  }
}
