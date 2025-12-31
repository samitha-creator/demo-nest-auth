import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './endpoints/auth/auth.module';
import { BidsModule } from './endpoints/bids/bids.module';
import { ReviewsModule } from './endpoints/reviews/reviews.module';
import { TasksModule } from './endpoints/tasks/tasks.module';
import { UsersModule } from './endpoints/users/users.module';
import { Bid } from './entities/Bid.entity';
import { Review } from './entities/Review.entity';
import { Task } from './entities/Task.entity';
import { User } from './entities/User.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'kokila',
      password: 'scorfi3ld', // Default
      database: 'nest_app',
      entities: [User, Task, Bid, Review],
      synchronize: true,
    }),
    TasksModule,
    BidsModule,
    ReviewsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
