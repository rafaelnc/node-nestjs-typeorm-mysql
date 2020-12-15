import {
    Controller,
    Post,
    Body,
    Get,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    ClassSerializerInterceptor,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { UserDTO } from './dto/user.dto';
  import { User } from './user.entity';
  
@Controller('users')
export class UserController {  constructor(private userService: UserService) {}
  
@Post('create')
public async createUser(
  @Body() userDto: UserDTO,
){
  const user = await this.userService.createUser(userDto);
  return user;
}

@UseInterceptors(ClassSerializerInterceptor)
@Get()
public async getUsers(): Promise<User[]> {
  const users = await this.userService.getUsers();
  return users;
}


@Patch('/edit/:userId')
public async editUser(
  @Body() userDto: UserDTO,
  @Param('userId') userId: number,
): Promise<User> {
  const user = await this.userService.editUser(
    userId,
    userDto,
  );
  return user;
}

@Delete('/delete/:userId')
public async deleteUser(@Param('userId') userId: number) {
  const deletedUser = await this.userService.deleteUser(userId);
  return deletedUser;
}
}