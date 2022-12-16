import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from '../entities/user.entity';
import { UserDto } from './user.dto';

export class ReturnUserDto extends OmitType(UserDto, ['deletedAt', 'password']) {
  @Exclude()
  deletedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
