import { Injectable, ConflictException, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Products } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Categories } from "src/category/entities/category.entity";


@Injectable()
export class ProductService{
    constructor(
        @InjectRepository(Products)
        private readonly productRepository: Repository<Products>,
        @InjectRepository(Categories)
        private readonly categoryRepository: Repository<Categories>
    ){}
    async create(createProductDto: CreateProductDto): Promise<Products> {
      const { name, description, price, categoryId } = createProductDto;
      const existingProduct = await this.productRepository.findOne({ where: { name } });
      if (existingProduct) {
        throw new ConflictException('Product with this name already exists');
      }
      const existingCategory = await this.categoryRepository.findOne({ where : { id:categoryId }})
      if (!existingCategory) {
        throw new NotFoundException('Category with this ID Not Found!');
      }
      const product = this.productRepository.create({
        name,
        description,
        price,
        categoryId,
      });
      return this.productRepository.save(product);
    }
    async getAll():Promise<{}>{
      return await this.productRepository.find({
        relations: ['category']
      })
    }

    async getById(id:number):Promise<Products>{
      const product = await this.productRepository.findOne({ 
        where: { id },
        relations: ['category']
      });
      if(!product){
        throw new NotFoundException("Product not found!")
      }      
      return product
    }

    async update(id:number, updateProductDto: UpdateProductDto): Promise<Products> {
      const { name, description, price, categoryId } = updateProductDto;
      const product = await this.productRepository.findOne({ where: { id } });
      if(!product){
        throw new NotFoundException("Product not found!")
      }

      if(name){
        const existingProduct = await this.productRepository.findOne({ where: { name } });
        if (existingProduct && existingProduct.id !== id) {
          throw new ConflictException('Product with this name already exists');
        }
      }

      if(categoryId){
        const existingCategory = await this.categoryRepository.findOne({ where : { id:categoryId }})
        if (!existingCategory) {
          throw new NotFoundException('Category with this ID Not Found!');
        }
      }

      product.name = name || product.name
      product.description = description || product.description
      product.price = price || product.price
      product.categoryId = categoryId || product.categoryId
      return this.productRepository.save(product);
    }

    async delate(id:number):Promise<{}>{
      const product = await this.productRepository.findOne({ where: { id } });
      if(!product){
        throw new NotFoundException("Product not found!")
      }
      await this.productRepository.delete(id)
      return {'message':'Deleted Product was Successfully!'}
    }
}
