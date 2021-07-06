import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [forwardRef(() =>UsersModule), JwtModule.register({
    secret: process.env.JWT_SECRET_KEY || 'secret-key',
    //signOptions: {expiresIn: '24h'}
  })],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthModule, JwtModule]

})
export class AuthModule {}