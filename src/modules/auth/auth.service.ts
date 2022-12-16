import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../shared/types/app-config.type';
import { ReturnUserDto } from '../user/dto/return-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResultDto } from '../shared/dto/result.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<Partial<User>> {
    const user = await this.userService.findByUsernameOrEmail(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (isMatchPassword) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { id: user.id, username: user.username };

    return { accessToken: this.jwtService.sign(payload) };
  }

  async register(registerUserDto: RegisterUserDto): Promise<ReturnUserDto> {
    const hash = await this.generateHash(registerUserDto.password);

    const user = await this.userService.create({
      ...registerUserDto,
      password: hash,
    });

    return new ReturnUserDto(user);
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<ResultDto> {
    const user = await this.userService.findById(id);

    const isMatchOldPassword = await bcrypt.compare(changePasswordDto.oldPassword, user.password);
    if (!isMatchOldPassword) {
      throw new HttpException('Неверный пароль', 400);
    }

    if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
      throw new HttpException('Пароли не совпадают', 400);
    }

    const newPasswordHash = await this.generateHash(changePasswordDto.newPassword);
    await this.userService.update(id, { password: newPasswordHash });

    return {
      message: 'Пароль изменен',
      statusCode: HttpStatus.ACCEPTED,
    };
  }

  async generateHash(password: string): Promise<string> {
    const hashRounds = Number(this.configService.get<number>(AppConfig.HashRounds));

    const salt = await bcrypt.genSalt(hashRounds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }
}
