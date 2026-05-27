import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../../entities/category.entity';

@Injectable()
export class CategoryService {
  private categories: CategoryEntity[] = [
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Mobile Development' },
    { id: 3, name: 'Data Science' },
    { id: 4, name: 'Design' },
    { id: 5, name: 'Marketing' },
  ];

  findAll() {
    return this.categories;
  }

  findById(id: number) {
    return this.categories.find((category) => category.id === id);
  }
}
