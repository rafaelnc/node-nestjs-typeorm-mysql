import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';


@EntityRepository(User)
export class UserRepository extends Repository<User> {
 
  public async createUser(
    userDto: UserDTO,
  ): Promise<User> {
    const { name, email, password } = userDto;

    const user = new User();
    user.name = name;
    user.email = email;
   
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
console.log(  user.password)
    await user.save();
    return user;
  }

  public async editUser(
    userDto: UserDTO,
    editedUser: User,
  ): Promise<User> {
    const { name, email, password } = userDto;

    editedUser.name = name;
    editedUser.email = email;
    editedUser.password = password;
    await editedUser.save();

    return editedUser;
  }
}