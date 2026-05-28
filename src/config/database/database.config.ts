import { registerAs } from '@nestjs/config';
import { Todos } from '../../entities/todos.entity';
import { Categories } from '../../entities/category.entity';
import { Users } from '../../entities/user.entity';

export const DATABASE_REGISTER = 'database';

export default registerAs(DATABASE_REGISTER, () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Todos, Categories, Users],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: true,
}));
