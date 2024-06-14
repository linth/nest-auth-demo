import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';


// 似乎需要此 library, 讓下面的檔案都可以接收到dotenv config資訊, 不然會出現 "statusCode": 500, "message": "Internal server error"
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '1m'},
    }),
    PassportModule,
  ],
  providers: [
    AuthService,
    UserService,
    // three kinds of strategies.
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,

    /**
     * reference url: https://stackoverflow.com/questions/76466982/getting-secretorprivatekey-must-have-a-value-error-in-nestjs-jwt-authenticatio
     */
    // you have to remove the JwtService.
    // JwtService, // getting 'secretOrPrivateKey must have a value' error.
  ],
  controllers: [AuthController]
})
export class AuthModule {}
