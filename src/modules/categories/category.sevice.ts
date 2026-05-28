import { Injectable } from '@nestjs/common';
import { Categories } from '../../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async findAll() {
    return this.categoriesRepository.find();
  }

  async findById(id: number) {
    return await this.categoriesRepository.find({ where: { id } });
  }
}
