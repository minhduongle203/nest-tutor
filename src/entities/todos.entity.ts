import { TodoStatus } from '../modules/todos/enum/todo-status.enum';
import { TodoPriority } from '../modules/todos/enum/todo-priority.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  priority: TodoPriority;

  @Column()
  userId: number;

  @Column({ nullable: true })
  categoryId?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
