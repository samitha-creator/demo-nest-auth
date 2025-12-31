import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../../endpoints/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'Jtb25nb0lEIjoiNjY2OWE0OGVjF3a4fc2aGGd3',
      signOptions: {
        expiresIn: '1d',
        issuer: 'APK Hub Pvt. Ltd',
      },
    }),
  ],
})
export class AuthModule {}
