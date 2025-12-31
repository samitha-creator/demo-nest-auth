import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() input: AuthDto) {
    return this.authService.authenticate(input);
  }

  @Post('register')
  register(@Body() input: AuthDto) {
    return this.authService.register(input);
  }
}
