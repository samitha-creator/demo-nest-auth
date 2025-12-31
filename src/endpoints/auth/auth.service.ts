import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/endpoints/users/users.service';

import { CreateUserDto } from '../users/dto/create-user.dto';

type AuthInput = CreateUserDto;
type SigninData = { userId: number; name: string };
type AuthResult = { accessToken: string };

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  private async validateUser(input: AuthInput): Promise<SigninData | null> {
    const user = await this.usersService.findUserByName(input.username);
    if (user && user.password == input.password) {
      return {
        userId: user.id,
        name: user.username,
      };
    }
    return null;
  }

  private async signIn(user: SigninData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      name: user.name,
    };
    const accessToken = await this.jwtService.signAsync(tokenPayload);
    return { accessToken };
  }

  async register(input: AuthInput): Promise<AuthResult> {
    const existingUser = await this.usersService.findUserByName(input.username);
    if (existingUser) {
        throw new UnauthorizedException('User already exists');
    }
    const user = await this.usersService.createUser(input);
    return this.signIn({ userId: user.id, name: user.username });
  }
}
