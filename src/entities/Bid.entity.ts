import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './Task.entity';
import { User } from './User.entity';

@Entity()
export class Bid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  amount: number;

  @Column({ default: 'PENDING' })
  status: string; // PENDING, ACCEPTED, REJECTED

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  taskId: number;

  @ManyToOne(() => Task, (task) => task.bids)
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @Column()
  bidderId: number;

  @ManyToOne(() => User, (user) => user.bids)
  @JoinColumn({ name: 'bidderId' })
  bidder: User;
}
