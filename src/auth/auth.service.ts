import { 
  Injectable, 
  UnauthorizedException, 
  ConflictException, 
  BadRequestException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { RegisterDto, LoginDto, ChangePasswordDto } from './dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ user: User; access_token: string }> {
    const { name, email, password, role } = registerDto;

    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await this.usersRepository.save(user);

    // Generate JWT token
    const payload: JwtPayload = { 
      sub: savedUser.id, 
      email: savedUser.email, 
      role: savedUser.role 
    };
    const token = this.jwtService.sign(payload);

    // Remove password from response
    const { password: _, ...userResponse } = savedUser;

    return { user: userResponse as User, access_token: token };
  }

  async login(loginDto: LoginDto): Promise<{ user: User; access_token: string }> {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload: JwtPayload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    };
    const token = this.jwtService.sign(payload);

    // Remove password from response
    const { password: _, ...userResponse } = user;

    return { user: userResponse as User, access_token: token };
  }

  async changePassword(
    userId: number, 
    changePasswordDto: ChangePasswordDto
  ): Promise<{ message: string }> {
    const { currentPassword, newPassword } = changePasswordDto;

    // Find user
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Hash new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await this.usersRepository.update(userId, { password: hashedNewPassword });

    return { message: 'Password changed successfully' };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: payload.sub } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async getUserProfile(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    
    // Remove password from response
    const { password: _, ...userResponse } = user;
    return userResponse as User;
  }
}