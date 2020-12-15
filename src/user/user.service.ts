import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LoginDTO } from './dto/login.dto';
import { UserDTO } from './dto/user.dto';
import { UserRepository } from './user.repository';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async createUser(
    userDto: UserDTO,
  ) {
    return await this.userRepository.createUser(userDto);
  }


  public async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }


  public async getUser(userId: number): Promise<User> {
    const foundUser = await this.userRepository.findOne(userId);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }


  public async finByLogin(email: string, password: string): Promise<LoginDTO> {
    const user = await this.userRepository
    .createQueryBuilder("user")
    .where("user.email = :email", { email: email })
    .getOne();
    
   const login = user.validatePassword(password);
   
   return login ? {id: user.id, name : user.name}: null;
  }

  async findById({ id }: any): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }


  public async editUser(
    userId: number,
    userDto: UserDTO,
  ): Promise<User> {
    const editedUser = await this.userRepository.findOne(userId);
    if (!editedUser) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.editUser(userDto, editedUser);
  }


  public async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }

  
}


