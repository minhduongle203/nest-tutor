import { Module } from '@nestjs/common';
import { UsersModule } from './modules/user/user.module';
import { TodosModule } from './modules/todos/todos.module';
import { CategoriesModule } from './modules/categories/category.module';

@Module({
  imports: [UsersModule, TodosModule, CategoriesModule],
})
export class AppModule {}
