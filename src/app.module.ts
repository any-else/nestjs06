import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { TodoEntity } from './entities/todo.entity';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { ProductModule } from './product/product.module';
import { BillModule } from './bill/bill.module';
import { BillEntity } from './entities/bill.entity';
import { ProductEntity } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'vuvanbui@18',
      database: 'nestjs06',
      entities: [UserEntity, TodoEntity, BillEntity, ProductEntity],
      synchronize: true,
    }),
    UserModule,
    TodoModule,
    ProductModule,
    BillModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
