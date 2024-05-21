import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.schema';
import { SignupDto } from 'src/dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async signup(signupDto: SignupDto): Promise<void> {
    const { username, password } = signupDto; 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashedPassword }); 
    await newUser.save(); 
  }

  async login(username: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).exec();
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
