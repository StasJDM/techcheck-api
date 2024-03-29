import { Controller, Get, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReturnUserDto } from './dto/return-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiUpdateResultDto } from '../shared/dto/api-update-result.dto';
import { ApiDeleteResultDto } from '../shared/dto/api-delete-result.dto';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { PaginationResponse } from '../shared/types/pagination-response.type';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({ type: ReturnUserDto, isArray: true })
  @Get()
  public findAll(@Query() paginationDto: PaginationDto): Promise<PaginationResponse<User[]>> {
    return this.userService.findAll(paginationDto);
  }

  @ApiOperation({ summary: 'Find user by id' })
  @ApiResponse({ type: ReturnUserDto })
  @Get(':id')
  public findOne(@Param('id') id: string): Promise<ReturnUserDto> {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ type: ApiUpdateResultDto })
  @Patch(':id')
  public update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ type: ApiDeleteResultDto })
  @Delete(':id')
  public remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.remove(id);
  }
}
