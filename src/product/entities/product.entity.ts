import { Categories } from 'src/category/entities/category.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

@Entity('Products')
export class Products{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    name:string;

    @Column()
    price:number

    @Column()
    description:string;

    @CreateDateColumn()
    createAt:Date;
    
    @UpdateDateColumn()
    updateAt:Date;

    @Column()
    categoryId:number

    @ManyToOne(()=>Categories, (category)=>category.products)
    @JoinColumn({name:'categoryId'})
    category:Categories
}
