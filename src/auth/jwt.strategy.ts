import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';

interface JwtPayload {
    username: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET,
        });  
    }
    
    async validate(id): Promise<UserDTO> {
        const user = await this.authService.validateUser(id);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return user;  
    }
}
