import { Module } from '@nestjs/common';
import { UsersModule } from './modules/user/user.module';
import { TodosModule } from './modules/todos/todos.module';

@Module({
  imports: [UsersModule, TodosModule],
})
export class AppModule {}
