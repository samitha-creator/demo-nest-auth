import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from '../../entities/Bid.entity';
import { Task } from '../../entities/Task.entity';
import { User } from '../../entities/User.entity';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bid, Task, User])],
  controllers: [BidsController],
  providers: [BidsService],
})
export class BidsModule {}
