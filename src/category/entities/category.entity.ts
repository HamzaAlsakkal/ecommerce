import { Products } from 'src/product/entities/product.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

@Entity('Categories')
export class Categories{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    name:string;

    @Column()
    description:string;

    @CreateDateColumn()
    createAt:Date;
    
    @UpdateDateColumn()
    updateAt:Date;

    @OneToMany(()=>Products, (product)=>product.category)
    products:Products[]
}
