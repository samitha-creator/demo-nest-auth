import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Bid } from './Bid.entity';
import { Review } from './Review.entity';
import { User } from './User.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('decimal')
  budget: number;

  @Column({ default: 'OPEN' })
  status: string; // OPEN, ASSIGNED, COMPLETED, PAID

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  ownerId: number;

  @ManyToOne(() => User, (user) => user.tasksOwned)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ nullable: true })
  assigneeId: number;

  @ManyToOne(() => User, (user) => user.tasksAssigned)
  @JoinColumn({ name: 'assigneeId' })
  assignee: User;

  @OneToMany(() => Bid, (bid) => bid.task)
  bids: Bid[];

  @OneToMany(() => Review, (review) => review.task)
  reviews: Review[];
}
