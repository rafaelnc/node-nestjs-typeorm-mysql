import { IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}