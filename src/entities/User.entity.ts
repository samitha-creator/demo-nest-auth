import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Bid } from './Bid.entity';
import { Review } from './Review.entity';
import { Task } from './Task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.owner)
  tasksOwned: Task[];

  @OneToMany(() => Task, (task) => task.assignee)
  tasksAssigned: Task[];

  @OneToMany(() => Bid, (bid) => bid.bidder)
  bids: Bid[];

  @OneToMany(() => Review, (review) => review.fromUser)
  reviewsWritten: Review[];

  @OneToMany(() => Review, (review) => review.toUser)
  reviewsReceived: Review[];
}
