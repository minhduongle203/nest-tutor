import * as path from 'path';
import * as fs from 'fs';
import { Todos } from '../../entities/todos.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoStatus } from './enum/todo-status.enum';
import { TodoPriority } from './enum/todo-priority.enum';
import { Injectable } from '@nestjs/common';

const TODO_FILE = path.join(__dirname, 'todo.json');
@Injectable()
export class TodosRepository {
  private readFromFile(): Todos[] {
    const data = fs.readFileSync(TODO_FILE, 'utf-8');
    return JSON.parse(data) as Todos[];
  }

  private writeToFile(data: Todos[]): void {
    fs.writeFileSync(TODO_FILE, JSON.stringify(data, null, 2));
  }

  private getNextId(todos: Todos[]): number {
    if (todos.length === 0) {
      return 1;
    }
    return todos[todos.length - 1].id + 1;
  }

  findAll(): Todos[] {
    return this.readFromFile();
  }

  findById(id: number) {
    const todos = this.readFromFile();
    return todos.find((todo) => todo.id === id);
  }

  create(dto: CreateTodoDto) {
    const todos = this.readFromFile();
    const newTodo: Todos = {
      id: this.getNextId(todos),
      title: dto.title,
      description: dto.description ?? '',
      status: dto.status ?? TodoStatus.OPEN,
      priority: dto.priority ?? TodoPriority.MEDIUM,
      categoryId: dto.categoryID,
      userId: dto.userID,
      created_at: new Date(),
      updated_at: new Date(),
    };
    todos.push(newTodo);
    this.writeToFile(todos);
    return newTodo;
  }

  update(id: number, updateDto: UpdateTodoDto) {
    const todos = this.readFromFile();
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) {
      return undefined;
    }
    todos[index] = {
      ...todos[index],
      ...updateDto,
      updated_at: new Date(),
    };
    this.writeToFile(todos);
    return todos[index];
  }

  delete(id: number): boolean {
    const todos = this.readFromFile();
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) {
      return false;
    }
    todos.splice(index, 1);
    this.writeToFile(todos);
    return true;
  }
}
