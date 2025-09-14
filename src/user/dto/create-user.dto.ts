import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    MinLength
} from 'class-validator'
import { UserRole } from '../entities/user.entity';

export class CreateUserDto{
    @IsString()
    name:string;

    @IsEmail()
    email:string

    @IsEnum(UserRole)
    @IsOptional()
    role?:UserRole

    @IsString()
    @MinLength(6)
    password:string;
};
