import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './Task.entity';
import { User } from './User.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  taskId: number;

  @ManyToOne(() => Task, (task) => task.reviews)
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @Column()
  fromUserId: number;

  @ManyToOne(() => User, (user) => user.reviewsWritten)
  @JoinColumn({ name: 'fromUserId' })
  fromUser: User;

  @Column()
  toUserId: number;

  @ManyToOne(() => User, (user) => user.reviewsReceived)
  @JoinColumn({ name: 'toUserId' })
  toUser: User;
}
