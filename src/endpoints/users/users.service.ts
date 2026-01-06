import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../../entities/User.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUserByName(username: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username },
    });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const hashedPassword = await hash(data.password, 4);
    var userData = data;
    userData.password = hashedPassword;

    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }
}
