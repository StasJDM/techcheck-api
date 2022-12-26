import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { PaginationResponse } from '../shared/types/pagination-response.type';
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  public create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  public async findAll(paginationDto: PaginationDto): Promise<PaginationResponse<ReturnUserDto[]>> {
    const { skipTakeOptions } = paginationDto;

    const [users, total] = await this.userRepository.findAndCount({ ...skipTakeOptions });
    const data = users.map((user) => new ReturnUserDto(user));

    return { data, pagination: { ...paginationDto.params, total } };
  }

  public async findById(id: string): Promise<ReturnUserDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    return new ReturnUserDto(user);
  }

  public findByUsernameOrEmail(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: [
        {
          username,
        },
        { email: username },
      ],
    });
  }

  public update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, updateUserDto);
  }

  public remove(id: string): Promise<DeleteResult> {
    return this.userRepository.softDelete(id);
  }
}
