import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]),
  PassportModule.register({
    defaultStrategy: 'jwt',
    property: 'user',
    session: false
    }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService,JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
