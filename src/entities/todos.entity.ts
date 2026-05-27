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
export class TodosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.OPEN })
  status: TodoStatus;

  @Column({ type: 'enum', enum: TodoPriority, default: TodoPriority.MEDIUM })
  priority: TodoPriority;

  @Column()
  userID: number;

  @Column({ nullable: true })
  categoryID?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
