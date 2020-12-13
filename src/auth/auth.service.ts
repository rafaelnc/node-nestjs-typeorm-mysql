import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDTO } from '../user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}


  async login(userDto: UserDTO){

    const login = await this.userService.finByLogin(userDto.email, userDto.password);
      
    if(login){
        //auth ok
        const id = login.id; 
        const token = this._createToken(id);

        return ({  id: id, user: login.name, ... token});
      }
     
      throw new HttpException('Login inválido!',HttpStatus.UNAUTHORIZED)
    
      
  }

  async validateUser(id): Promise<UserDTO> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken(id) {
    const expiresIn =process.env.EXPIRESIN;
    const auth= true;
    
    const accessToken = this.jwtService.sign({id: id});
    return {
      auth,
      expiresIn,
      accessToken,
    };
  }
}