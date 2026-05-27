import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosRepository } from './todos.repository';
import { TodosService } from './todos.service';
import { CategoriesModule } from '../categories/category.module';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [CategoriesModule, UsersModule],
  controllers: [TodosController],
  providers: [TodosRepository, TodosService],
})
export class TodosModule {}
