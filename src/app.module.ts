import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/user/user.module';
import { TodosModule } from './modules/todos/todos.module';
import { CategoriesModule } from './modules/categories/category.module';
import { DatabaseConfigModule } from './config/database/database-config.module';
import { RequestIdMiddleware } from './common/middlewares/request-id.middleware';

@Module({
  imports: [UsersModule, TodosModule, CategoriesModule, DatabaseConfigModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
