// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    HttpException,
    HttpStatus
  } from '@nestjs/common';
  import { UserService } from '../user/user.service';
  import { AuthService } from './auth.service';
  import { UserDTO } from '../user/dto/user.dto';
  
@Controller('auth')
export class AuthController { constructor(private authService: AuthService) {}

    @Post('login')
    public async createUser(
      @Body() userDto: UserDTO
    ){
      return await this.authService.login(userDto);
          
    }
    
    
}
