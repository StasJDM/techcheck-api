import { User } from 'src/modules/user/entities/user.entity';

export interface AppRequest extends Request {
  user: User;
}
