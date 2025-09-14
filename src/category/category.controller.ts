import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch
} from '@nestjs/common';
import { CategoryService } from './category.services';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController{
    constructor(private readonly categoryService: CategoryService){}
    
    @Post()
    async create(@Body() createCategoryDto:CreateCategoryDto){
        return this.categoryService.create(createCategoryDto)
    }
    
    @Get()
    async getAll(){
        return this.categoryService.getAll()
    }

    @Get(':id')
    async getById(@Param('id') id:number){
        return this.categoryService.getById(id)
    }

    @Patch(':id')
    async update(@Param('id') id:number, @Body() updateCategoryDto:UpdateCategoryDto){
        return this.categoryService.update(id, updateCategoryDto)
    }
    
    @Delete(':id')
    async delete(@Param('id') id:number){
        return this.categoryService.delate(id)
    }
}
