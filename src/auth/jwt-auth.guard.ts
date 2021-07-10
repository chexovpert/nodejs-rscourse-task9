import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const sessionToken = req.headers.authorization;
      const [type, token] = sessionToken.split(' ');
      if (type !== 'Bearer') {
        throw new UnauthorizedException({ message: 'not authorized' });
      }
      //console.log(type, token);

      const user = this.jwtService.verify(token);
      //console.log(user);
      //req.user = user
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'not authorized' });
    }
  }
}
