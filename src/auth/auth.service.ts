import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

type AuthInput = { username: string; password: string };
type SigninData = { userId: number };
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
      };
    }
    return null;
  }

  private async signIn(user: SigninData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
    };
    const accessToken = await this.jwtService.signAsync(tokenPayload);
    return { accessToken };
  }
}
