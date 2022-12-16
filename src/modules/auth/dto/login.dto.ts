import { PickType } from '@nestjs/swagger';
import { UserDto } from 'src/modules/user/dto/user.dto';

export class LoginDto extends PickType(UserDto, ['username', 'password']) {}
