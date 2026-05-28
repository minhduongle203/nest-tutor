import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosRepository } from './todos.repository';
import { TodosService } from './todos.service';
import { CategoriesModule } from '../categories/category.module';
import { UsersModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from '../../entities/todos.entity';

@Module({
  imports: [CategoriesModule, UsersModule, TypeOrmModule.forFeature([Todos])],
  controllers: [TodosController],
  providers: [TodosRepository, TodosService],
})
export class TodosModule {}
