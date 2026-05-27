import { TodoStatus } from '../enum/todo-status.enum';
import { TodoPriority } from '../enum/todo-priority.enum';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(1, { message: 'Không được để trống' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(TodoStatus, {
    message: `Status: ${Object.values(TodoStatus).join(', ')}`,
  })
  status?: TodoStatus;

  @IsOptional()
  @IsEnum(TodoPriority, {
    message: `Priority: ${Object.values(TodoPriority).join(', ')}`,
  })
  priority?: TodoPriority;

  @IsOptional()
  @IsInt({ message: 'Category is Integer!' })
  categoryID: number;
}
