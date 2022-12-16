import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { RegisterUserDto } from 'src/modules/auth/dto/register-user.dto';
import { UserDto } from './user.dto';

export class CreateUserDto extends IntersectionType(
  RegisterUserDto,
  PartialType(OmitType(UserDto, ['id', 'createdAt', 'updatedAt', 'deletedAt'])),
) {}
