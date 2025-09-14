import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch
} from '@nestjs/common';
import { UserService } from './users.services';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController{
    constructor(private readonly userService: UserService){}
    
    @Post()
    async create(@Body() createUserDto:CreateUserDto){
        return this.userService.create(createUserDto)
    }
    
    @Get()
    async getAll(){
        return this.userService.getAll()
    }

    @Get(':id')
    async getById(@Param('id') id:number){
        return this.userService.getById(id)
    }

    @Patch(':id')
    async update(@Param('id') id:number, @Body() updateUserDto:UpdateUserDto){
        return this.userService.update(id, updateUserDto)
    }
    
    @Delete(':id')
    async delete(@Param('id') id:number){
        return this.userService.delate(id)
    }
}
