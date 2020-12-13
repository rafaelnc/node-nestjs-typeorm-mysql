import { IsString , IsInt } from 'class-validator';

export class LoginDTO {

  @IsInt()
  id: number;

  @IsString()
  name: string;


}