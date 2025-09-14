import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.services';
import { CategoriesController } from './category.controller';
import { Categories } from './entities/category.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Categories])],
    controllers:[CategoriesController],
    providers:[CategoryService],
    exports:[CategoryService, TypeOrmModule],
})
export class CategoriesModule {}
