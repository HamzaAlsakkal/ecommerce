import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.services';
import { ProductsController } from './product.controller';
import { Products } from './entities/product.entity';
import { Categories } from 'src/category/entities/category.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Products, Categories])],
    controllers:[ProductsController],
    providers:[ProductService],
})
export class ProductsModule {}
