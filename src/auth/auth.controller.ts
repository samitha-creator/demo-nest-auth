import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  //Login Endpoint
  @HttpCode(HttpStatus.OK)
  @Get('login')
  login() {
    throw new NotImplementedException('Not implemented');
  }
}
