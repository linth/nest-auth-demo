import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UsersService } from 'src/users/users.service';
// import { SessionSerializer } from './session.serializer';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: 'SECRET', // put env variables.
      signOptions: {
        expiresIn: '60s'
      },
    }),
  ],
  providers: [
    UsersService, // 似乎需要增加此才能正常
    AuthService, 
    LocalStrategy,
    JwtStrategy,
    // SessionSerializer
  ],
  exports: [AuthService],
})
export class AuthModule {}
