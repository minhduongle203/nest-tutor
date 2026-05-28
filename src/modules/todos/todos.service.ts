import { Todos } from '../../entities/todos.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryService } from '../categories/category.sevice';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private readonly todoRepo: Repository<Todos>,
    private readonly categoriesService: CategoryService,
    private readonly userService: UserService,
  ) {}

  async findAll(queryParamsDto: QueryParamsDto): Promise<Todos[]> {
    const page = queryParamsDto.page ?? 1;
    const limit = queryParamsDto.limit ?? 10;
    const start = (page - 1) * limit;
    const where = queryParamsDto.priority
      ? { priority: queryParamsDto.priority }
      : {};
    const todos = await this.todoRepo.find({
      where,
      take: limit,
      skip: start,
    });

    return todos;
  }

  async findById(id: number) {
    const todos = await this.todoRepo.findOne({ where: { id } });
    if (!todos) {
      throw new Error('Failed');
    }
    return todos;
  }

  async create(dto: CreateTodoDto) {
    const user = this.userService.findById(dto.userID);
    if (!user) {
      throw new Error('User not found');
    }
    if (dto.categoryID) {
      const category = this.categoriesService.findById(dto.categoryID);
      if (!category) {
        throw new Error('Category not found');
      }
    }

    const existingTodo = await this.todoRepo.findOne({
      where: { title: dto.title },
    });
    if (!existingTodo) {
      throw new BadRequestException({
        message: 'Category not found',
        errorCode: 'TODO_DUPLICATE',
        field: 'title',
        statusCode: 400,
      });
    }
    return this.todoRepo.create(dto);
  }

  async update(id: number, updateDto: UpdateTodoDto) {
    const updateTodos = await this.todoRepo.findOne({ where: { id } });
    if (!updateTodos) {
      throw new Error('Update failed');
    }
    Object.assign(updateTodos, updateDto);
    return this.todoRepo.save(updateTodos);
  }

  async delete(id: number) {
    const todosDeleted = await this.todoRepo.delete(id);
    if (!todosDeleted.affected) {
      throw new Error('Delete failed');
    }
  }
}
