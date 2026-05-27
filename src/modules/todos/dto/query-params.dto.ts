import { TodoPriority } from '../enum/todo-priority.enum';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryParamsDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsEnum(TodoPriority, {
    message: `Priority: ${Object.values(TodoPriority).join(', ')}`,
  })
  priority?: TodoPriority = TodoPriority.HIGH;
}
