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
  UseGuards,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { TodosService } from './todos.service';
import { TodosOwnerShipGuard } from './guard/todo-ownership.guard';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}
  @Get()
  getTodos() {
    return this.todosService.getAll();
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
  @UseGuards(TodosOwnerShipGuard)
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.delete(id);
  }
}
