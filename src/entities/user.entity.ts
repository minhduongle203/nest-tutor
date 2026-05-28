import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Todos } from './todos.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Todos, (todos) => todos.user)
  todos: Todos[];

  @Column({ type: 'timestamp', nullable: true })
  lastActivityAt: Date;
}
