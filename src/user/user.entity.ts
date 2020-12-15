
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  
  async validatePassword(password: string, user) {
    return await bcrypt.compare(password,  user.password);
  }

 
}