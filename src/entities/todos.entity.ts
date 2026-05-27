import { TodoStatus } from '../modules/todos/enum/todo-status.enum';
import { TodoPriority } from '../modules/todos/enum/todo-priority.enum';

export class TodosEntity {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  priority: TodoPriority;
  categoryID?: number;
  created_at: Date;
  updated_at: Date;
}
