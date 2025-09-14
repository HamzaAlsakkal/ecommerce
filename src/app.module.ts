import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CategoriesModule } from './category/category.module';
import { ProductsModule } from './product/product.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Admin',
      database: 'ecommerce_Database',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
