import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<ReturnUserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => new ReturnUserDto(user));
  }

  async findById(id: string): Promise<ReturnUserDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    return new ReturnUserDto(user);
  }

  findByUsernameOrEmail(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: [
        {
          username,
        },
        { email: username },
      ],
    });
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.userRepository.softDelete(id);
  }
}
