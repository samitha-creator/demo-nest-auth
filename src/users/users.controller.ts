import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UsersController {
  @UseGuards(AuthGuard)
  @Get('me')
  profile(@Request() request: any) {
    return request.user;
  }
}
