import { Injectable, ConflictException, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {User, UserRole} from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}
    async create(createUserDto: CreateUserDto): Promise<User> {
      const { name, email, password, role } = createUserDto;
      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        role: role || UserRole.CUSTOMER,
      });
      return this.userRepository.save(user);
    }
    async getAll():Promise<{}>{
      return await this.userRepository.find()
    }

    async getById(id:number):Promise<User>{
      const user = await this.userRepository.findOne({ where: { id } });
      if(!user){
        throw new NotFoundException("User not found!")
      }      
      return user
    }

    async update(id:number, updateUserDto: UpdateUserDto): Promise<User> {
      const { name, email, password, role } = updateUserDto;
      const user = await this.userRepository.findOne({ where: { id } });
      if(!user){
        throw new NotFoundException("User not found!")
      }

      if(email){
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser && existingUser.id !== id) {
          throw new ConflictException('User with this email already exists');
        }
      }
      let hashedPassword = ''
      if(password){
        hashedPassword = await bcrypt.hash(password, 10);
      }

      user.name = name || user.name
      user.email = email || user.email
      user.password = hashedPassword || user.password
      user.role = role || user.role

      return this.userRepository.save(user);
    }

    async delate(id:number):Promise<{}>{
      const user = await this.userRepository.findOne({ where: { id } });
      if(!user){
        throw new NotFoundException("User not found!")
      }
      await this.userRepository.delete(id)
      return {'message':'Deleted User was Successfully!'}
    }
}
