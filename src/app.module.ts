import { Module } from '@nestjs/common';
import { AuthModule } from './routes/auth/auth.module';
import { UsersModule } from './routes/users/users.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
