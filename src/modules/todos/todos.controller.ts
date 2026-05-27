import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}
  @Get()
  getTodos() {
    return 'Todos!';
  }

  @Get('query')
  findAll(@Query() query: QueryParamsDto) {
    return this.todosService.findAll(query);
  }

  @Get('/:id')
  getTodoById(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.findById(id);
  }

  @Post()
  createTodosByAuth(@Body() body: CreateTodoDto) {
    return this.todosService.create(body);
  }

  @Patch('/:id')
  updateTodo(@Param('id') id: number, @Body() body: UpdateTodoDto) {
    return this.todosService.update(id, body);
  }

  @Delete('/:id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.delete(id);
  }
}
