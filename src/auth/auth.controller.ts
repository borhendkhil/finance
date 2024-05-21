import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from 'src/dto/auth.dto';
import { User } from 'src/user/user.schema';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<void> {
    try {
      await this.authService.signup(signupDto);
    } catch (error) {
      throw new HttpException('Signup failed', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string } | null> {
    const user = await this.authService.login(loginDto.username, loginDto.password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = this.generateToken(user);
    return { token };
  }

  private generateToken(user: User): string {
    const payload = { username: user.username, sub: user._id };
    return jwt.sign(payload, 'secretKey', { expiresIn: '1h' }); 
    }
}
