import { Module } from '@nestjs/common';
import { CategoryService } from './category.sevice';
import { CategoriesController } from './categoty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from '../../entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  controllers: [CategoriesController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoriesModule {}
