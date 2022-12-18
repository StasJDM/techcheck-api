import { User } from '../../user/entities/user.entity';

export interface AppRequest extends Request {
  user: User;
}
