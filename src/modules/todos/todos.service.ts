import { Todos } from '../../entities/todos.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from '../categories/category.sevice';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Users } from '../../entities/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private readonly todoRepo: Repository<Todos>,
    private readonly categoriesService: CategoryService,
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {}

  async getAll(): Promise<Todos[]> {
    return this.todoRepo.find({ relations: ['category', 'user'] });
  }

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
      relations: ['category', 'user'],
    });

    return todos;
  }

  async findById(id: number) {
    const todos = await this.todoRepo.findOne({
      where: { id },
      relations: ['category', 'user'],
    });
    if (!todos) {
      throw new Error('Failed');
    }
    return todos;
  }

  async create(dto: CreateTodoDto) {
    const user = await this.userService.findById(dto.userID);

    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
        errorCode: 'USER_NOT_FOUND',
        field: 'userID',
        statusCode: 404,
      });
    }

    if (dto.categoryID) {
      const category = await this.categoriesService.findById(dto.categoryID);

      if (!category) {
        throw new NotFoundException({
          message: 'Category not found',
          errorCode: 'CATEGORY_NOT_FOUND',
          field: 'categoryID',
          statusCode: 404,
        });
      }
    }

    const existingTodo = await this.todoRepo.findOne({
      where: { title: dto.title },
    });

    if (existingTodo) {
      throw new BadRequestException({
        message: 'Todo already exists',
        errorCode: 'TODO_DUPLICATE',
        field: 'title',
        statusCode: 400,
      });
    }

    const todo = this.todoRepo.create({
      ...dto,
      userId: dto.userID,
      categoryId: dto.categoryID,
    });

    // return this.dataSource.transaction(async (manager) => {
    //   const saveTodos = manager.save(Todos, todo);
    //   await manager.update(Users, dto.userID, { lastActivityAt: new Date() });
    //   return saveTodos;
    // });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const saveTodos = await queryRunner.manager.save(Todos, todo);
      await queryRunner.manager.update(Users, dto.userID, {
        lastActivityAt: new Date(),
      });
      await queryRunner.commitTransaction();
      return saveTodos;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
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
