import { TodosRepository } from './todos.repository';
import { TodosEntity } from '../../entities/todos.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { QueryParamsDto } from './dto/query-params.dto';

export class TodosService {
  private todoRepo: TodosRepository;
  constructor() {
    this.todoRepo = new TodosRepository();
  }

  findAll(queryParamsDto: QueryParamsDto): TodosEntity[] {
    let todos = this.todoRepo.findAll();
    if (queryParamsDto.priority) {
      todos = todos.filter((t) => t.priority === queryParamsDto.priority);
    }
    const page = queryParamsDto.page ?? 1;
    const limit = queryParamsDto.limit ?? 10;
    const start = (page - 1) * limit;
    return todos.splice(start, start + limit);
  }

  findById(id: number) {
    const todos = this.todoRepo.findById(id);
    if (!todos) {
      throw new Error('Failed');
    }
    return todos;
  }

  create(dto: CreateTodoDto) {
    return this.todoRepo.create(dto);
  }

  update(id: number, updateDto: UpdateTodoDto) {
    const updateTodos = this.todoRepo.update(id, updateDto);
    if (!updateTodos) {
      throw new Error('Update failed');
    }
    return updateTodos;
  }

  delete(id: number) {
    const todos = this.todoRepo.findById(id);
    if (!todos) {
      throw new Error('Delete failed');
    }
  }
}
