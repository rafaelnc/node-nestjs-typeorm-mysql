import {
    Controller,
    Post,
    Body,
    Get,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { UserDTO } from './dto/user.dto';
  import { User } from './user.entity';
  
@Controller('user')
export class UserController {  constructor(private userService: UserService) {}
  
@Post('create')
public async createUser(
  @Body() userDto: UserDTO,
): Promise<User> {
  const user = await this.userService.createUser(userDto);
  return user;
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