import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../app.module';
import { Repository } from 'typeorm';
import { Users } from '../../../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Categories } from '../../../entities/category.entity';
import { Todos } from '../../../entities/todos.entity';
import { readFromFile } from '../../../utils/file';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersRepository = app.get<Repository<Users>>(getRepositoryToken(Users));
  const categoriesRepository = app.get<Repository<Categories>>(
    getRepositoryToken(Categories),
  );
  const todosRepository = app.get<Repository<Todos>>(getRepositoryToken(Todos));

  const users = readFromFile<Users[]>('users.json');
  const categories = readFromFile<Categories[]>('categories.json');
  const todos = readFromFile<Todos[]>('todos.json');

  await usersRepository.save(users);
  await categoriesRepository.save(categories);
  await todosRepository.save(todos);

  await app.close();
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
