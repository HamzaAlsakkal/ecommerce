import { Injectable, ConflictException, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Categories } from "./entities/category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";


@Injectable()
export class CategoryService{
    constructor(
        @InjectRepository(Categories)
        private readonly categoryRepository: Repository<Categories>,
    ){}
    async create(createCategoryDto: CreateCategoryDto): Promise<Categories> {
      const { name, description } = createCategoryDto;
      const existingCategory = await this.categoryRepository.findOne({ where: { name } });
      if (existingCategory) {
        throw new ConflictException('Category with this name already exists');
      }
      const category = this.categoryRepository.create({
        name,
        description,
      });
      return this.categoryRepository.save(category);
    }
    async getAll():Promise<{}>{
      return await this.categoryRepository.find()
    }

    async getById(id:number):Promise<Categories>{
      const category = await this.categoryRepository.findOne({ where: { id } });
      if(!category){
        throw new NotFoundException("Category not found!")
      }      
      return category
    }

    async update(id:number, updateCategoryDto: UpdateCategoryDto): Promise<Categories> {
      const { name, description} = updateCategoryDto;
      const category = await this.categoryRepository.findOne({ where: { id } });
      if(!category){
        throw new NotFoundException("Category not found!")
      }

      if(name){
        const existingCategory = await this.categoryRepository.findOne({ where: { name } });
        if (existingCategory && existingCategory.id !== id) {
          throw new ConflictException('Category with this name already exists');
        }
      }

      category.name = name || category.name
      category.description = description || category.description
      return this.categoryRepository.save(category);
    }

    async delate(id:number):Promise<{}>{
      const category = await this.categoryRepository.findOne({ where: { id } });
      if(!category){
        throw new NotFoundException("Category not found!")
      }
      await this.categoryRepository.delete(id)
      return {'message':'Deleted Category was Successfully!'}
    }
}
