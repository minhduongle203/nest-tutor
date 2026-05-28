import { TodoStatus } from '../modules/todos/enum/todo-status.enum';
import { TodoPriority } from '../modules/todos/enum/todo-priority.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { Categories } from './category.entity';

@Index(['userId'])
@Index(['categoryId'])
@Index(['userId', 'title'])
@Entity()
export class Todos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.OPEN })
  status: TodoStatus;

  @Column({ type: 'enum', enum: TodoPriority, nullable: true })
  @Index('idx_todos_priority_high', { where: `"priority" = 'HIGH'` })
  priority: TodoPriority;

  @Column()
  userId: number;

  @ManyToOne(() => Users, (user) => user.todos, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'userId',
  })
  user: Users;

  @Column({ nullable: true })
  categoryId?: number;

  @ManyToOne(() => Categories, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'categoryId',
  })
  category: Categories;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
