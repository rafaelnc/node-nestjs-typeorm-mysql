
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Column({ select: false })
  password: string;


  async validatePassword(password: string) {
    return await bcrypt.compare(password,  this.password);
  }
}