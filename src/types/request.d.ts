import { Todos } from '../../entities/todos.entity';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      todo?: Todos;
    }
  }
}

export {};
