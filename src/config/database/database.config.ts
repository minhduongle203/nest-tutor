import { registerAs } from '@nestjs/config';
import { TodosEntity } from '../../entities/todos.entity';

export const DATABASE_REGISTER = 'database';

export default registerAs(DATABASE_REGISTER, () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [TodosEntity],
  synchronize: true,
  logging: true,
}));
