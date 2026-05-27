import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';

@Module({
  imports: [],
  controllers: [TodosController],
})
export class TodosModule {}
