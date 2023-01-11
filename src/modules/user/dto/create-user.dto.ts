import { IntersectionType, OmitType, PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from '../../auth/dto/register-user.dto';
import { UserDto } from './user.dto';

export class CreateUserDto extends IntersectionType(
  RegisterUserDto,
  PartialType(OmitType(UserDto, ['id', 'createdAt', 'updatedAt', 'deletedAt'])),
) {}
