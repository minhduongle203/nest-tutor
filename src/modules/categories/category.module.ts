import { Module } from '@nestjs/common';
import { CategoryService } from './category.sevice';
import { CategoriesController } from './categoty.controller';

@Module({
  controllers: [CategoriesController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoriesModule {}
